const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getUserCart)
router.put("/add", cartController.addToCart)
router.put("/increase-item-qty", cartController.increaseItemQty)
router.put("/decrease-item-qty", cartController.decreaseItemQty)
router.put("/remove", cartController.removeFromCart)

module.exports = router;