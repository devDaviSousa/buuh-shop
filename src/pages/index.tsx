import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image"
import tShirt01 from '../assets/t-shirts/1.png';
import tShirt02 from '../assets/t-shirts/2.png';
import tShirt03 from '../assets/t-shirts/3.png';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function Home() {

    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    });
    return (
        <HomeContainer ref={sliderRef} className="keen-slider">
            <Product className="keen-slider__slide">
                <Image src={tShirt01} alt="" width={520} height={480} />
                <footer>
                    <strong>camiseta x</strong>
                    <span>R$ 79,90</span>
                </footer>
            </Product>
        </HomeContainer>
    )
}