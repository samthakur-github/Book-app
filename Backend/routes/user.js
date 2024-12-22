const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');

// Sign Up API
router.post('/sign-up', async(req, res)=>{
    try {
        const { username, email, password, address } = req.body;

        // Check the Username Langth should be more han 3
        if(username.length < 4){
            return res.status(400).json({ message: 'Username length should be greater then 3' });
        }

        // Check Username already exist
        const existingUser = await User.findOne({ username: username });
        if(existingUser){
            return res.status(400).json({ message: 'Username already exist' });
        }

        // Check Email already exist
        const existingEmail = await User.findOne({ email: email });
        if(existingEmail){
            return res.status(400).json({ message: 'Email already exist' });
        }

        // Check password length
        if(password.length <=5){
            return res.status(400).json({ message: 'Password length should be greater then 5' });
        }

        // hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // If everthing is good then User is created
        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            address: address
        });

        await newUser.save();

        return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Sign in Or Login API
router.post('/sign-in', async(req, res)=>{
    try {
       const { username, password } = req.body;

       const existingUser = await User.findOne({ username });

       if(!existingUser){
            res.status(400).json({ message: 'invalid credentails' });
       }

       // Compare the password with database store password    
       await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data){
                const authClaims = [{ name: existingUser.username }, { role: existingUser.role }];
                const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: '30d' })

                // Create the token, id and get the role on the status
                res.status(200).json({ id: existingUser.id, role: existingUser.role, token: token });
            }
            else{
                res.status(400).json({ message: 'Invalid Credentials' });
            }
       });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get User Information
router.get('/get-user', authenticateToken,async (req, res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password'); // select user for exlude the password
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Address API
router.put('/update-address', authenticateToken, async (req, res)=>{
    try {
        const { id } = req.headers;
        const { address } = req.body;

        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: 'Address Updated Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;