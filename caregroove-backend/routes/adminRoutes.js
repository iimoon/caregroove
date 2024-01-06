const express = require("express");
const router = express.Router();
const AdminModel = require("../model/Admin");
const UserModel = require("../model/User")
const bcrypt = require('bcrypt');
const generateLogToken = require("../utils");

//Admin registration
router.post("/newadmin", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { fname, sname, email, password } = req.body;
    if (!fname || !sname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let oldUser = await AdminModel.findOne({email});

    if (oldUser) {
      console.log("Existing user:", oldUser);
      return res.status(400).json({ error: "User exists" });
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newAdmin = new AdminModel({ 
      fname, 
      sname, 
      email, 
      password:hashedpassword });
    await newAdmin.save();
    res.send("Admin account registered!");
  } catch (error) {
    console.error("Error saving admin record:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email must be unique" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: "Missing required fields" });
      }
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
          return res.status(401).json({ message: "Invalid email or password." });
      }
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
          res.status(200).json({
              _id: admin.id,
              fname: admin.fname,
              sname: admin.sname,
              email: admin.email,
              token: generateLogToken(admin),
              message: "Logged in Successfully",
              data: admin
          });
      } else {
          return res.status(401).json({ message: "Invalid email or password." });
      }
  } catch (err) {
      console.log("Error during admin login:", err);
      res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 }); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
