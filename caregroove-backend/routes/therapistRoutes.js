const express = require('express');
const router = express.Router();
const generateLogToken = require("../utils");
const TherapistModel = require("../model/Therapist");
const bcrypt = require("bcrypt");
const Booking = require('../model/Bookings');
const Diary = require('../model/DiaryEntryTherapist')
const Notification = require('../model/Notificaiton')
const ISODate = require('ISODate')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const therapist = await TherapistModel.findOne({ email });

        if (!therapist) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, therapist.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({
            therapist_id: therapist._id,
            fname: therapist.fname,
            email: therapist.email,
            token: generateLogToken(therapist),
            message: 'Logged in Successfully',
            data: therapist
        });
    } catch (err) {
        console.log('Error during therapist login:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
router.get('/bookings/count/:therapistId', async (req, res) => {
    try {
      const therapistId = req.params.therapistId;
      const { startDate, endDate } = req.query;
  
      // Ensure correct date parsing (adjust according to your framework)
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
  
      console.log('Therapist ID:', therapistId);
      console.log('Start Date:', startDateObj);
      console.log('End Date:', endDateObj);
  
      const totalBookings = await Booking.countDocuments({
        therapistId,
        date: { $gte: startDateObj, $lte: endDateObj }
      });
  
      const bookingCounts = await Booking.aggregate([
        {
          $match: {
            therapistId,
            date: { $gte: ISODate(startDateObj), $lte: ISODate(endDateObj) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            count: { $sum: 1 }
          }
        }
      ]);
  
      console.log('Total bookings:', totalBookings);
      console.log('Booking counts:', bookingCounts);
  
      res.status(200).json({ totalBookings, counts: bookingCounts });
    } catch (error) {
      console.error('Error getting booking counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




router.post('/addentry', async (req, res) => {
    const { therapistId, title, content, tags } = req.body;
    try {
        const newDiary = new Diary({
            therapistId,
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
router.get('/diaries/:therapistId', async (req, res) => {
    const therapistId = req.params.therapistId;

    if (!therapistId) {
        return res.status(400).json({ error: 'Missing therapistId parameter' });
    }

    try {
        const diaryEntries = await Diary.find({ therapistId: therapistId });
        res.json(diaryEntries);
    } catch (error) {
        console.error('Error fetching diary entries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
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
  
//bookings
router.get('/bookings/:therapistId', async (req, res) => {
    const therapistId = req.params.therapistId;

    try {
        // Find all bookings associated with the therapistId
        const bookings = await Booking.find({ therapistId }).populate('userId');

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching therapist bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//booking approval
router.put('/bookings/approve/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Update the booking approval status to 'approved'
        booking.approval = 'approved';
        await booking.save();

        // Create a notification for the user
        const notification = new Notification({
            userId: booking.userId,
            message: 'Your booking has been approved'
        });
        await notification.save();

        res.json({ message: 'Booking approved successfully' });
    } catch (error) {
        console.error('Error approving booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
