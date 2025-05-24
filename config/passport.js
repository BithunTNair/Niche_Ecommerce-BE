const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const USERS = require('../models/userModel');
const jwt = require('jsonwebtoken');

passport.use(
    new googleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user= await USERS.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await USERS.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: null, 
                    role: 'user' 
                });
            }
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
            done(null, { user, token });
        } catch (error) {
            done(error, null);
        }
    }
    )
)
