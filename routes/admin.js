const express = require('express');
const { approveArtisan, approveOrRejectProducts, getAllArtisans, getAllUsers } = require('../controller/adminController');
const router = express.Router();

router.put('/artisan_approval/:userId', approveArtisan);
router.put('/product_approval/:productId', approveOrRejectProducts);
router.get('/all_users', getAllUsers);
router.get('/all_artisans', getAllArtisans);


module.exports = router;