import { Cart, ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from 'next';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Head from 'next/head';
import { ICartItem } from '@/store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '@/store/modules/cart/actions';
import { IState } from '@/store';
import { DivIcon, Header } from '@/styles/pages/home';
import iconCart from "../../assets/icon-cart.svg"
import logoImg from "../../assets/logo.svg"
import Link from 'next/link';

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        unitAmount: number;
        price: string
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
    const dispath = useDispatch();
    const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
    const [quantityCart, setQuantityCart] = useState(0);

    const handleAddProductToCart = useCallback(() => {
        dispath(addProductToCart(product))
    }, [dispath, product])

    async function handleBuyButton() {

        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
                cart: cart ?? ''
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch {
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar ao checkout')
        }
    }


    useEffect(() => {
        if (cart.length > 0) {
            var sum = 0;
            const quantityItems = cart.map(item => item.quantity);

            for (var i = 0; i < quantityItems.length; i++) {
                sum += quantityItems[i];
            }
            setQuantityCart(sum);
        }
    }, [cart])

    return (
        <div style={{ width: "90%", margin: '6rem auto' }}>
            <Head>
                <title>{product.name} | Buuh Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} alt='' width={580} height={580}></Image>
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleAddProductToCart}>Colocar na sacola</button>
                </ProductDetails>
            </ProductContainer>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
        ],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params?.id;

    const product = await stripe.products.retrieve(productId!, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                unitAmount: price.unit_amount,
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id
            },
        },
        revalidate: 60 * 60 * 1,
    }
}

