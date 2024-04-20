import express from 'express';
import { createPlantLog, getPlantLogs, logPlant } from '../controllers/plantLogController.js';
import { getUserFromToken } from '../services/authService.js'; // Import getUserFromToken from authService

const router = express.Router();
const SECRET = 'leafloglogin'; // Set your secret here

router
    .route('/')
    .post(async (req, res, next) => { // Use async middleware to fetch user from token
        try {
            const token = req.cookies.token; // Assuming token is stored in cookies
            const user = await getUserFromToken(token);
            req.user = user; // Attach user to request object
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }, createPlantLog)
    .get(async (req, res, next) => { // Use async middleware to fetch user from token
        try {
            const token = req.cookies.token; // Assuming token is stored in cookies
            const user = await getUserFromToken(token);
            req.user = user; // Attach user to request object
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }, getPlantLogs);

router.post('/log-plant', async (req, res, next) => { // Use async middleware to fetch user from token
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        const user = await getUserFromToken(token);
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}, logPlant);

export default router;
