import passport from 'passport';
import { createUser, checkUser } from '../data/users.mjs';

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, DOB } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !userName || !email || !password || !DOB) {
            throw new Error("All fields are required for signup.");
        }

        // Check if the email already exists
        const existingUser = await checkUser(email);
        if (existingUser) {
            throw new Error("Email already exists. Please use a different email address.");
        }

        // Create the new user
        const newUser = await createUser(firstName, lastName, userName, email, password, DOB);

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
});

export const logout = (req, res) => {
    req.logout();
    res.redirect('/auth/login');
};

export const googleLogin = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
});
