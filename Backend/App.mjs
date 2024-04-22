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
app.post("/send-notification-email", async(req, res) => {
    const { email } = req.body;

    // Email content for plant notifications
    const mailOptions = {
        from: "leaflogtest@gmail.com", // Sender address
        to: email, // Recipient address from request body
        subject: `Plant Watering Notification`,
        text: "This is a reminder to water your plants according to the schedule you set up.",
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully!");
        res.status(200).json({ message: "Notification email sent successfully!" });
    } catch (error) {
        console.error("Error sending notification email:", error);
        res
            .status(500)
            .json({
                error: "Failed to send notification email. Please try again later.",
            });
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