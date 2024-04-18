import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPlantLog, getPlantLogs, logPlant } from '../controllers/plantLogController.js';

const router = express.Router();
const SECRET = 'leafloglogin'; // Set your secret here

router
    .route('/')
    .post(authMiddleware(SECRET), createPlantLog)
    .get(authMiddleware(SECRET), getPlantLogs);

router.post('/log-plant', authMiddleware(SECRET), logPlant);

export default router;
