const razorpay = require("razorpay");
const crypto = require("crypto");
const ORDER = require('../models/orderModel');
const CART = require('../models/cartModel');
const PRODUCTS = require('../models/productModel');

const order = () => {
    const instance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    return instance;
};


const createOrder = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;
    try {

        let products = [];
        let totalPrice = 0;
        if (productId) {
            const product = await PRODUCTS.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            totalPrice = product.price * quantity;
            products.push({
                productId: product._id,
                quantity
            });
        } else {
            const cart = await CART.findOne({ userId }).populate('products.productId');
            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            const totalPriceCart = cart.products.reduce((acc, item) => {
                if (item.productId && typeof item.productId.price === 'number') {
                    return acc + (item.quantity * item.productId.price);
                }
                return acc;
            }, 0);
            totalPrice = totalPriceCart;
            products = cart.products.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            }));
        }

        const razorpayInstance = order();
        const options = {
            amount: Price * 100,
            currency: 'INR',
            receipt: `order_rcptid_${Date.now()}`
        };
        const razorpayOrder = await razorpayInstance.orders.create(options);

        const newOrder = await ORDER.create({
            userId,
            products,
            totalPrice: Price,
            paymentStatus: 'pending',
            razorpayOrderId: razorpayOrder.id,
            status: 'placed'
        });
        return res.status(201).json({
            message: 'Order created. Proceed to payment.',
            order: newOrder,
            razorpayOrder
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

module.exports = { order, createOrder };