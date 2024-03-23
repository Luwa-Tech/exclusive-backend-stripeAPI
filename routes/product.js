const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const uploader = require("../middleware/multer");

router.get("/", productController.getAllProducts)
router.post("/upload", uploader.single("file"), productController.createProduct)
router.get("/:id", productController.getProduct)

module.exports = router;