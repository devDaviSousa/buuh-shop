import { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CircleNotch, Minus, Plus, TrashSimple, X } from 'phosphor-react';

import {
    CartShoppingContainer,
    CloseButton,
    Items,
    Item,
    ImageContainer,
    Info,
    Actions,
    PurchaseDetails,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/store';
import { ICartItem } from '@/store/modules/cart/types';
import { addProductToCart, decreaseProductToCart, removeProductToCart } from '@/store/modules/cart/actions';

interface CartShoppingProps {
    styles: any;
    closeCartShopping: () => void;
}

interface IDetailsCart {
    quantityCart: number,
    amoutCart: number
}

export function CartShopping({ styles, closeCartShopping }: CartShoppingProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
    const [detailsCart, setDetailsCart] = useState<IDetailsCart>({
        quantityCart: 0,
        amoutCart: 0
    });
    const dispath = useDispatch();

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', { cart: cart })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    useEffect(() => {
        if (cart.length > 0) {
            var sum = 0;
            var amout = 0;
            const quantityItems = cart.map(item => (
                {
                    quantityCart: item.quantity,
                    amoutCart: (item.product.unitAmount / 100) * item.quantity
                }
            ));

            for (var i = 0; i < quantityItems.length; i++) {
                sum += quantityItems[i].quantityCart;
                amout += quantityItems[i].amoutCart;
            }
            setDetailsCart(
                {
                    quantityCart: sum,
                    amoutCart: amout
                }
            );
        }
    }, [cart])

    return (
        <CartShoppingContainer style={styles}>
            <CloseButton
                onClick={closeCartShopping}
            >
                <X weight="bold" size={24} />
            </CloseButton>

            <h2>Sacola de compras</h2>

            <Items>
                {
                    cart.length > 0 ?
                        cart.map(product => {
                            return (
                                <Item key={product.product.id}>
                                    <ImageContainer>
                                        <Image src={product.product.imageUrl} width={100} height={100} alt="" />
                                    </ImageContainer>

                                    <Info>
                                        <span>{product.product.name}</span>
                                        <strong>{product.product.price}</strong>
                                    </Info>

                                    <Actions>
                                        <div className="quantity">

                                            <button onClick={
                                                useCallback(() => {
                                                    dispath(decreaseProductToCart(product.product))
                                                }, [dispath, product])
                                            }>
                                                <Minus weight="bold" color="white" size={14} />
                                            </button>

                                            <span>{product.quantity}</span>

                                            <button onClick={useCallback(() => {
                                                dispath(addProductToCart(product.product))
                                            }, [dispath, product])}>
                                                <Plus weight="bold" color="white" size={14} />
                                            </button>
                                        </div>

                                        <button
                                            className="remove"
                                            onClick={useCallback(() => {
                                                dispath(removeProductToCart(product.product))
                                            }, [dispath, product])}
                                        >
                                            <TrashSimple weight="bold" color="white" size={14} />
                                            Remover
                                        </button>
                                    </Actions>
                                </Item>
                            )
                        }) : null
                }
            </Items>

            <PurchaseDetails>
                <div>
                    <p>Quantidade</p>
                    <span>{detailsCart.quantityCart} items</span>
                </div>

                <div>
                    <p>Valor total</p>
                    <span>{

                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",
                            currency: "BRL"
                        }).format(detailsCart.amoutCart as number)

                    }</span>
                </div>

                <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession} >
                    {
                        isCreatingCheckoutSession
                            ?
                            <CircleNotch className="loading" weight="bold" />
                            :
                            'Finalizar compra'
                    }
                </button>
            </PurchaseDetails>
        </CartShoppingContainer>
    )
}
