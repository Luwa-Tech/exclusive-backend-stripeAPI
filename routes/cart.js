const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isAuthenticated");
const cartController = require("../controllers/cartController");

router.get("/", isUserAuthenticated, cartController.getUserCart)
router.put("/add", cartController.addToCart)
router.put("/decrease-item-qty", cartController.decreaseItemQty)
router.put("/remove", cartController.removeFromCart)

module.exports = router;