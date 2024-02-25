const Wishlist = require("../model/Wishlist");
const Product = require("../model/Product");

const getUserWishlist = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ "message": "User must be logged in" })
    }

    try {

        const userWishlist = await Wishlist.findOne({ user: req.user._id }).populate("items");

        const pipeline = [
            {
                $match: { _id: { $in: userWishlist.map(item => item.product) } }
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

        res.json(products);

    } catch (err) {
        res.status(500).json({ "message": `${err.message}` });
    }
}

const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "Product ID is required" });
    }

    try {
        // Add product to user wishlist if not present and respond with updated document

        //modify wishlist logic: --check if item is already in wishlist
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: req.user._id },
            { $addToSet: { items: productId } },
            { new: true, upsert: true }
        );
        
        res.json({"message": "Product added to wishlist"});

    } catch (err) {
        res.status(500).json({ "message": `${err.message}` });
    }
}

const removeFromWishlist = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ "message": "Product ID is required" });
    }

    try {

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: productId } },
            { new: true, }
        );

        res.json({"message": "Product removed to wishlist"});

    } catch (err) {
        res.status(500).json({ "message": `${err.message}` });
    }
}

module.exports = {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
}