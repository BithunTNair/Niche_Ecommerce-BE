const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    artisan: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    isVerified: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending'
    }
});

const products = mongoose.model('products', productSchema);
module.exports = products;