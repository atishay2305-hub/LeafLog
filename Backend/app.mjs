import express from "express";
import session from "express-session";
import passport from "passport";
import cors from 'cors';
import MongoStore from "connect-mongo";
import authRoutes from './routes/authRoutes.mjs';
import nodemailer from 'nodemailer';
import { ensureAuthenticated } from "./middleware/authMiddleware.mjs";
import './config/passport.mjs';



const app = express();

app.use(cors());


app.use(express.json()); // Parse JSON-encoded bodies

app.use(authRoutes);

app.use(
  session({
    secret: "defaultSecret",
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessionstore",
    }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



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

// Protected route - requires authentication
app.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Homepage' });
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'GoodBye!' });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
