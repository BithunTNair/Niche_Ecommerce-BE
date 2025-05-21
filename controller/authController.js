const USERS = require('../models/userModel');
const crypto = require('crypto');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const { sendOtp } = require('../utils/sendEmail')
const userRegistartion = (req, res) => {
    const { fullName, email, mobileNumber } = req.body;
    try {
        const user = new USERS({
            fullName: fullName,
            email: email,
            mobileNumber: mobileNumber,
        }).save().then((response) => {
            res.status(200).json({ message: 'user details have been registered', registered_user: response });
            console.log(response);

        }).catch((err) => {
            console.log(err);
            if (err.code === 11000 && err.errmsg.includes('mobileNumber')) {
                return res.status(400).json({ message: 'This mobile number is already exist' });
            } else if (err.code === 11000 && err.errmsg.includes('email')) {
                return res.status(405).json({ message: 'This email is exist' });
            }
            return res.status(500).json({ message: 'something went wrong' });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

const generateOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await USERS.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'user is not found' })
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log(otp);

        existingUser.otp = otp;
        existingUser.otpExpires = Date.now() + 10 * 60 * 1000;
        await existingUser.save()
        sendOtp(email, otp);
        return res.status(200).json({ message: 'OTP has been sent to your entered Gmail account' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const verifyOTP = async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;
    try {
        const currentUser = await USERS.findById(id);
        console.log(currentUser);

        if (otp != currentUser.otp || currentUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP is not valid' })
        }
        console.log('hitted');
        currentUser.otp = null;
        currentUser.otpExpires = null;
        await currentUser.save();
        return res.status(200).json({ message: "OTP verification successfull" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const createPassword = async (req, res) => {
    const { id } = req.params.id
    const { password } = req.body;
    try {
        const currentUser = await USERS.findOne({ id });
        console.log(currentUser);

        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async function (err, hash) {
            if (err) {
                console.log('Password is not hashed' + err)

            }
            currentUser.password = hash
            await currentUser.save();
            return res.status(200).json({ message: 'user signedup successfully' })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await USERS.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'user is not found' })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                user.password = undefined;
                const options = {
                    expiresIn: '1d'
                };
                const token = jwt.sign({ ...user }, process.env.SECRET_KEY, options);
                // console.log(token);

                return res.status(200).json({ user: user })
            } else if (err) {
                return res.status(401).json({ message: 'Invalid Credentials' })
            }

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' })

    }
};


module.exports = { userRegistartion, generateOTP, verifyOTP, createPassword, login }