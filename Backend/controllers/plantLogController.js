const PlantLogEntry = require("../models/PlantLogEntry.js");
const User = require("../models/User.js");

const logPlant = async (req, res, plantId) => {
  console.log("here");
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.loggedPlants.push(plantId);
    await user.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Plant ID added successfully to the user's array",
      });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createPlantLog = async (req, res) => {
  try {
    const { plantSpecies, scientificName, cycle, watering, sunlight } =
      req.body;

    // Create a new plant log entry
    const newPlantLogEntry = new PlantLogEntry({
      plantSpecies,
      scientificName,
      cycle,
      watering,
      sunlight,
    });
    await newPlantLogEntry.save();

    const plantLogId = newPlantLogEntry._id;

    await logPlant(req, res, plantLogId);

    res.status(201).json({ success: true, data: newPlantLogEntry });
  } catch (error) {
    console.error("Error creating plant log:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getPlantLogs = async (req, res) => {
  try {
    const plantLogs = await PlantLogEntry.find();

    res.status(200).json({ success: true, data: plantLogs });
  } catch (error) {
    console.error("Error fetching plant logs:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { createPlantLog, getPlantLogs, logPlant };
