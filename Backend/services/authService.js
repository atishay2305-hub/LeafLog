const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "leafloglogin"; // Ideally, this should be in your environment variables

// Function to generate a new JWT token
exports.generateToken = function(user) {
    return jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        },
        SECRET, { expiresIn: "1h" } // Token expires in 1 hour
    );
};

// Function to verify a token and return the decoded data
exports.verifyToken = function(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};

// Function to get a user from the token
exports.getUserFromToken = async function(token) {
    const decoded = exports.verifyToken(token);
    if (!decoded) {
        throw new Error("Invalid Token");
    }
    const user = await User.findById(decoded.id);
    return user;
};

