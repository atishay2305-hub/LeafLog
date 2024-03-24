import express from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.send('Welcome to home page');
});

export default router;
