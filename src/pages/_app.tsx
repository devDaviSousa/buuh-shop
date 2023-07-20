import { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import { Provider } from "react-redux"
import store from './../store/index'
import { Header } from "@/components/Header";

globalStyles()
function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div style={{ marginTop: '5%' }}>
                <Header />
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}
export default App