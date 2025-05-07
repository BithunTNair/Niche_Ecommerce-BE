const express = require('express');
const { userRegistartion, generateOTP, verifyOTP, createPassword, login } = require('../controller/authController');
const router = express.Router();

router.post('/register', userRegistartion);
router.post('/generate_otp/:id', generateOTP);
router.post('/verify_otp/:id', verifyOTP);
router.post('/create_password/:id', createPassword);
router.post('/login', login);


module.exports = router;
