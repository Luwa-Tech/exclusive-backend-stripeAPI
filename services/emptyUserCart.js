const Cart = require("../model/Cart");

const emptyUserCart = async (email) => {
    try {
        await Cart.updateOne({ email: email }, { $set: { items: [] } });
        console.log(`Cart for user ${email} cleared out`)
    } catch (error) {
        console.log(`Error clearing out cart for ${email}:`, error);
        throw error;
    }
}

module.exports = emptyUserCart;