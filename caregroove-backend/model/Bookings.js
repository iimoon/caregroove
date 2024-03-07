const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'therapist',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    paymentDetails: {
        cardNumber: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
        accountNumber: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        }
    },
    approval:{
        type: String,
        enum:["approved","pending"],
        default:"pending"
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
