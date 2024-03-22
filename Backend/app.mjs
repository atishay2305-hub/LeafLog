import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv"; // Import dotenv for loading environment variables
import authRoutes from "./Routes/authRoutes.mjs"; 
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

const { SESSION_SECRET, MONGO_URL, PORT } = process.env;

// Set up session middleware with MongoDB store
app.use(
  session({
    secret: SESSION_SECRET || "defaultSecret", // Use default secret if not provided
    store: MongoStore.create({
      mongoUrl: MONGO_URL || "mongodb://localhost:27017/sessionstore", // Use default URL if not provided
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
  const details = {
    from: process.env.EMAIL_USER || "test@gmail.com",
    to: "example@gmail.com",
    subject: "Subject of your email",
    text: "Content of your email",
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

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
};

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.status(400).json({ error: 'Something went wrong.' });
});

app.get("/", isLoggedIn, (req, res) => {
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
