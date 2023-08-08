//change to dotenv file for better maintenance
const stripe = require("stripe")("sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6")


const handleCheckout = async (req, res) => {
    const items = req.body.items
    if(!items) {
        return res.status(400).json({"message": "Cart items is required!"})
    }
    console.log(req.body)

    let cartItems = []
    items.forEach(item => {
        cartItems.push(
            {
                price: item.stripeID,
                quantity: item.qty
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: cartItems,
        mode: "payment",
        success_url: "http://127.0.0.1:5173/success" || "https://exclusive-ecommerce-app.netlify.app/success",
        cancel_url: "http://127.0.0.1:5173/cancel" || "https://exclusive-ecommerce-app.netlify.app/cancel"
    })

    res.send(JSON.stringify({
        url: session.url
    }))
   
}

module.exports = {handleCheckout}