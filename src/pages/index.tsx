import { ArrowLeft, ArrowRight, DivIcon, Header, HomeContainer, Product } from "@/styles/pages/home";
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
import axios from "axios";
import { CaretLeft, CaretRight } from "phosphor-react";

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
    //const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
    const [current, setCurrent] = useState(0);


    async function handleBuyButton() {

        try {
            //setIsCreatingCheckoutSession(true);
            const response = await axios.post('/api/checkout', {
                cart: cart ?? ''
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch {
            //setIsCreatingCheckoutSession(false);
            if (cart.length === 0) {

                alert('Carrinho vazio')
            } else {

                alert('Falha ao redirecionar ao checkout')
            }
        }
    }

    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            origin: "center",
            perView: 2,
            spacing: 48
        },
        breakpoints: {
            '(max-width:768px)': {
                slides: {
                    perView: 1,
                    spacing: 24
                }
            }
        },
        animationEnded(event) {
            setCurrent(event.track.details.abs);

            event.container.children[event.track.details.abs].children[0].classList.add('active');
        },

        animationStarted(event) {
            event.container.children[event.track.details.abs].children[0].classList.remove('active');
        },
    });

    useEffect(() => instanceRef.current!.container.children[0].children[0].classList.add('active'), [instanceRef]);

    return (
        <div style={{ width: "90%", margin: '6rem auto' }}>
            <Head>
                <title>Home | Buuh Shop</title>
            </Head>
            <HomeContainer >

                {current === 0
                    ?
                    <></>
                    :
                    <ArrowLeft
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                    >
                        <CaretLeft weight="bold" size={48} />
                    </ArrowLeft>
                }

                <div ref={sliderRef} className="keen-slider">
                    {products.map(product => {
                        return (
                            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                                <Product className="keen-slider__slide number-slide1">
                                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                                    <footer>
                                        <div className="title">
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
                </div>

                {current === products.length - 1
                    ?
                    <></>
                    :
                    <ArrowRight
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                    >
                        <CaretRight weight="bold" size={48} />
                    </ArrowRight>
                }

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