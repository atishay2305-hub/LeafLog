const asyncHandler = require('express-async-handler');
const User = require("../models/User.js");
const generateToken = require("../services/authService.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists." });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    });
  } else {
    res.status(500).json({ message: "Failed to create user" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  }

  else{
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
  
});

const myPlants = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you're using the authenticated user's ID from the token
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the logged plants array from the user object
    const loggedPlants = user.loggedPlants;

    res.status(200).json({ success: true, loggedPlants });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


module.exports = { registerUser, authUser, myPlants};
