const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [{
    id: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    stripeID: {
      type: String,
      required: true
    },
  }],
});

module.exports = mongoose.model("Cart", cartSchema);
