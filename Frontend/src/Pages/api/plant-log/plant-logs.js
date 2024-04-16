// pages/api/plant-logs.js

import DBconnection from "../../../../../Backend/utils/DBConnection";
import PlantLogEntry from "../../../../../Backend/models/PlantLogEntry";
import Joi from "joi";

const plantLogSchema = Joi.object({
    common_name: Joi.string().required(),
    scientific_name: Joi.string().required(),
    // Add the rest of the validation based on your schema
});

export default async(req, res) => {
    await DBconnection();

    // POST request for creating a new plant log entry
    if (req.method === "POST") {
        const { error } = plantLogSchema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        try {
            const newPlantLogEntry = new PlantLogEntry(req.body);
            await newPlantLogEntry.save();
            res.status(201).json({ success: true, data: newPlantLogEntry });
        } catch (error) {
            res
                .status(500)
                .json({ success: false, message: "Something went wrong", error });
        }
    }
};