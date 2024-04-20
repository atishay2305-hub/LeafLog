const PlantLogEntry = require("../models/PlantLogEntry.js");
const User = require("../models/User.js");

// Function to send a watering reminder
const sendWateringReminder = async (req, res) => {
  try {
    // Your logic for sending a watering reminder goes here
  } catch (error) {
    // Handle errors
    console.error("Error sending watering reminder:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Function to handle logging a plant and sending the watering reminder email if needed
const logPlant = async (req, res, plantId) => {
  console.log("here")
  try {
    const userId = req.user.id; // Assuming you're using the authenticated user's ID from the token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add the plantId to the user's loggedPlants array
    user.loggedPlants.push(plantId);
    await user.save();

    // Send the watering reminder email here if needed

    // Send the response indicating that the plantId has been added to the user's array
    res.status(200).json({ success: true, message: "Plant ID added successfully to the user's array" });
  } catch (error) {                                              
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to create a new plant log entry
const createPlantLog = async (req, res) => {
  try {
    // Assuming req.body contains the necessary data for creating a new plant log entry
    const { plantSpecies, scientificName, cycle, watering, sunlight } = req.body;

    // Create a new plant log entry
    const newPlantLogEntry = new PlantLogEntry({
      plantSpecies,
      scientificName,
      cycle,
      watering,
      sunlight,
    });

    // Save the new plant log entry to the database
    await newPlantLogEntry.save();

    // Extract the newly created plant log ID
    const plantLogId = newPlantLogEntry._id;

    // After successfully creating a new plant log entry, send a watering reminder email
    // and then update the user's logged plants with the new log ID.
    await logPlant(req, res, plantLogId);

    // Send a response indicating success
    res.status(201).json({ success: true, data: newPlantLogEntry });
  } catch (error) {
    // Handle errors
    console.error("Error creating plant log:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Function to get all plant logs
const getPlantLogs = async (req, res) => {
  try {
    // Retrieve all plant logs from the database
    const plantLogs = await PlantLogEntry.find();

    // Send the plant logs as a response
    res.status(200).json({ success: true, data: plantLogs });
  } catch (error) {
    // Handle errors
    console.error("Error fetching plant logs:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { createPlantLog, getPlantLogs, sendWateringReminder, logPlant };
