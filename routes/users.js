const express = require('express');
const { addToCart, removeFromCart, getApprovedProducts, filterProducts, getCart } = require('../controller/userController');
const { createOrder } = require('../controller/paymentController');
const router = express.Router();

router.get('/approved_products', getApprovedProducts);
router.get('/getcart/:userId', getCart);
router.get('/filter_products', filterProducts);
router.put('/addCart/:userId', addToCart);   
router.put('/remove_from_cart/:userId', removeFromCart);
router.post('/create_order/:userId', createOrder);



module.exports = router;