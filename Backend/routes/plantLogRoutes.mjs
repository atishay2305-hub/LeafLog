import express from "express";
import {
    createPlantLog,
    getPlantLogs,
    sendWateringReminder,
} from "../controllers/plantLogController.js";
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router
    .route("/")
    .post(authMiddleware, createPlantLog)
    .get(authMiddleware, getPlantLogs)
    .post("/send-watering-reminder", sendWateringReminder); // Define the route using router.post


export default router;