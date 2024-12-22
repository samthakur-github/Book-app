const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const authenticateToken = require('./userAuth');

// Add to Cart OR Put Book to Cart API
router.put('/add-to-cart', authenticateToken, async (req, res)=>{
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookdInCart = userData.cart.includes(bookid);

        if(isBookdInCart){
            return res.json({ status: 'Success', message: 'Book is already in Cart' });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    } catch (error) {
        res.status(200).json({ message: 'An error occured' });
    }
});

// remove from Cart
router.delete('/remove-to-cart/:id', authenticateToken, async (req, res)=>{
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

        return res.json({ status: "Success", message: 'Book removed from cart' });
    } catch (error) {
        res.status(200).json({ message: 'An error occured' });
    }
});

// Get Cart of a User
router.get('/get-user-cart', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('cart');
        const cart = userData.cart.reverse(); // revserse() use for recently add book show on top

        return res.json({ status: "Success", data: cart });
    } catch (error) {
        res.status(200).json({ message: 'An error occured' });
    }
});

module.exports = router;