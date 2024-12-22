const express = require('express');
const router = express.Router();
const Book = require('../models/bookSchema');
const User = require('../models/userSchema');
const Order = require('../models/orderSchema');
const authenticateToken = require('./userAuth');

// Place Order API
router.post('/place-order', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for(const orderData of order){
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDB = await newOrder.save();

            // Saving Order in user model
            await User.findByIdAndUpdate(id, { $push : { orders: orderDataFromDB._id } });


            // Clear the Cart
            await User.findByIdAndDelete(id, { $pull : { cart: orderData._id } });

            return res.json({ status: 'Success', message: 'Order Placed Successfully' });
        };
    } catch (error) {
        return res.status(500).json({ message: 'An error occuured' });
    }
});

// Get Order History of a User
router.get('/get-order-history', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;
       
        const userData = await User.findById(id).populate({ path: 'orders', populate: { path: 'book' } });

        const ordersData = userData.orders.reverse();

        return res.json({ status: "Success", data: ordersData });
    } catch (error) {
        return res.status(500).json({ message: 'An error occuured' });
    }
});

// Get All Order --- Admin
router.get('/get-all-orders', authenticateToken, async (req, res)=>{
    try {
        const userData = await Order.find().populate({ path: 'book' }).populate({ path: 'user' }).sort({ createdAt: -1 });    
        
        return res.json({ status: "Success", data: userData });
    } catch (error) {
        return res.status(500).json({ message: 'An error occuured' });
    }
});

// Update Order --- Admin
router.put('/update-status/:id', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        
        return res.json({ status: "Success", message: 'Status updated Succuessfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occuured' });
    }
});

module.exports = router;