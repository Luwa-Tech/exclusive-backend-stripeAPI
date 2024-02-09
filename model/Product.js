const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    stripeID: {
        type: String,
        required: true
    }
    discount: {
        type: Number,
    },
    discountPrice: {
        type: Number
    },
    cloudinaryID: {
        type: String
    },
    rating: {
        type: Number
    },
    category: {
        type: String
    },
});

module.exports = mongoose.model('Product', productSchema);
