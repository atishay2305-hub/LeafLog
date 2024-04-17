import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from './routes/plantRoutes.mjs';
import diseaseRoutes from './routes/diseaseRoutes.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/leaflog";
connectDB(mongoURI);

app.get("/", (req, res) => {
  res.send("API is running");
});

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

app.post("/send-watering-reminder", async (req, res) => {
  const { to, subject, text } = req.body; // Extract email details from request body
  const details = {
    from: "leaflogtest@gmail.com", // Changed to from
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

app.use(plantRoutes);
app.use(diseaseRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
