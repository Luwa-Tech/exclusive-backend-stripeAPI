const Cart = require("../model/Cart");
const Product = require("../model/Product");
const generateSessionID = require("../utils/generateSessionID");

const getUserCart = async (req, res) => {
    if (!req.user) {
        return res.sendStatus(204);
    }

    try {
        const cartItems = cartItems = await Cart.findOne({ user: req.user._id }).populate("items");

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
    const { productId } = req.body;

    if (!req.user) {
        return res.status(400).json({"message": "User must be logged in"});
    }

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
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
    const { productId } = req.body;

    if (!req.user) {
        return res.status(400).json({"message": "User must be logged in"})
    }

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOne({ user: req.user._id });
        userCart.items.pull({ product: productId });
        await userCart.save();

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