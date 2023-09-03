import { Reducer } from "redux";
import { ICartState } from "./types";
import { produce } from "immer";

const INITIAL_STATE: ICartState = {
    items: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {

    return produce(state, draft => {
        switch (action.type) {
            case 'ADD_PRODUCT_TO_CART': {
                const { product } = action.payload

                const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id);

                if (productInCartIndex >= 0) {
                    draft.items[productInCartIndex].quantity++;
                } else {
                    draft.items.push({ product, quantity: 1 });
                }
                break;
            }
            case 'DECREASE_PRODUCT_TO_CART': {
                const { product } = action.payload

                const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id);
                if (draft.items[productInCartIndex].quantity <= 1) {
                    return
                }

                draft.items[productInCartIndex].quantity--

                break;
            }
            case 'REMOVE_PRODUCT_TO_CART': {
                const { product } = action.payload
                //console.log(draft.items.filter(item => item.product.id !== product.id))
                const teste = draft.items.findIndex(item => item.product.id === product.id)
                if (teste !== -1) draft.items.splice(teste, 1);

                break;
            }
            default: {
                return draft
            }
        }
    })
}

export default cart;