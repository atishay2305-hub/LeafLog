import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.mjs';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { ensureAuthenticated } from './middleware/authMiddleware.mjs'; 

dotenv.config();

const app = express();

app.use(bodyParser.json()); // Parse JSON-encoded bodies

const { SESSION_SECRET, MONGO_URL, PORT } = process.env;

app.use(
  session({
    secret: SESSION_SECRET || "defaultSecret",
    store: MongoStore.create({
      mongoUrl: MONGO_URL || "mongodb://localhost:27017/sessionstore",
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(authRoutes);

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

app.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Homepage' });
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: 'GoodBye!' });
});

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
