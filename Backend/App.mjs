import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection as connectDB } from "./config/mongoConnection.mjs";
import plantRoutes from './routes/plantRoutes.mjs';
import PlantLogRoutes from './routes/plantLogRoutes.mjs';
import diseaseRoutes from './routes/diseaseRoutes.mjs';
import { registerUser, authUser, myPlants } from "./controllers/userControllers.js";
import nodemailer from "nodemailer";
import { notFound, errorHandler } from '../Backend/middleware/errorMiddleware.js';
import sendEmail from "./email.js";

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
    myPlants(req, res);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// Setup nodemailer for sending emails
// const mailTransporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     type: "OAuth2",
//     user: "leaflogtest@gmail.com", // Your Gmail address
//     clientId: "986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com",
//     clientSecret: "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",
//     refreshToken: "1//048QGv4TaoP6RCgYIARAAGAQSNwF-L9Irt4Fxa6X3W2zr3AG-F5d3ciCVlRTI5S37eu841FVvJl0OqvGxkfshxxv9Bg6a8nDgRw8",
//     accessToken: "ya29.a0Ad52N38wBfpjUbmE4JAjjqIWGvaHXipTCqDJcn2Hut9-marhp3E56fVmKyIQev15kkVH5XDFOcKB_-ra5iRPTHauKfaMmXILh3y_b3TnsUVOj8r2S8r2LOy7VFHhMUHREuCI1ivbSCdPDneo55Xt9BzOfKoj-t2xE4kFaCgYKAe8SARISFQHGX2MioUViAjZID5lW_qvnd86bRA0171",
//     expires: 3599, // Expiration time in seconds
//   },
// });

// Route to send watering reminders
// app.post("/send-watering-reminder", async (req, res) => {
//   const { to, subject, text } = req.body;

//   const details = {
//     from: "leaflogtest@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   try {
//     await mailTransporter.sendMail(details);
//     console.log("Email sent successfully.");
//     res.send("Email sent successfully.");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send("Error sending email.");
//   }
// });

// Route to send general emails
app.post('/send-email', async (req, res) => {
  const { userEmail, formData } = req.body; // Destructure userEmail and formData from req.body
  const result = await sendEmail(userEmail, formData); // Pass userEmail and formData to sendEmail function
  res.json(result);
});


app.use('/send-email', sendEmail);
app.use('/api', PlantLogRoutes);
app.use(plantRoutes);
app.use(diseaseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
