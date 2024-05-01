import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { userPlants } from "../config/mongoCollections.mjs";

const SECRET = "leafloglogin";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access denied. Token not provided." });
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

router.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post("/logplant", verifyToken, async (req, res, next) => {
  try {
    const {
      plantSpecies,
      scientificName,
      otherName,
      cycle,
      watering,
      sunlight,
      userEmail,
    } = req.body;

    const userId = req.user.id; 

    const userPlantsCollection = await userPlants();

    const result = await userPlantsCollection.insertOne({
      userId: new ObjectId(userId), 
      plantSpecies,
      scientificName,
      otherName,
      cycle,
      watering,
      sunlight,
      userEmail,
    });

    res.json({
      message: "Plant logged successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/userplants", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const userPlantsCollection = await userPlants();

    const userPlantsData = await userPlantsCollection
      .find({ userId: new ObjectId(userId) })
      .toArray(); 

    res.json(userPlantsData); 
  } catch (error) {
    next(error);
  }
});

export default router;
