const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  items: [{
    id: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Product", 
        required: true 
    }
  }],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);