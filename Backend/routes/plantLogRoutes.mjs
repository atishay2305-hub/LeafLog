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
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

});


export const getUserPlants = async () => {
    try {
        // Add your logic to fetch user plants here
        const response = await axios.get('/api/user/plants'); // Assuming the endpoint is correct
        return response.data;
    } catch (error) {
        console.error('Error fetching user plants:', error);
        return [];
    }
};

router.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  });
  
  router.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });
  
// backend/routes/plantRoutes.js



router.get('/api/user/plants', async (req, res, next) => {
  try {
    // Assuming you have a way to identify the user, fetch user plants based on user ID or some other identifier
    const userId = req.user.id; // Adjust as needed, assuming user ID is attached to the request object
    const userPlants = await getUserPlants(userId);
    res.json(userPlants);
  } catch (error) {
    console.error('Error fetching user plants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
