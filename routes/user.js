const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.handleSignup);
router.post("/login", userController.handleLogin);

module.exports = router;