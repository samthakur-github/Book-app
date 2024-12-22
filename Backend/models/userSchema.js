const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    role: {
        type: String,
        default: "user",
        enum: [ "user", "admin" ]
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);