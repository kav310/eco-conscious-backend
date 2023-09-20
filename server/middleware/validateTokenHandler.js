const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization; // Corrected header name to "authorization"

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        console.log('Server-Side Secret Key:', process.env.ACCESS_TOKEN_SECRET, token);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                res.status(401);
                throw new Error("User is not authorized");
            }

            console.log('Server-Side decoded:', decoded)

            req.user = decoded.userId;
            console.log('User Data from Token:', req.user); // Add this line for debugging
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    } else {
        res.status(401);
        throw new Error("Bearer token not found in the Authorization header");
    }
});

module.exports = validateToken;
