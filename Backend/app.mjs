import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv"; // Import dotenv for loading environment variables

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Load environment variables
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
app.use(plantDataRouter);
app.use(diseaseDataRouter);

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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong.");
});

app.get("/protected", isLoggedIn, (req, res) => {
  // Handle protected route for authenticated users
  res.send("Protected Route");
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("GoodBye!");
});

const port = PORT || 3000; // Use default port 3000 if not provided
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
