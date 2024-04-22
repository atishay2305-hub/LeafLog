import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from "./routes/plantRoutes.mjs";
import userPlantsRoutes from "./routes/userPlantsRoutes.mjs";
import profilePictureRoute from "./routes/profilePicture.mjs";
import diseaseRoutes from "./routes/diseaseRoutes.mjs";
import feedbackRoutes from "./routes/feedbackRoutes.mjs";
import { registerUser, authUser } from "./controllers/userControllers.js";
import nodemailer from "nodemailer";
import cron from "node-cron";


dotenv.config();

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/leaflog";
connectDB(mongoURI);

// Configure nodemailer with SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "leaflogtest@gmail.com",
        pass: "kwoj blrj eypq pcyb",
    },
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error("Error with transporter configuration:", error);
    } else {
        console.log("Transporter is configured correctly.");
    }
});

// Define schedule to cron string mapping
const scheduleToCron = {
    daily: "0 0 * * *", // At midnight every day
    weekly: "0 0 * * 0", // At midnight on Sunday every week
    biweekly: "0 0 * * 0/14", // At midnight on every second Sunday
};

// This array will hold references to the scheduled jobs
let scheduledJobs = [];

const schedulePlantWateringEmails = (email, plants) => {
    plants.forEach((plant) => {
        const cronTime = scheduleToCron[plant.watering.toLowerCase()];

        if (cronTime) {
            const job = cron.schedule(cronTime, () => {
                console.log(
                    `It's time to send a watering reminder for ${plant.common_name} to ${email}.`
                );
                sendWateringEmail(email, plant.common_name);
            });

            scheduledJobs.push({
                job,
                email,
                plantName: plant.common_name,
            });

            console.log(
                `Scheduled job to water ${plant.common_name} for ${email} with pattern ${cronTime}`
            );
        } else {
            console.log(
                `No cron pattern found for watering schedule: ${plant.watering}`
            );
        }
    });
};

// Endpoint to request notifications
app.post("/request-notifications", (req, res) => {
    const { email, plants } = req.body;

    // Confirm notifications setup with user
    sendConfirmationEmail(email, plants);

    // Schedule notification emails
    plants.forEach((plant) => {
        const cronTime = scheduleToCron[plant.watering.toLowerCase()];
        if (cronTime) {
            const job = cron.schedule(cronTime, () => {
                sendWateringEmail(email, plant.common_name);
            });
            scheduledJobs.push(job);
            console.log(`Scheduled watering notification for ${plant.common_name}`);
        }
    });

    res.status(200).json({ message: "Notifications scheduled successfully." });
});

// Send confirmation email
const sendConfirmationEmail = async(email, plants) => {
    const plantNames = plants.map((plant) => plant.common_name).join(", ");
    const mailOptions = {
        from: "leaflogtest@gmail.com",
        to: email,
        subject: "Plant Care Notifications Setup",
        text: `You've set up watering notifications for: ${plantNames}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending confirmation email to ${email}: ${error}`);
    }
};

// Send watering email
const sendWateringEmail = async(email, plantName) => {
    const mailOptions = {
        from: "leaflogtest@gmail.com",
        to: email,
        subject: `Watering Reminder for ${plantName}`,
        text: `This is a friendly reminder to water your ${plantName}.`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Watering reminder sent for ${plantName} to ${email}`);
    } catch (error) {
        console.error(
            `Error sending watering reminder for ${plantName} to ${email}: ${error}`
        );
    }
};

// Other routes...

transporter.verify(function(error, success) {
    if (error) {
        console.log("Error with transporter configuration:", error);
    } else {
        console.log("Transporter configured correctly.");
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));