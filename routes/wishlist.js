const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isAuthenticated")
const wishlistController = require("../controllers/wishlistController");

router.get("/", isUserAuthenticated, wishlistController.getUserWishlist);
router.put("/add", wishlistController.addToWishlist);
router.put("/remove", wishlistController.removeFromWishlist);

module.exports = router;