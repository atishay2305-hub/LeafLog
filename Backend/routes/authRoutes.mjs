import express from 'express';
import passport from 'passport';
import { signup, login, logout, googleLogin } from '../controllers/authControllers.mjs';
import { ensureAuthenticated } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Use ensureAuthenticated middleware to protect this route
router.get('/search', ensureAuthenticated, (req, res) => {
    // This route is protected and can only be accessed by authenticated users
    res.send("You're authenticated!");
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', ensureAuthenticated, logout);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', googleLogin);

export default router;
