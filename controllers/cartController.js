const Cart = require("../model/Cart");
const Product = require("../model/Product");

const getUserCart = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({"message": "Please log in to view your cart"});
    }

    try {
        const cartItems = await Cart.findOne({ user: req.user._id }).populate("items");

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

        res.status(200).json(products);

    } catch (err) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

const addToCart = async (req, res) => {
    const { productId } = req.body;

    // if (!req.user) {
    //     return res.status(401).json({"message": "User must be logged in"});
    // }

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        let responseMessage;
        const userCart = await Cart.findOne({ user: req.user._id});
        const isItemInCart = userCart.items.find(items => items.product === productId);
        
        if (!isItemInCart) {
            userCart.items.push({
                product: productId,
                quantity: 1
            })
            responseMessage = "Product added to cart";
        } else {
            isItemInCart += 1;
            responseMessage = "Product quantity updated";
        }

        await userCart.save();
        res.json({"message": responseMessage});

    } catch (err){
        res.status(500).json({ "message": "Internal server error" });
    }
}

const decreaseItemQty = async (req, res) => {
    const {productId} = req.body;

    // if (!req.user) {
    //     return res.status(401).json({"message": "User must be logged in"})
    // }

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOne({user: req.user._id});
        const item = userCart.items.find(item => item.product === productId);
        item.quantity -= 1;
        await userCart.save();
        res.json({"message": "Product quantity updated"});
    } catch (err) {
        res.status(500).json({"message": "Internal server error"});
    }
}

const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    // if (!req.user) {
    //     return res.status(401).json({"message": "User must be logged in"})
    // }

    if (!productId) {
        return res.status(400).json({ "message": "ProductId is required" });
    }

    try {
        const userCart = await Cart.findOne({ user: req.user._id });
        userCart.items.pull({ product: productId });
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