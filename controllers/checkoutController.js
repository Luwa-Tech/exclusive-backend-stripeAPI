//change to dotenv file for better maintenance
const stripe = require("stripe")("sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6")


const handleCheckout = async (req, res) => {
    const items = req.body.items;
    if(!items) {
        return res.status(400).json({"message": "Cart items is required!"});
    };

    let cartItems = [];
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
        success_url: "https://exclusive-ecommerce-app.netlify.app/cart/success",
        cancel_url:  "https://exclusive-ecommerce-app.netlify.app/cart/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
   
}

module.exports = {handleCheckout}