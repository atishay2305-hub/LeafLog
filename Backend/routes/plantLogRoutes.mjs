import express from 'express';
import { logPlant } from '../controllers/plantLogController.js';
import { getUserFromToken } from '../services/authService.js'; // Import getUserFromToken from authService
import { getUserPlants } from '../controllers/userControllers.js';

const router = express.Router();
const SECRET = 'leafloglogin'; // Set your secret here

// Middleware to fetch user from token
const fetchUserFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        const user = await getUserFromToken(token);
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to fetch user's plants
const fetchUserPlants = async (req, res, next) => {
    try {
        const userPlants = await getUserPlants(req.user._id); // Assuming req.user._id is the correct user ID
        req.userPlants = userPlants; // Attach user's plants to request object
        next();
    } catch (error) {
        console.error('Error fetching user plants:', error.message);
        return res.status(500).json({ message: 'Failed to fetch user plants' });
    }
};

router.get('/user/myplants', fetchUserFromToken, fetchUserPlants, async (req, res) => {
    try {
        return res.json({ plants: req.userPlants });
    } catch (error) {
        console.error('Error fetching user plants:', error.message);
        return res.status(500).json({ message: 'Failed to fetch user plants' });
    }
});

router.post('/log-plant/:plantId', fetchUserFromToken, fetchUserPlants, async (req, res) => {
    const { plantId } = req.params;
    try {
        // Check if the logged plant ID belongs to the user's plants
        if (!req.userPlants.includes(plantId)) {
            return res.status(403).json({ message: 'Plant does not belong to user' });
        }
        await logPlant(req, res, plantId);
    } catch (error) {
        console.error('Error in logging plant:', error.message);
        res.status(500).json({ message: 'Failed to log plant' });
    }
});

export default router;
