const express = require('express');
const { getAllProducts } = require('../controller/userController');
const router = express.Router();

router.get('/get_products', getAllProducts);


module.exports = router;