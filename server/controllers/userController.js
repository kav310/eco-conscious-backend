const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const {username, email, password, bloodGroup} = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({message: 'All fields are mandatory!'});
            }

            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({message: 'User already registered!'});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            // Generate a JWT token
            const token = jwt.sign(
                {userId: newUser._id, email: newUser.email},
                'your-secret-key', // Replace with a secure secret key
                {expiresIn: '1h'} // Token expiration time
            );

            // Respond with the token
            res.status(201).json({message: 'User registered successfully', token});
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'});
            }

            const user = await User.findOne({email});

            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            // Generate a JWT token
            const token = jwt.sign(
                {userId: user._id, email: user.email},
                'your-secret-key', // Replace with your secret key
                {expiresIn: '1h'} // Token expiration time
            );

            res.status(200).json({message: 'Login successful', token});
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
}
