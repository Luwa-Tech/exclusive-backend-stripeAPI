const Cart = require("../model/Cart");

const getUserCart = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({"message": "Please log in to view your cart"});
    }

    try {
        const cartItems = await Cart.findOne({ user: req.user._id }).populate("items");
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const addToCart = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        let statusCode;
        const userCart = await Cart.findOne({ user: req.user._id});
        const isItemInCart = userCart.items.find(items => items.id === productId);
        
        if (!isItemInCart) {
            userCart.items.push({
                id: productId,
                quantity: 1
            })
            // responseMessage = "Product added to cart";
            statusCode = 201;
        } else {
            isItemInCart += 1;
            // responseMessage = "Product quantity updated";
            statusCode = 200;
        }

        await userCart.save();
        res.status(statusCode);

    } catch (err){
        res.status(500).json({ "message": "Internal server error" });
    }
}

const decreaseItemQty = async (req, res) => {
    const {productId} = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOne({user: req.user._id});
        const item = userCart.items.find(item => item.id === productId);
        item.quantity -= 1;
        await userCart.save();
        res.json({"message": "Product quantity updated"});
    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
    }
}

const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOne({ user: req.user._id });
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