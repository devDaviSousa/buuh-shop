import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import { AppProps } from "next/app";
import Image from "next/image";
import logoImg from "../assets/logo.svg"
import { Provider } from "react-redux"
import store from './../store/index'

globalStyles()
function App({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <Container>
                <Header>
                    <Image src={logoImg} alt="" />
                </Header>
                <Component {...pageProps} />
            </Container>
        </Provider>
    )
}
export default App