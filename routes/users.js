const express = require('express');
const { getAllProducts, addToCart } = require('../controller/userController');
const router = express.Router();

router.get('/get_products', getAllProducts);
router.put('/addCart/:userId', addToCart);   


module.exports = router;