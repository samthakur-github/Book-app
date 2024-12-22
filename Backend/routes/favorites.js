const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const authenticateToken = require('./userAuth');

// Add Books to Favorites
router.put('/addbook-to-favorites', authenticateToken, async (req, res)=>{
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookdFavorite = userData.favorites.includes(bookid);

        if(isBookdFavorite){
            return res.status(200).json({ message: 'Book is already in the favorites' });
        }
        
        await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
        return res.status(200).json({ message: 'Book added to the favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove Books to Favorites
router.put('/removebook-to-favorites', authenticateToken, async (req, res)=>{
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);
        const isBookdFavorite = userData.favorites.includes(bookid);

        if(!isBookdFavorite) console.log("Book in not add in Favorites");
        
        if(isBookdFavorite){
            await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
        }
        
        return res.status(200).json({ message: 'Book removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get All Favorites Books of a User
router.get('/getAll-favorites-books', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;

        const userData = await User.findById(id).populate('favorites'); // populate used for fetching all data
        const favoriteBooks = userData.favorites;

        return res.json({ status: 'Success', data: favoriteBooks });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;