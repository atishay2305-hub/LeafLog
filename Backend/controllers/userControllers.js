const asyncHandler = require('express-async-handler');
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

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



module.exports = { registerUser, authUser };
