const express = require("express");
const router = express.Router();
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const generateLogToken = require("../utils");

//User registration
router.post("/newuser", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { fname, sname, email, password, date, gender } = req.body;

    if (!fname || !sname || !email || !password || !date || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ error: "User exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
      fname,
      sname,
      email,
      password: hashedpassword,
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
    let user = await UserModel.findOne({ email })
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.send({
          _id: user_.id,
          email: user.email,
          fname: user.fname,
          sname: user.sname,
          password: user.password,
          token: generateLogToken(user)
        }).status(200).json({ message: "User login successful", data: user });
      } else {
        res.status(401).send("Invalid password");
      }
    } else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get('/words', async (req, res) => {
  try {
    const words = await wordModel.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a new word
router.post('/words', async (req, res) => {
  const word = new wordModel(req.body);
  try {
    await word.save();
    res.status(201).json(word);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE route to delete a word by ID
router.delete('/words/:id', async (req, res) => {
  try {
    const word = await wordModel.findByIdAndDelete(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
