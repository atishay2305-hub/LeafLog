import express from "express";
import { ObjectId } from "mongodb";
import {
  getPlantDetailsByCommonName,
  getPlantDetailsByScientificName,
  getAllOtherNames,
  getAllFamilies,
  getAllOrigins,
  getPlantCommonNames,
  getScientificNames,
} from "../data/plantData.mjs";
import {
  details,
  plants as plantCollection,
} from "../config/mongoCollections.mjs";
import { plant_data } from "../data/plantData.mjs";

const router = express.Router();

// Middleware to handle errors
router.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
});

// Middleware to ensure JSON responses
router.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Route to search plant data by common_name (case-insensitive)
router.get("/api/plantdata/details", async (req, res, next) => {
  try {
    const { common_name } = req.query;

    if (!common_name) {
      return res
        .status(400)
        .json({ error: "Common name is required for search" });
    }

    // Call the function to get plant details by common name (case-insensitive)
    const plantDetails = await getPlantDetailsByCommonName(common_name);

    if (plantDetails) {
      return res.json(plantDetails);
    } else {
      return res.status(404).json({ error: "No matching plant details found" });
    }
  } catch (error) {
    next(error);
  }
});

// Route to search plant data by other criteria (e.g., scientific name, cycle)
router.get("/api/plantdata/search", async (req, res, next) => {
  try {
    const { common_name, scientific_name, cycle, watering, other_name } =
      req.query;

    const minLength = 1; 

    if (
      (common_name && common_name.length >= minLength) ||
      (scientific_name && scientific_name.length >= minLength) ||
      (cycle && cycle.length >= minLength) ||
      (watering && watering.length >= minLength) ||
      (other_name && other_name.length >= minLength)
    ) {

      const commonNameRegexPattern = new RegExp(common_name, "i");
      const scientificNameRegexPattern = new RegExp(scientific_name, "i");
      const cycleRegexPattern = new RegExp(cycle, "i");
      const wateringRegexPattern = new RegExp(watering, "i");
      const otherNameRegexPattern = new RegExp(other_name, "i");


      await plant_data();

      const plantCollectionRef = await plantCollection();
      const plantData = await plantCollectionRef.find().toArray();

      let searchResults = [];

      if (common_name) {
        searchResults = plantData.filter((plant) =>
          commonNameRegexPattern.test(plant.common_name)
        );
      }

      if (scientific_name) {
        const scientificNameSearchResult = plantData.filter((plant) =>
          scientificNameRegexPattern.test(plant.scientific_name)
        );
        searchResults = [...searchResults, ...scientificNameSearchResult];
      }

      if (cycle) {
        const cycleSearchResult = plantData.filter((plant) =>
          cycleRegexPattern.test(plant.cycle)
        );
        searchResults = [...searchResults, ...cycleSearchResult];
      }

      if (watering) {
        const wateringSearchResult = plantData.filter((plant) =>
          wateringRegexPattern.test(plant.watering)
        );
        searchResults = [...searchResults, ...wateringSearchResult];
      }

      if (other_name) {
        const otherNameSearchResult = plantData.filter((plant) =>
          otherNameRegexPattern.test(plant.other_name)
        );
        searchResults = [...searchResults, ...otherNameSearchResult];
      }

      searchResults = searchResults.slice(0, 20);

      if (searchResults.length > 0) {
        searchResults = Array.from(new Set(searchResults));
        return res.json(searchResults);
      }
    }

    return res.status(404).json({ error: "Plant details not found" });
  } catch (error) {
    next(error);
  }
});

router.get("/api/plantdata", async (req, res, next) => {
  try {
    const collection = await plantCollection();
    const allPlantData = await collection.find().toArray();
    return res.json(allPlantData);
  } catch (error) {
    next(error);
  }
});

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

router.get("/api/plantdata/other_names", async (req, res, next) => {
  try {
    const otherNames = await getAllOtherNames();
    res.json(otherNames);
  } catch (error) {
    next(error);
  }
});

router.get("/api/plantdata/families", async (req, res, next) => {
  try {
    const families = await getAllFamilies();
    res.json(families);
  } catch (error) {
    next(error);
  }
});

router.get("/api/plantdata/origins", async (req, res, next) => {
  try {
    const origins = await getAllOrigins();
    res.json(origins);
  } catch (error) {
    next(error);
  }
});

router.get("/api/plantdata/common_names", async (req, res, next) => {
  try {
    const commonNames = await getPlantCommonNames();
    res.json(commonNames);
  } catch (error) {
    next(error);
  }
});

router.get("/api/plantdata/scientific_names", async (req, res, next) => {
  try {
    const scientificNames = await getScientificNames();
    res.json(scientificNames);
  } catch (error) {
    next(error);
  }
});

export default router;
