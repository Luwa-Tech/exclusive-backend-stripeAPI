const Cart = require("../model/Cart");
const Product = require("../model/Product");
const generateSessionID = require("../utils/generateSessionID");

const getUserCart = async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId && !req.user) {
        return res.sendStatus(204);
    }

    try {
        let cartItems;

        if (req.user) {
            cartItems = await Cart.findOne({ user: req.user._id }).populate("items");
        } else {
            cartItems = await Cart.findOne({ sessionId: sessionId }).populate("items");
        }

        // Fetch product details for cart items using mongodb aggregation
        const pipeline = [
            {
                $match: { _id: { $in: cartItems.map(item => item.product) } }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            }
        ];

        const products = await Product.aggregate(pipeline);

        console.log(products)

        res.json({ "cart": products });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ "message": "Internal server error" });
    }
}

const addToCart = async (req, res) => {
    const { productId, sessionId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" })
    }

    try {
        let userCart;
        let newSessionId;

        if (req.user) {
            userCart = await Cart.findOneAndUpdate(
                { user: req.user._id },
                { $addToSet: { items: { product: productId } } },
                { upsert: true, new: true });

        }

        // create sessionid for anonymous user if none
        if (!sessionId) {
            newSessionId = generateSessionID();
        }

        userCart = await Cart.findOneAndUpdate(
            { sessionId: sessionId || newSessionId },
            { $addToSet: { items: { product: productId } } },
            { upsert: true, new: true }
        );

        res.json({ "message": "Product added to cart", "cartItems": userCart })

    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "Internal server error" });
    }
}


const removeFromCart = async (req, res) => {
    const { productId, sessionId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        let userCart;

        if (req.user) {
            userCart = await Cart.findOne({ user: req.user._id });
            userCart.items.pull({ product: productId });
            await userCart.save();
        } else {
            userCart = await Cart.findOne({ sessionId: sessionId });
            userCart.items.pull({ product: productId });
            await userCart.save();
        }

        res.json({ "message": "Product has been removed from cart" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports = {
    getUserCart,
    addToCart,
    removeFromCart
}