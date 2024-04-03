import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv"; // Add import for dotenv
import userRoutes from "./routes/userRoutes.js";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Update import path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/leaflog";
connectDB(mongoURI); // Call connectDB with the correct argument

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "test@gmail.com",
    pass: process.env.EMAIL_PASS || "password",
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body; // Extract email details from request body
  const details = {
    from: process.env.EMAIL_USER || "test@gmail.com",
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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
