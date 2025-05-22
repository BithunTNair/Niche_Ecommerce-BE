

const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        status: {
            enum: ['unordered', 'ordered', 'shipped', 'delivered', 'cancelled'],
            type: String,
            default: 'unordered'
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;