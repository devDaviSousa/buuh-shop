export interface IProduct {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ICartState {
    items: ICartItem[];
    failedStockCheck?: number[];
}
