// authService.js
import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET_KEY = "leafloglogin"; // Ideally, this should be in your environment variables

// Function to generate a new JWT token
export const generateToken = (user) => {
    return jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        },
        SECRET_KEY, { expiresIn: "1h" } // Token expires in 1 hour
    );
};

// Function to verify a token and return the decoded data
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};

// Function to get a user from the token
export const getUserFromToken = async(token) => {
    const decoded = verifyToken(token);
    if (!decoded) {
        throw new Error("Invalid Token");
    }
    const user = await User.findById(decoded.id);
    return user;
};

// You can also include other functions as needed, such as refreshing tokens,
// handling logout, etc.