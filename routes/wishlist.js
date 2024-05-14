const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/", wishlistController.getUserWishlist);
router.put("/add", wishlistController.addToWishlist);
router.put("/remove", wishlistController.removeFromWishlist);

module.exports = router;