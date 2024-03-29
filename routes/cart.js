const express = require("express");
const router = express.Router();
// const isUserAuthenticated = require("../middleware/isAuthenticated")
const cartController = require("../controllers/cartController");

router.get("/", cartController.getUserCart);
router.put("/add", cartController.addToCart);
router.put("/remove", cartController.removeFromCart);

module.exports = router;