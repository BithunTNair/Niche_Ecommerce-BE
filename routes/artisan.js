const express = require('express');
const { addProduct, deleteProduct} = require('../controller/artisanController');
const upload = require('../middleware/upload');
const { addToCart } = require('../controller/userController');
const router = express.Router();

router.post('/add_product',upload, addProduct);
router.delete('/delete_product/:id', deleteProduct);
              


module.exports = router;