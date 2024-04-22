import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from './routes/plantRoutes.mjs';
import userPlantsRoutes from './routes/userPlantsRoutes.mjs';
import profilePictureRoute from './routes/profilePicture.mjs';
import diseaseRoutes from './routes/diseaseRoutes.mjs';
import feedbackRoutes from './routes/feedbackRoutes.mjs';
import { registerUser, authUser } from "./controllers/userControllers.js";
import nodemailer from 'nodemailer';
import cron from "node-cron";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:3000", // This is the domain where your front-end is served
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization", // Include 'Authorization' and any other custom headers
    credentials: true, // This is important for cookies or auth headers
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

// Configure nodemailer with SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server hostname
    port: 465, // SMTP server port
    secure: true, // true for 465, false for other ports
    auth: {
        user: "leaflogtest@gmail.com", // Sender's email address
        pass: "kwoj blrj eypq pcyb", // Sender's email password
    },
});

cron.schedule("* * * * *", async() => {
    // Implement checkDatabaseForNotifications() according to your data structure
    const notificationsToSend = await checkDatabaseForNotifications();
    notificationsToSend.forEach((notification) => {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: notification.email,
            subject: "Time to water your plant",
            text: `Reminder to water your ${notification.plantName}.`,
        };
        transporter.sendMail(mailOptions);
    });
});

const scheduleToCron = {
    daily: "0 0 * * *", // At midnight every day
    weekly: "0 0 * * 0", // At midnight on Sunday every week
    biweekly: "0 0 * * 0/14", // At midnight on every second Sunday
};

let notificationRequests = [];

// Feedback form submission route
app.post('/send-email', async(req, res) => {
    const { title, description, email } = req.body;

    // Email content
    const mailOptions = {
        from: 'leaflogtest@gmail.com', // Sender address
        to: email, // Recipient address from request body
        subject: `Feedback: ${title}`,
        text: description
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Feedback email sent successfully!');
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error sending feedback email:', error);
        res.status(500).json({ error: 'Failed to submit feedback. Please try again later.' });
    }
});

// Endpoint to handle user's request for notifications
app.post("/request-notifications", (req, res) => {
    const { email, plants } = req.body; // Assuming body contains an email and an array of plant objects

    plants.forEach((plant) => {
        // For each plant, create a cron job
        const cronPattern = scheduleToCron[plant.watering]; // Get the cron pattern from the schedule

        if (cronPattern) {
            const job = cron.schedule(cronPattern, () => {
                sendWateringEmail(email, plant.common_name); // sendWateringEmail function would send the email
            });

            // Store the cron job in your database or an array with reference to user
            notificationRequests.push({
                email,
                plantId: plant._id,
                cronJob: job,
            });
        }
    });

    res.status(200).json({ message: "Notifications set up successfully." });
});

const sendWateringEmail = (email, plantName) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: `Time to water your ${plantName}`,
        text: `This is a reminder to water your ${plantName}.`,
    };
    transporter.sendMail(mailOptions);
};

app.post("/send-confirmation-email", (req, res) => {
    const { email, plants } = req.body; // Assuming body contains an email and an array of plant names

    const plantNames = plants.map((plant) => plant.common_name).join(", ");
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Confirmation for Plant Watering Notifications",
        text: `You have been signed up for watering notifications for the following plants: ${plantNames}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending confirmation email:", error);
            res
                .status(500)
                .json({
                    error: "Failed to send confirmation email. Please try again later.",
                });
        } else {
            res
                .status(200)
                .json({ message: "Confirmation email sent successfully!" });
        }
    });
});

// Plant notification email route
app.post('/send-notification-email', async(req, res) => {
    const { email } = req.body;

    // Email content for plant notifications
    const mailOptions = {
        from: 'leaflogtest@gmail.com', // Sender address
        to: email, // Recipient address from request body
        subject: `Plant Watering Notification`,
        text: 'This is a reminder to water your plants according to the schedule you set up.'
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully!');
        res.status(200).json({ message: 'Notification email sent successfully!' });
    } catch (error) {
        console.error('Error sending notification email:', error);
        res.status(500).json({ error: 'Failed to send notification email. Please try again later.' });
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