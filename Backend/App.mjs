import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from './routes/plantRoutes.mjs';
import diseaseRoutes from './routes/diseaseRoutes.mjs';
import authMiddleware from './middleware/authMiddleware.js';

// Import the addLoggedPlant function
import { addLoggedPlant } from "./controllers/userControllers.js";

dotenv.config();

const app = express();

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with custom options
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/leaflog";
connectDB(mongoURI);

// Route to check if API is running
app.get("/", (req, res) => {
  res.send("API is running");
});

// Setup nodemailer for sending emails
const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "leaflogtest@gmail.com", // Your Gmail address
    clientId: "986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//048QGv4TaoP6RCgYIARAAGAQSNwF-L9Irt4Fxa6X3W2zr3AG-F5d3ciCVlRTI5S37eu841FVvJl0OqvGxkfshxxv9Bg6a8nDgRw8",
    accessToken: "ya29.a0Ad52N38wBfpjUbmE4JAjjqIWGvaHXipTCqDJcn2Hut9-marhp3E56fVmKyIQev15kkVH5XDFOcKB_-ra5iRPTHauKfaMmXILh3y_b3TnsUVOj8r2S8r2LOy7VFHhMUHREuCI1ivbSCdPDneo55Xt9BzOfKoj-t2xE4kFaCgYKAe8SARISFQHGX2MioUViAjZID5lW_qvnd86bRA0171",
    expires: 3599, // Expiration time in seconds
  },
});

// Route to send watering reminders
app.post("/send-watering-reminder", async (req, res) => {
  const { to, subject, text } = req.body;

  const details = {
    from: "leaflogtest@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await mailTransporter.sendMail(details);
    console.log("Email sent successfully.");
    res.send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
});


app.post("/api/log-plant", async (req, res) => {
  try {
    // Handle the request here
    res.status(200).json({ message: "Plant logged successfully" });
  } catch (error) {
    console.error("Error logging plant:", error);
    res.status(500).json({ error: "Error logging plant" });
  }
});


// Route to add logged plants
app.post("/user/logged-plants", authMiddleware, addLoggedPlant); // Import addLoggedPlant function and use it here

// Use plant and disease routes
app.use(plantRoutes);
app.use(diseaseRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
