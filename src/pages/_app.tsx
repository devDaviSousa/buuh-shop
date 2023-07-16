import { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import { Provider } from "react-redux"
import store from './../store/index'

globalStyles()
function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
export default App