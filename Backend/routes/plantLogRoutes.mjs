import express from 'express';
import { createPlantLog, getPlantLogs, logPlant } from '../controllers/plantLogController.js';
import { getUserFromToken } from '../services/authService.js'; // Import getUserFromToken from authService
import { getUserPlants } from '../data/plantData.mjs';
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

router.post('/log-plant/:plantId', async (req, res, next) => { // Use async middleware to fetch user from token
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        const user = await getUserFromToken(token);
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}, async (req, res) => {
    const { plantId } = req.params;
    try {
        await logPlant(req, res, plantId);
    } catch (error) {
        console.error('Error in logging plant:', error.message);
        res.status(500).json({ message: 'Failed to log plant' });
    }
});

router.get('/api/plantdata', async (req, res) => {
    const { searchQuery } = req.query;
    const plants = await getUserPlants(); // Call getUserPlants from data layer
    const filteredPlants = plants.filter((plant) =>
        plant.plantSpecies.toLowerCase().includes(searchQuery.toLowerCase())
    );
    res.json(filteredPlants);
});

export default router;
