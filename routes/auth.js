const express = require('express');
const { userRegistartion } = require('../controller/authController');
const router = express.Router();


router.post('/register', userRegistartion);


module.exports = router;
