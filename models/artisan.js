const mongoose = require('mongoose')

const artisanSchema = mongoose.Schema({
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
        default: 3
        // users  2,
        // admin 1
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

const artisans = mongoose.model('artisans', artisanSchema);
module.exports = artisans