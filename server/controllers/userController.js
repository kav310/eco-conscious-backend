const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Process = require("process");
const Recipe = require("../models/Recipe");

module.exports = {
    registerUser: async (req, res) => {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        const userAvailable = await User.findOne({email});
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered!");
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log(`User created ${user}`);
        if (user) {
            res.status(201).json({_id: user.id, email: user.email});
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
        res.json({message: "Register the user"});
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
                process.env.ACCESS_TOKEN_SECRET, // Replace with your secret key
                {expiresIn: '365d'} // Token expiration time
            );

            res.status(200).json({message: 'Login successful', token});
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    getUserProfile: async (req, res) => {
        try {
            // Fetch the user's details based on the user ID stored in req.user.id
            const user = await User.findById(req.user);

            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            // Fetch recipes added by the user
            const recipes = await Recipe.find({ userId: user._id });

            // Return user's profile details and recipes
            res.json({
                username: user.username,
                email: user.email,
                recipes,
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({error: 'An error occurred while fetching the profile'});
        }
    }
}
