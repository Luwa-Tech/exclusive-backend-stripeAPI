const Wishlist = require("../model/Wishlist");

const getUserWishlist = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({ "message": "Email is required" });
    }

    try {
        const userWishlist = await Wishlist.findOne({ email: email }).populate("items");
        res.status(200).json(userWishlist);
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
        let userWishlist = await Wishlist.findOne({email: email});
        if (!userWishlist) {
            userWishlist = new Wishlist({ email: email, items: [] });
        }

        const isItemInWishlist = userWishlist.items.find(items => items.id === productId);
        if (isItemInWishlist) {
            res.json({"message": "Item already in Wishlist"});
        } else {
            userWishlist.items.push({
                id: productId
            })
        }
        
        await userWishlist.save();
        res.status(200).json({"message": "Product added to wishlist"});

    } catch (err) {
        res.status(500).json({ "message": `${err.message}` });
    }
}

const removeFromWishlist = async (req, res) => {
    const { productId, email } = req.body;

    if (!productId || !email) {
        return res.status(400).json({ "message": "Product ID and Email is required" });
    }

    try {

        const wishlist = await Wishlist.findOneAndUpdate(
            { email: email },
            { $pull: { items: productId } },
            { new: true, }
        );

        await wishlist.save();

        res.status(200).json({"message": "Product removed to wishlist"});

    } catch (err) {
        res.status(500).json({ "message": `${err.message}` });
    }
}

module.exports = {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
}