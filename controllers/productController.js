const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    console.log(products)

    if (!products) {
        return res.status(204).json({"message": "No products found"});
    }
    res.json(products);
}

const addNewProduct = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({"message": "Product information is required"});
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result)

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
        console.log(newProduct);
        res.status(201).json({"message": "New product created!"});
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
    addNewProduct,
    getAllProducts,
    getProduct
}