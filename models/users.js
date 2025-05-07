const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date
    },
    role: {
        type: Number,
        default: 2
         // admin 1
        // users 2
        // artisan 3

    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users