const mongoose = require("mongoose");
const express = require("express");
const router = express.Router(); 

const plantLogEntrySchema = new mongoose.Schema(
  {
    common_name: { type: String, required: true, trim: true },
    scientific_name: { type: String, required: true, trim: true },
    other_name: { type: String, trim: true },
    cycle: { type: String, required: true, trim: true },
    watering: { type: String, required: true, trim: true },
    sunlight: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const PlantLogEntry =
  mongoose.models.PlantLogEntry ||
  mongoose.model("PlantLogEntry", plantLogEntrySchema);

router.post("/plant-logs", async (req, res) => {
  try {
    const newPlantLogEntry = new PlantLogEntry(req.body);
    await newPlantLogEntry.save();
    res.status(201).json(newPlantLogEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving plant log entry", error });
  }
});

module.exports = PlantLogEntry;
