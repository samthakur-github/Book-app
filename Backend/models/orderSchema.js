const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orders: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'books'
    },
    status: {
        type: String,
        default: 'Order Placed',
        enum: [ 'Order Placed', 'Out for Delivery, Delieverd, Cancalled' ]
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);