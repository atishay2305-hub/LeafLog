import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { userPlants } from "../config/mongoCollections.mjs";

const SECRET = 'leafloglogin';

const router = express.Router();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. Token not provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ error: "Invalid token." });
    }
};

// Middleware to ensure JSON responses
router.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Route to log a plant for a user
router.post("/logplant", verifyToken, async (req, res, next) => {
    try {
        const { plantSpecies, scientificName, otherName, cycle, watering, sunlight, userEmail } = req.body;

        // Extract user details from the token
        const userId = req.user.id; // Assuming the user id is stored in the token payload as 'id'

        const userPlantsCollection = await userPlants();

        const result = await userPlantsCollection.insertOne({
            userId: new ObjectId(userId), // Adjusted to use new ObjectId()
            plantSpecies,
            scientificName,
            otherName,
            cycle,
            watering,
            sunlight,
            userEmail,
        });

        res.json({ message: "Plant logged successfully", insertedId: result.insertedId });
    } catch (error) {
        next(error);
    }
});

// Route to get all plants logged by a user
router.get("/userplants", verifyToken, async (req, res, next) => {
    try {
        // Extract user details from the token
        const userId = req.user.id; // Assuming the user id is stored in the token payload as 'id'

        const userPlantsCollection = await userPlants();

        const userPlants = await userPlantsCollection.find({ userId: new ObjectId(userId) }).toArray(); // Adjusted to use new ObjectId()

        res.json(userPlants);
    } catch (error) {
        next(error);
    }
});

export default router;