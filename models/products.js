const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
        ref: 'artisans'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})