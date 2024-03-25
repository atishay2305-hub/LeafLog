import express from 'express';
import passport from 'passport';
import { signup, login, logout, googleLogin, googleLoginCallback } from '../controllers/authControllers.mjs';
import { ensureAuthenticated } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Use ensureAuthenticated middleware to protect this route
router.get('/search', ensureAuthenticated, (req, res) => {
    // This route is protected and can only be accessed by authenticated users
    res.send("You're authenticated!");
});

// Routes for signup, login, logout, and Google OAuth
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', ensureAuthenticated, logout);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', googleLogin);

// Route for handling Google OAuth callback
router.get('/google/callback', googleLoginCallback);

export default router;
