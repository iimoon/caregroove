const express = require("express");
const router = express.Router();
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const therapistModel = require("../model/Therapist");
const Booking = require('../model/Bookings');
const Diary = require('../model/DiaryEntry');
const generateLogToken = require("../utils");
const multer = require('multer');
const path = require('path');
const Notification = require('../model/Notificaiton')

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
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({
        user_id: user._id, // Include the user ID in the response
        fname: user.fname,
        sname: user.sname,
        email: user.email,
        token: generateLogToken(user),
        message: "Logged in Successfully",
        data: user
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    console.log("Error during user login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//user-search
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve user details from the database using the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user details as a response
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
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
//therapist-userside
// Therapist routes
router.get('/therapists', async (req, res) => {
  try {
    const { location } = req.query;
    let therapists;
    if (location) {
      therapists = await therapistModel.find({ location: { $regex: new RegExp(location, 'i') } });
    } else {
      therapists = await therapistModel.find();
    }
    res.status(200).json(therapists);
  } catch (error) {
    console.log("Error getting therapists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/book/:therapistId', async (req, res) => {
  try {
    console.log("Received booking request:", req.body); // Log the received request body

    const { userId, therapistId, Bookingdate, time, sessionDuration, paymentDetails, cost, date, helpType } = req.body;
    console.log("Booking details:", { userId, therapistId, Bookingdate, time, sessionDuration, paymentDetails, cost, date, helpType }); // Log extracted booking details

    const datef = new Date(date);
    datef.setHours(0, 0, 0, 0);
    console.log("Formatted date:", datef); // Log the formatted date

    if (!userId || !therapistId || !date || !time || !paymentDetails || !cost || !helpType) {
      console.error("Missing required fields"); // Log error if required fields are missing
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the user has already booked the therapist for the specified date and time
    const existingBooking = await Booking.findOne({ userId, therapistId, Bookingdate, time });

    if (existingBooking) {
      console.error("Duplicate booking found:", existingBooking); // Log existing booking if found
      return res.status(400).json({ message: 'You have already booked this therapist for the selected date and time.' });
    }

    // Check therapist availability - Count bookings for the specified date and time
    const bookingCount = await Booking.countDocuments({ therapistId, Bookingdate, time });
    console.log("Booking count:", bookingCount); // Log the booking count

    // Adjust the maximum bookings allowed per time slot (e.g., 3)
    const maxBookingsPerTimeSlot = 3;

    // Check if the therapist has reached the maximum bookings for the specified time slot
    if (bookingCount >= maxBookingsPerTimeSlot) {
      console.error("Therapist fully booked for the selected date and time."); // Log fully booked message
      return res.status(400).json({ message: 'Therapist fully booked for the selected date and time.' });
    }

    // Therapist is available, proceed with booking
    const newBooking = new Booking({
      userId,
      therapistId,
      Bookingdate,
      helpType,
      sessionDuration,
      time,
      paymentDetails,
      cost
    });

    // Save the booking to the database
    await newBooking.save();
    console.log('New booking:', newBooking); // Log the newly created booking
    res.status(201).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/booked/:userId', async (req, res) => {
  console.log("Front end:", res.body);
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).populate('therapistId', 'fname');
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user's bookings:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Diary-Entry
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Route to add a new diary entry
router.post('/addentry', async (req, res) => {
  const { userId, title, content, tags } = req.body;
  console.log('Request Body:', req.body); // Log the request body
  try {
    const newDiary = new Diary({
      userId,
      title,
      content,
      tags
    });
    await newDiary.save();

    res.json(newDiary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//View diary enteries
router.get('/diaries/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("front end res:", res.body);
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId parameter' });
  }

  try {
    const diaryEntries = await Diary.find({ userId: userId });
    res.json(diaryEntries);
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//View specific diary-entry
router.get('/diary/:diaryEntryId', async (req, res) => {
  const diaryEntryId = req.params.diaryEntryId;

  try {
    // Find the diary entry by its ID
    const diaryEntry = await Diary.findById(diaryEntryId);

    if (!diaryEntry) {
      return res.status(404).json({ error: 'Diary entry not found' });
    }

    // If the diary entry is found, send it in the response
    res.json(diaryEntry);
  } catch (error) {
    console.error('Error fetching diary entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//notification
router.get('/notifications/:userId', async (req, res) => {
  try {
      // Fetch user ID from the route parameters
      const userId = req.params.userId;

      // Fetch notifications from the database for the specific user
      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

      res.json(notifications);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/notifications/:notificationId/mark-as-read', async (req, res) => {
  try {
      const { notificationId } = req.params;

      // Update the notification status to 'read' in the database
      const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });

      if (!updatedNotification) {
          return res.status(404).json({ error: 'Notification not found' });
      }

      res.status(200).json({ message: 'Notification marked as read successfully', notification: updatedNotification });
  } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
