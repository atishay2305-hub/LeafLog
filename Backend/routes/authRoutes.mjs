import express from 'express';
import passport from 'passport';
import { signup, login, logout, googleLogin } from '../controllers/authControllers.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', googleLogin);

export default router;
