const stripe = require("stripe")(process.env.STRIPE_KEY);

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
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: cartItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_PRODUCTION_URL}/cart/success`,
        cancel_url:  `${process.env.CLIENT_PRODUCTION_URL}/cart/cancel`
    });

    res.send(JSON.stringify({
        url: session.url
    }));
   
}

module.exports = {handleCheckout}