const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sessionId: {
    type: String
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId, ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1
    },
  }],
  //add subtotal here
});

module.exports = mongoose.model("Cart", cartSchema);
