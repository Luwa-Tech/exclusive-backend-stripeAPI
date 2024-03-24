const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");
const validateProductInfo = require("../utils/validateProductInfo");

const getAllProducts = async (req, res) => {
    const products = await Product.find({});

    // Refactor statement
    if (!products) {
        return res.status(204).json({"message": "No products found"});
    }
    res.json(products);
}

const createProduct = async (req, res) => {
    const {name, price, stripeID, image} = req.body;
    const validationResult = validateProductInfo({name, price, image, stripeID});

    if (!validationResult.isValid) {
        return res.status(400).json({"message": validationResult.message});
    }

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const newProduct = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image: result.secure_url,
            stripeID: req.body.stripeID,
            discount: req.body.discount,
            discountPrice: req.body.discountPrice,
            cloudinaryId: result.public_id,
            rating: req.body.rating,
            category: req.body.category
        });

        await newProduct.save();
        res.status(201).json({"message": "New product created!", "Product": newProduct});
    } catch(err) {
        console.log(err.message);
    }
}

const getProduct = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({"message": "ID parameter is required"})
    };

    const product = await Product.findOne({_id: req.params.id}).exec();

    if (!product) {
        return res.status(204).json({"message": ` No product matches ID ${req.params.id}`})
    };

    res.json(product);
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct
}