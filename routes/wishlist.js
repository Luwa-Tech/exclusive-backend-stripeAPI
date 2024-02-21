const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isAuthenticated")
const wishlistController = require("../controllers/wishlistController");

router.get("/", isUserAuthenticated, wishlistController.getUserWishlist);
router.put("/add", isUserAuthenticated, wishlistController.addToWishlist);
router.put("/remove", isUserAuthenticated, wishlistController.removeFromWishlist);

module.exports = router;