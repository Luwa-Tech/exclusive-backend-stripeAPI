const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [{
    id: { 
        type: String, 
        required: true 
    }
  }],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);