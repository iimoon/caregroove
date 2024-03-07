const mongoose = require('mongoose');

const diaryEntryTherapistSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'therapist',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [String], // Changed from {String} to [String] to define an array of strings
  created_at: {
    type: Date,
    default: Date.now
  }
});

const DiaryEntryTherapist = mongoose.model('DiaryEntryTherapist', diaryEntryTherapistSchema);

module.exports = DiaryEntryTherapist;
