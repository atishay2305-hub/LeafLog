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

export const googleLoginCallback = async (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication.' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        // Check if the user exists in the database
        const existingUser = await checkUser(user.email); // Assuming you have a function to check user by email

        if (!existingUser) {
            // If the user does not exist, create a new user based on Google information
            try {
                const newUser = await createUser(user.firstName, user.lastName, user.email, user.password, null); // Assuming user data structure returned from Google

                req.logIn(newUser, async (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'An error occurred during login.' });
                    }
                    return res.status(200).json({ message: 'Signup and login successful.', user: newUser });
                });
            } catch (error) {
                return res.status(500).json({ message: 'Error creating user.', error: error.message });
            }
        } else {
            // If the user already exists, log them in
            req.logIn(existingUser, async (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred during login.' });
                }
                return res.status(200).json({ message: 'Login successful.', user: existingUser });
            });
        }
    })(req, res, next);
};

export const googleLogin = passport.authenticate('google', {
    successRedirect: '/search',
    failureRedirect: '/google/failure'
});


