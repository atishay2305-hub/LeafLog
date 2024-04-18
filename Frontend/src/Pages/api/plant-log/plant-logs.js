import DBconnection from "../../../../../Backend/utils/DBConnection";
import PlantLogEntry from "../../../../../Backend/models/PlantLogEntry";
import { logPlant } from "../../../../../Backend/controllers/plantLogController";
import Joi from "joi";
import User from "../../../../../Backend/models/User"; 

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

            // Extract the newly created plant log ID
            const plantLogId = newPlantLogEntry._id;

            // Send the response with the new plant log entry
            res.status(201).json({ success: true, data: newPlantLogEntry });

            // After successfully creating a new plant log entry, send a watering reminder email
            // and then update the user's logged plants with the new log ID.
            await logPlant(req, res, plantLogId);
        } catch (error) {
            res
                .status(500)
                .json({ success: false, message: "Something went wrong", error });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

// Function to handle sending the watering reminder email and adding the logged plant ID to the user's array
const logPlant = async (req, res, plantLogId) => {
    try {
        // After adding the plantLogId to the user's array
        const userId = req.user.id; // Assuming you're using the authenticated user's ID from the token
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Add the plantLogId to the user's loggedPlants array
        user.loggedPlants.push(plantLogId);
        await user.save();

        // Send the response indicating that the plantLogId has been added to the user's array
        res.status(200).json({ success: true, message: "Plant log ID added successfully to the user's array" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
