const express = require("express");
const router = express.Router();
const UserModel = require("../model/User");

//User registration
router.post("/newuser", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { fname, sname, email, password, date, gender } = req.body;

    if (!fname || !sname || !email || !password || !date || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new UserModel({
      fname,
      sname,
      email,
      password,
      date,
      gender,
      usertype: "user",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registration successful!",
      data: newUser,
    });
  } catch (error) {
    console.error("Error saving user record:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email must be unique" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//User login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Find the user by email and password
      const user = await UserModel.findOne({ email, password });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Successful login
      res.status(200).json({ message: "User login successful", data: user });
    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
