import { DivIcon, Header, HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image"
import { GetStaticProps } from "next"
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import Link from "next/link";
import Head from "next/head";
import { useSelector } from "react-redux";
import { IState } from "@/store";
import { ICartItem } from "@/store/modules/cart/types";
import iconCart from "../assets/icon-cart.svg"

import logoImg from "../assets/logo.svg"
import { useEffect, useState } from "react";
import { Cart } from "@/styles/pages/product";

interface HomeProps {
    products: {
        id: string
        name: string
        imageUrl: string
        price: string
    }[]
}

export default function Home({ products }: HomeProps) {

    const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
    const [quantityCart, setQuantityCart] = useState(0);


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

    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    });
    return (
        <div style={{ width: "90%", margin: "0 auto" }}>
            <Head>
                <title>Home | Buuh Shop</title>
            </Head>
            <Header>
                <div style={{ flex: 1 }}>
                    <Image src={logoImg} alt="" />
                </div>
                <Cart >
                    <DivIcon>
                        <Image src={iconCart} alt="" />
                    </DivIcon>
                    <span style={{
                        display: quantityCart > 0 ? "flex" : 'none',

                    }}>{quantityCart}</span>
                </Cart >
            </Header>

            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map(product => {
                    return (
                        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                            <Product className="keen-slider__slide number-slide1">
                                <Image src={product.imageUrl} width={520} height={480} alt="" />
                                <footer>
                                    <div>
                                        <strong>{product.name}</strong>
                                        <span>{product.price}</span>
                                    </div>
                                    <DivIcon>
                                        <Image src={iconCart} alt="" />
                                    </DivIcon>
                                </footer>
                            </Product>
                        </Link>
                    )
                })}
            </HomeContainer>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price;

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: "currency",
                currency: "BRL"
            }).format(price.unit_amount as number / 100)
        }
    })

    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2
    }
}