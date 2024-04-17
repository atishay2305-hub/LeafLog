// pages/api/plant-logs.js

import DBconnection from "../../../../../Backend/utils/DBConnection";
import PlantLogEntry from "../../../../../Backend/models/PlantLogEntry";
import { sendWateringReminder } from "../../../../../Backend/controllers/plantLogController";
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

        // Handle sending the watering reminder email
        try {
            // You will need to fetch user details from your database here
            // using the information available in the request, for example, the user ID.
            // The below is a simplified example assuming you have a function to send emails.

            // const user = await User.findById(req.body.userId);
            // if (!user) {
            //     return res.status(404).json({ success: false, message: 'User not found' });
            // }

            // Simulating a user object for demonstration purposes:
            const user = {
                email: 'example@example.com', // This should be fetched from your database
                name: 'John Doe'
            };

            const emailResponse = await sendWateringReminder(
                user.email,
                user.name,
                req.body.plantSpecies
            );

            res.status(200).json({ success: true, message: 'Reminder sent successfully', data: emailResponse });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to send reminder", error });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};