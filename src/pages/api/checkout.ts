import { stripe } from "@/lib/stripe";
import { IState } from "@/store";
import { ICartItem } from "@/store/modules/cart/types";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { cart } = req.body;

    if (req.method !== 'POST')
        return res.status(405).json({ erro: "Method not allowed" })

    if (!cart)
        return res.status(400).json({ erro: "Price not found" })

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    const productsCart = cart.map((item: ICartItem) => ({
        price: item.product.defaultPriceId,
        quantity: item.quantity
    }))

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: "payment",
        line_items: productsCart
    })
    return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
