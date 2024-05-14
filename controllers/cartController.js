const Cart = require("../model/Cart");

const getUserCart = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({"message": "Email is required"});
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
        let statusCode;

        let userCart = await Cart.findOne({ email: email });
        if (!userCart) {
            userCart = new Cart({ email: email, items: [] });
        }

        const isItemInCart = userCart.items.find(items => items.id === productId);
        if (!isItemInCart) {
            userCart.items.push({
                id: productId,
                quantity: 1,
                stripeID: stripeId
            })
            statusCode = 201;
        } else {
            isItemInCart.quantity += 1;
            statusCode = 200;
        }

        await userCart.save();
        res.status(statusCode);

    } catch (err){
        res.status(500).json({ "message": "Internal server error" });
    }
}

const decreaseItemQty = async (req, res) => {
    const {productId, email} = req.body;

    if (!productId || !email) {
        return res.status(400).json({ "message": "ProductId and Email is required" });
    }

    try {
        const userCart = await Cart.findOne({email: email});

        const item = userCart.items.find(item => item.id === productId);
        item.quantity -= 1;
        await userCart.save();

        res.json({"message": "Product quantity updated"});
    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
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
    decreaseItemQty,
    removeFromCart
}