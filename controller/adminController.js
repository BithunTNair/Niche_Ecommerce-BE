const USERS = require('../models/userModel');
const PRODUCTS = require('../models/productModel');

const approveArtisan = async (req, res) => {
    const { bio, skill } = req.body
    const { userId } = req.params;
    try {
        const user = await USERS.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'user is not found' });
        }
        user.artisanProfile.isApproved = true,
            user.artisanProfile.status = 'approved'
        user.role = 'artisan'
        await user.save();
        return res.status(200).json({ message: 'Artisan approved successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const approveOrRejectProducts = async (req, res) => {
    const { productId } = req.params;
    const { status } = req.body;
    const product = await PRODUCTS.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (status === 'Approved') {
        product.isVerified = 'approved';
        product.save()
        res.status(200).json({ message: 'Product approved successfully', product });
    } else if (status === 'Rejected') {
        product.isVerified = 'rejected';
        product.save()
        res.status(200).json({ message: 'Product rejected successfully', product });
    } else {
        return res.status(400).json({ message: 'Invalid status' });
    }

};

const getAllProducts = async (req, res) => {

    try {
        const allProducts = await PRODUCTS.find();
        res.status(200).json({ message: 'Get your all  products', allProducts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const getAllUsers = async (req, res) => {   
    try {
        const allUsers = await USERS.find({role:'user'});
        if (allUsers.length === 0) {
            return res.status(404).json({ message: 'No normal users found' });
        }
        res.status(200).json({ message: 'Get your all normal users', allUsers })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const getAllArtisans = async (req, res) => {
    try {
        const allArtisans = await USERS.find({ role: 'artisan' });
        if (allArtisans.length === 0) {
            return res.status(404).json({ message: 'No artisans found' });
        }
        res.status(200).json({ message: 'Get your all artisans', allArtisans })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};
module.exports = { approveArtisan, approveOrRejectProducts,getAllProducts,getAllUsers, getAllArtisans };