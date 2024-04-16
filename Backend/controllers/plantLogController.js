import PlantLogEntry from "../models/PlantLogEntry.js";
import User from "../models/User.js";
import { mailTransporter } from "../App.mjs"; // Ensure that mailTransporter is exported from App.mjs

// Function to send a watering reminder email
export const sendWateringReminder = async(req, res) => {
    try {
        const { plantLogId } = req.body;
        // Ensure that the plant log entry includes the user information
        const plantLogEntry = await PlantLogEntry.findById(plantLogId).populate(
            "user"
        );


        if (!plantLogEntry) {
            return res.status(404).json({ message: "Plant log entry not found" });
        }

        // If user is populated from the plantLogEntry no need to fetch again
        const user = plantLogEntry.user;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare the email details
        const emailDetails = {
            from: '"Plant Care Reminder" <no-reply@yourdomain.com>', // Use an email from your domain or environment variables
            to: user.email,
            subject: "Watering Reminder",
            text: `Hi ${user.name}, it's time to water your plant: ${plantLogEntry.plantSpecies}.`,
        };

        // Send an email
        const emailResponse = await mailTransporter.sendMail(emailDetails);
        console.log("Email sent: " + emailResponse.response);
        res.status(200).json({ message: "Watering reminder sent successfully." });
    } catch (error) {
        console.error("Error sending watering reminder email:", error);
        res.status(500).json({ message: error.message });
    }
};