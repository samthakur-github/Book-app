const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const Book = require('../models/bookSchema');
const authenticateToken = require('./userAuth');

// *******************************ADMIN APIS*********************************

// Add Book API - admin
router.post('/add-book', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(400).json({ message: 'Only admins can do this work' });
        }

        // Create a Book in Database
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });

        await book.save();
        res.status(200).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Book API
router.put('/update-book', authenticateToken, async (req, res)=>{
    try {
        const { bookid } = req.headers;

        // Update the Book details
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });

        return res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error ouccured' });
    }
});

// Delete Book API
router.delete('/delete-book', authenticateToken, async (req, res)=>{
    try {
        const { bookid } = req.headers;

        if(!bookid){
            console.log("BookId is required");
            return res.status(500).json({ message: "BookID is required" });
        }

        await Book.findByIdAndDelete(bookid);
        
        return res.status(200).json({ message: 'Book Deleted Successfully' }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error ouccured' }); 
    }
});

// Get All Books API
router.get('/getall-books', authenticateToken, async (req, res)=>{
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        
        return res.json({ status: 'Success', data: books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error ouccured' }); 
    }
});

// Get Recently Added Books
router.get('/recentlyAdd-books', authenticateToken, async (req, res)=>{
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        
        return res.json({ status: 'Success', data: books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error ouccured' }); 
    }
});

// Get Book By ID
router.get('/get-BookByID/:id', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        return res.json({ status: 'Success', data: book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error ouccured' }); 
    }
});

module.exports = router;