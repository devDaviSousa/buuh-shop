import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CircleNotch, Minus, Plus, TrashSimple, X } from 'phosphor-react';

//import { CartShoppingContext } from '../../contexts/CartShoppingContext';

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
import { useSelector } from 'react-redux';
import { IState } from '@/store';
import { ICartItem } from '@/store/modules/cart/types';

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

    //const { amount, cartShopping, removeItem, decreaseItemQuantity, increaseItemQuantity } = useContext(CartShoppingContext)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', { cart: cart })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

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

                                        <button onClick={() => { }}>
                                            <Minus weight="bold" color="white" size={14} />
                                        </button>

                                        <span>{product.quantity}</span>

                                        <button onClick={() => { }}>
                                            <Plus weight="bold" color="white" size={14} />
                                        </button>
                                    </div>


                                    <button
                                        className="remove"
                                    //onClick={() => removeItem(product)}
                                    >
                                        <TrashSimple weight="bold" color="white" size={14} />
                                        Remover
                                    </button>
                                </Actions>
                            </Item>
                        )
                    })
                }
            </Items>

            <PurchaseDetails>
                <div>
                    <p>Quantidade</p>
                    <span>{detailsCart.quantityCart} items</span>
                </div>

                <div>
                    <p>Valor total</p>
                    <span>{detailsCart.amoutCart}</span>
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
