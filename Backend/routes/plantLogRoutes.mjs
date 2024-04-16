import express from "express";
import {
    createPlantLog,
    getPlantLogs,
    sendWateringReminder,
} from "../controllers/plantLogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router
    .route("/")
    .post(authMiddleware, createPlantLog)
    .get(authMiddleware, getPlantLogs);
post("/send-watering-reminder", sendWateringReminder);


export default router;