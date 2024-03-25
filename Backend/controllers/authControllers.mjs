import passport from 'passport';
import { createUser, checkUser } from '../data/users.mjs';
import { ensureAuthenticated } from "../middleware/authMiddleware.mjs";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, DOB } = req.body;
        if (!firstName || !lastName || !userName || !email || !password || !DOB) {
            throw new Error("All fields are required for signup.");
        }
        
        // const existingUser = await checkUser(email);
        // if (existingUser) {
        //     throw new Error("Email already exists. Please use a different email address.");
        // }
        const newUser = await createUser(firstName, lastName, userName, email, password, DOB);

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




export const login = async (req, res, next) => { // Add 'next' parameter
    try {
        const { email, password } = req.body;

        // Check if the user with the given email exists
        const existingUser = await checkUser(email, password);
        if (!existingUser) {
            throw new Error("User with this email does not exist or the password is incorrect.");
        }

        // If authentication succeeds, you can handle success here
        res.status(200).json({ message: 'Login successful', user: existingUser });

    } catch (error) {
        console.log("here")
        res.status(400).json({ error: error.message });
    }
};


export const logout = (req, res) => {
    req.logout();
    res.redirect('/auth/login');
};

export const googleLogin = passport.authenticate('google', {
    successRedirect: '/search',
    failureRedirect: '/google/failure'
});


