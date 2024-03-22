const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/multer");

router.get("/", productController.getAllProducts)
router.post("/upload", upload.single("image"), productController.addNewProduct)
router.get("/:id", productController.getProduct)

module.exports = router;