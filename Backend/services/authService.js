const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "leafloglogin";

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

exports.verifyToken = function(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};

exports.getUserFromToken = async function(token) {
    const decoded = exports.verifyToken(token);
    if (!decoded) {
        throw new Error("Invalid Token");
    }
    const user = await User.findById(decoded.id);
    return user;
};

