const Cart = require("../model/Cart");

// TODO
// 1. Send updated item or all userCart and wishlist to the frontend

const getUserCart = async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ "message": "Email is required" });
    }

    try {
        const cartItems = await Cart.findOne({ email: email }).populate("items");
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const addToCart = async (req, res) => {
    const { productId, stripeId, email } = req.body;

    // Refactor request info
    if (!productId || !stripeId || !email) {
        return res.status(400).json({ "message": "ProductId, stripeId and Email is required" });
    }

    try {
        // Find user cart
        // Check if product is in cart
        // Add if not else
        // respond with a 204, item already in cart
        // if (!userCart) {
        //     userCart = new Cart({ email: email, items: [] });
        // }

        let userCart = await Cart.findOne({ email: email });
        const isItemInCart = userCart.items.find(items => items.id === productId);
        if (isItemInCart) {
            res.status(204).json({"message": "Product already in cart"})
        } else {
            userCart.items.push({
                id: productId,
                stripeID: stripeId
            })
            await userCart.save();
            res.status(201).json({"message": "Product added to cart"});
        }

    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const increaseItemQty = async (req, res) => {
    const { productId, email } = req.body;

    if (!productId || !email) {
        return res.status(400).json({ "message": "ProductId and Email is required" });
    }

    try {
        const userCart = await Cart.findOne({ email: email });

        const item = userCart.items.find(item => item.id === productId);
        item.quantity += 1;
        await userCart.save();

        res.json({ "message": "Product quantity updated" });
    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const decreaseItemQty = async (req, res) => {
    const { productId, email } = req.body;

    if (!productId || !email) {
        return res.status(400).json({ "message": "ProductId and Email is required" });
    }

    try {
        const userCart = await Cart.findOne({ email: email });

        const item = userCart.items.find(item => item.id === productId);
        item.quantity -= 1;
        await userCart.save();

        res.json({ "message": "Product quantity updated" });
    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const removeFromCart = async (req, res) => {
    const { productId, email } = req.body;

    if (!productId || !email) {
        return res.status(400).json({ "message": "ProductId and Email is required" });
    }

    try {
        const userCart = await Cart.findOne({ email: email });
        userCart.items.pull({ id: productId });
        await userCart.save();

        res.json({ "message": "Product has been removed from cart" });

    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports = {
    getUserCart,
    addToCart,
    increaseItemQty,
    decreaseItemQty,
    removeFromCart
}