import { keyframes } from "@stitches/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderContainer, ShoppingCartButton } from "./styles";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import Image from 'next/image';
import { useSelector } from "react-redux";
import { IState } from "@/store";
import { ICartItem } from "@/store/modules/cart/types";
import logoImg from '../../assets/logo.svg';
import { CartShopping } from "../CartShopping";


export function Header() {

    const [cartShoppingIsOpen, setCartShoppingIsOpne] = useState(false);
    const [aimation, setAnimation] = useState('');
    const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
    const [quantityCart, setQuantityCart] = useState(0);

    const { pathname } = useRouter();

    const openAnimation = keyframes({
        '0%': { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" }
    });

    const closeAnimation = keyframes({
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(100%)" }
    });

    function openCartShopping() {
        setAnimation(`${openAnimation} 200ms`);
        setCartShoppingIsOpne(true)
    }

    function closeCartShopping() {
        setAnimation(`${closeAnimation} 200ms`)

        setTimeout(() => {
            setCartShoppingIsOpne(false)
        }, 200)
    }

    if (pathname === '/success') {
        return (
            <HeaderContainer
                style={{
                    justifyContent: 'center',
                }}
            >
                <Link href="/">
                    <Image src={logoImg} alt="" />
                </Link>
            </HeaderContainer>
        )
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
        <HeaderContainer>
            <Link href="/">
                <Image src={logoImg} alt="" />
            </Link>

            <ShoppingCartButton
                onClick={openCartShopping}
            >
                {quantityCart > 0 && <span>{quantityCart}</span>}

                <Handbag weight="bold" size={24} />
            </ShoppingCartButton>

            {cartShoppingIsOpen &&
                <CartShopping
                    styles={{ animation: `${aimation}` }}
                    closeCartShopping={closeCartShopping}
                />
            }
        </HeaderContainer>
    )

}