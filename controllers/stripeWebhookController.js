const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const emptyUserCart = require("../services/emptyUserCart");

const stripeWebhook = (req, res) => {
    let event;

    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers["stripe-signature"];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const checkoutSession = event.data.object;
        emptyUserCart(checkoutSession)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}

module.exports = { stripeWebhook };