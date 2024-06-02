const stripe = require("stripe")(process.env.STRIPE_KEY);
const emptyUserCart = require("../services/emptyUserCart");

const handleCheckout = async (req, res) => {
    const items = req.body.items;
    const email = req.body.email;
    if(!items || !email) {
        return res.status(400).json({"message": "Cart items and Email is required!"});
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
        // success_url: `${process.env.CLIENT_PRODUCTION_URL}/cart/success`,
        // cancel_url:  `${process.env.CLIENT_PRODUCTION_URL}/cart/cancel`
        success_url: "http://localhost:5173/cart/success",
        cancel_url: "http://localhost:5173/cart/cancel"
    });

    await emptyUserCart(email);

    res.send(JSON.stringify({
        url: session.url
    }));
   
}

module.exports = {handleCheckout}