import { IProduct } from './types';

export function addProductToCart(product: IProduct) {
    return {
        type: "ADD_PRODUCT_TO_CART",
        payload: {
            product
        }
    }
}

export function decreaseProductToCart(product: IProduct) {
    return {
        type: "DECREASE_PRODUCT_TO_CART",
        payload: {
            product
        }
    }
}

export function removeProductToCart(product: IProduct) {
    return {
        type: "REMOVE_PRODUCT_TO_CART",
        payload: {
            product
        }
    }
}

