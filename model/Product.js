const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stripeID: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
    },
    discountPrice: {
        type: Number
    },
    cloudinaryId: {
        type: String
    },
    rating: {
        type: Number
    },
    category: {
        type: String
    },
});

module.exports = mongoose.model("Product", productSchema);
