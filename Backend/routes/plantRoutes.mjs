import express from "express";
import { ObjectId } from "mongodb";
import {
  plant_data,
  detailsData,
  getPlantDetailsByCommonName,
  getPlantDetailsByScientificName,
  getAllOtherNames,
  getAllFamilies,
  getAllOrigins,
  getPlantCommonNames,
  getScientificNames,
} from "../data/plantData.mjs";
import { details, plants as plantCollection } from "../config/mongoCollections.mjs";

const router = express.Router();

// Middleware to handle errors
router.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Middleware to ensure JSON responses
router.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Initialize data
plant_data();
detailsData();

// Route to get all plant data
router.get("/api/plantdata", async (req, res, next) => {
  try {
    const collection = await plantCollection();
    const allPlantData = await collection.find().toArray();
    return res.json(allPlantData);
    console.log(allPlantData)
  } catch (error) {
    next(error);
  }
});

// Route to get plant details by ID
router.get("/api/plantdata/:id", async (req, res, next) => {
  try {
    const requestedId = new ObjectId(req.params.id);
    const collection = await details();
    const plantDetails = await collection.findOne({ _id: requestedId });
    if (!plantDetails) {
      return res.status(404).json({ error: "Plant details not found" });
    }
    res.json(plantDetails);
  } catch (error) {
    next(error);
  }
});

// Route to search plant by common name

router.get("/api/plantdata/search/common_name", async (req, res, next) => {
  try {
    const commonName = req.query.name;
    const plantDetails = await getPlantDetailsByCommonName(commonName);
    if (!plantDetails) {
      return res.status(404).json({ error: "Plant details not found" });
    }
    res.json(plantDetails);
  } catch (error) {
    next(error);
  }
});

// Route to search plant by scientific name
router.get("/api/plantdata/search/scientific_name", async (req, res, next) => {
  try {
    const scientificName = req.query.name;
    const plantDetails = await getPlantDetailsByScientificName(scientificName);
    if (!plantDetails) {
      return res.status(404).json({ error: "Plant details not found" });
    }
    res.json(plantDetails);
  } catch (error) {
    next(error);
  }
});

// Route to get all other names
router.get("/api/plantdata/other_names", async (req, res, next) => {
  try {
    const otherNames = await getAllOtherNames();
    res.json(otherNames);
  } catch (error) {
    next(error);
  }
});

// Route to get all families
router.get("/api/plantdata/families", async (req, res, next) => {
  try {
    const families = await getAllFamilies();
    res.json(families);
  } catch (error) {
    next(error);
  }
});

// Route to get all origins
router.get("/api/plantdata/origins", async (req, res, next) => {
  try {
    const origins = await getAllOrigins();
    res.json(origins);
  } catch (error) {
    next(error);
  }
});

// Route to get all common names
router.get("/api/plantdata/common_names", async (req, res, next) => {
  try {
    const commonNames = await getPlantCommonNames();
    res.json(commonNames);
  } catch (error) {
    next(error);
  }
});

// Route to get all scientific names
router.get("/api/plantdata/scientific_names", async (req, res, next) => {
  try {
    const scientificNames = await getScientificNames();
    res.json(scientificNames);
  } catch (error) {
    next(error);
  }
});

export default router;

