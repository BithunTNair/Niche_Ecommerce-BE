const PRODUCTS = require('../models/productModel');

const getAllProducts = async (req, res) => {

    try {
        const allProducts = await PRODUCTS.find();
        res.status(200).json({ message: 'Get your all  products', allProducts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

module.exports = { getAllProducts }