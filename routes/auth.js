const express = require('express');
const { userRegistartion, generateOTP, verifyOTP, createPassword, login } = require('../controller/authController');
const passport = require('passport');
const router = express.Router();

router.post('/register_user', userRegistartion);
router.post('/generate_otp', generateOTP);
router.post('/verify_otp/:id', verifyOTP);
router.post('/create_password/:id', createPassword);
router.post('/login', login);
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = req.user.token;
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`); 
    }
)


module.exports = router;
