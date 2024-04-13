const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isAuthenticated");
const cartController = require("../controllers/cartController");

router.get("/", isUserAuthenticated, cartController.getUserCart)
router.put("/add", isUserAuthenticated, cartController.addToCart)
router.put("/decrease-item-qty", isUserAuthenticated, cartController.decreaseItemQty)
router.put("/remove", isUserAuthenticated, cartController.removeFromCart)

module.exports = router;