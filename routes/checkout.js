const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const isUserAuthenticated = require("../middleware/isAuthenticated");

router.post("/", isUserAuthenticated, checkoutController.handleCheckout);

module.exports = router;