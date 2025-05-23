const PRODUCTS = require('../models/productModel');
const CART = require('../models/cartModel');
const USERS = require('../models/userModel');

const getApprovedProducts = async (req, res) => {
    try {
        const approvedProducts = await PRODUCTS.find({ isVerified: 'approved' });
        if (approvedProducts.length === 0) {
            return res.status(404).json({ message: 'No approved products found' });
        }
        return res.status(200).json({ message: 'Get your all approved products', approvedProducts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })

    }
}

const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const user = await USERS.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        let cart = await CART.findOne({ userId });

        if (cart) {
            await cart.populate('products.productId');
            const productIndex = cart.products.findIndex((p) => p.productId && p.productId._id && p.productId._id.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.populate('products.productId');
            cart.totalPrice = cart.products.reduce((acc, item) => {
                if (item.productId && typeof item.productId.price === 'number') {
                    return acc + (item.quantity * item.productId.price);
                }
                return acc;
            }, 0);
            await cart.save();
            return res.status(200).json({ message: 'Cart has been updated successfully', cart });
        } else {
            const product = await PRODUCTS.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            const totalPrice = typeof product.price === 'number' ? quantity * product.price : 0;
            cart = await new CART({
                userId,
                products: [{ productId, quantity }],
                totalPrice
            }).save();
            await cart.populate('products.productId');
            return res.status(201).json({ message: 'New cart has been created successfully', cart });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

const removeFromCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
        let cart = await CART.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        await cart.populate('products.productId');
        const productIndex = cart.products.findIndex(
            (p) => p.productId && p.productId._id && p.productId._id.toString() === productId
        );
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        if (quantity && cart.products[productIndex].quantity > quantity) {
            cart.products[productIndex].quantity -= quantity;
        } else {
            cart.products.splice(productIndex, 1);
        }
        cart.totalPrice = cart.products.reduce((acc, item) => {
            if (item.productId && typeof item.productId.price === 'number') {
                return acc + (item.quantity * item.productId.price);
            }
            return acc;
        }, 0);
        await cart.save();
        return res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

const filterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, artisan, search } = req.query;
        let filter = { isVerified: 'approved' };
        if (category) filter.category = category;
        if (artisan) filter.artisan = artisan;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const products = await PRODUCTS.find(filter);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json({ message: 'Filtered products', products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

module.exports = {getApprovedProducts, addToCart, removeFromCart, filterProducts};