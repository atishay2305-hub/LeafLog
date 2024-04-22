import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from './routes/plantRoutes.mjs';
import PlantLogRoutes from './routes/plantLogRoutes.mjs';
import diseaseRoutes from './routes/diseaseRoutes.mjs';
import { registerUser, authUser, getUserPlants } from "./controllers/userControllers.js";
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
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

app.post("/user/my-plants", async (req, res) => {
  const token = req.cookies.token;
  try {
    const user = await getUserFromToken(token);
    req.user = user;
    getUserPlants(req, res);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

app.use('/api', PlantLogRoutes);
app.use(plantRoutes);
app.use(diseaseRoutes);

// Configure nodemailer with SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // SMTP server hostname
  port: 587, // SMTP server port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'leaflogtest@gmail.com', // Sender's email address
    pass: 'ssw695test' // Sender's email password
  }
});

// Feedback form submission route
app.post('/send-email', async (req, res) => {
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

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
