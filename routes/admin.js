const express = require('express');
const { approveArtisan } = require('../controller/adminController');
const router = express.Router();

router.put('/artisan_approval/:userId', approveArtisan);


module.exports = router;