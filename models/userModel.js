const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,

    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'artisan', 'admin'],
        default: 'user'

    },
    artisanProfile: {
        bio: String,
        skill: [String],
        isApproved: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['pending', 'approved','rejected'],
            default: 'pending'
        }
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