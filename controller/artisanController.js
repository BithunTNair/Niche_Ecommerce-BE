const PRODUCTS = require('../models/productModel');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});

const addProduct = (req, res) => {
    const {aristanId} = req.params;
    const { name, category, description, price, stock } = req.body;
    try {
        if (!req.file) {
            return res.send('File is not visible')
        }
        const pdoductImage = cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'something went wrong' })
            }

            const imageUrl = result.url;
            const product = await PRODUCTS({
                name: name,
                category: category,
                description: description,
                price: price,
                stock: stock,
                image: imageUrl,
                aristanId: aristanId
            }).save();
            return res.status(200).json({ message: 'Product has been added successfully but not verified', product })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
   await   PRODUCTS.findByIdAndDelete(id);
         res.status(200).json({ message: 'Product has been added deleted' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { addProduct,deleteProduct }