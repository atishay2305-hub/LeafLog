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

app.get("/", (req, res) => {
    res.send("API is running");
});

app.post("/register", registerUser);
app.post("/login", authUser);

app.use(userPlantsRoutes);
app.use(plantRoutes);
app.use(diseaseRoutes);
app.use(feedbackRoutes);
app.use(profilePictureRoute);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server hostname
    port: 465, // SMTP server port
    secure: true, // true for 465, false for other ports
    auth: {
        user: "leaflogtest@gmail.com", // Sender's email address
        pass: "kwoj blrj eypq pcyb", // Sender's email password
    },
});

// Feedback form submission route
app.post("/send-email", async(req, res) => {
    const { title, description, email } = req.body;

    // Email content
    const mailOptions = {
        from: "leaflogtest@gmail.com", // Sender address
        to: email, // Recipient address from request body
        subject: `Feedback: ${title}`,
        text: description,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Feedback email sent successfully!");
        res.status(200).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        console.error("Error sending feedback email:", error);
        res
            .status(500)
            .json({ error: "Failed to submit feedback. Please try again later." });
    }
});

// Plant notification email route
app.post("/send-notification-email", async(req, res, ) => {
    const { email } = req.body;

    // Email content for plant notifications
    const mailOptions = {
        from: "leaflogtest@gmail.com", // Sender address
        to: email, // Recipient address from request body
        subject: "Plant Care Notifications Setup Confirmation",
        text: `You've set up watering notifications on LeafLog !`,
    };

    try {
        // Send email


        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully!");
        res.status(200).json({ message: "Notification email sent successfully!" });
    } catch (error) {
        console.error("Error sending notification email:", error);
        res.status(500).json({
            error: "Failed to send notification email. Please try again later.",
        });
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

// Function to schedule emails based on plant watering frequency
const schedulePlantWateringEmails = (email, plants) => {
    plants.forEach((plant) => {
        const cronTime = scheduleToCron[plant.watering.toLowerCase()];

        if (cronTime) {
            const job = cron.schedule(cronTime, () => {
                sendWateringEmail(email, plant.common_name);
            });

            scheduledJobs.push({
                job,
                email,
                plantName: plant.common_name,
            });
        }
    });
};

// Send confirmation email
const sendConfirmationEmail = async(email, plants) => {
    let plantNames = ""; // Declare the variable here
    try {
        // Check if 'plants' is an array; if it's not, this will throw an error
        if (!Array.isArray(plants)) {
            throw new TypeError("Expected 'plants' to be an array");
        }
        plantNames = plants.map((plant) => plant.common_name).join(", ");
        console.log("Plants received in sendConfirmationEmail:", plants);
    } catch (error) {
        console.error(`Error processing plants array: ${error}`);
        return; // Exit the function if there's an error
    }

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
    } catch (error) {
        console.error(
            `Error sending watering reminder for ${plantName} to ${email}: ${error}`
        );
    }
};

// Endpoint to request notifications
app.post("/request-notifications", async(req, res) => {
    const { email, plants } = req.body;

    // Adding this check to see if plants is an array
    if (!Array.isArray(plants)) {
        return res.status(400).json({ error: "'plants' must be an array" });
    }

    try {
        // You need to await the sending of the confirmation email
        await sendConfirmationEmail(email, plants);

        // After confirmation, schedule the emails
        schedulePlantWateringEmails(email, plants);

        res.status(200).json({ message: "Notifications scheduled successfully." });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while setting up notifications." });
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log("Error with transporter configuration:", error);
    } else {
        console.log(
            "Transporter is configured correctly. Server is ready to take our messages."
        );

        // Send a test email
        transporter.sendMail({
                from: "leaflogtest@gmail.com",
                to: "mmount@stevens.edu",
                subject: "Test Email",
                text: "This is a test email from Nodemailer.",
            },
            (err, info) => {
                if (err) {
                    console.log("Error sending test email:", err);
                } else {
                    console.log("Test email sent:", info);
                }
            }
        );
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));