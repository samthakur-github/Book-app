const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requied: true
    },
    desc: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('books', bookSchema);