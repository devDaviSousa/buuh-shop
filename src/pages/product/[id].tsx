import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { useRouter } from 'next/router'

export default function Product() {
    return (
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta X</h1>
                <span></span>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo animi dicta aliquid eligendi dolorum id! Praesentium itaque ut dolore dolor vitae a cum modi eaque autem, dolores quidem dolorum totam!</p>

                <button>Comprar agora</button>

            </ProductDetails>
        </ProductContainer>
    )
}