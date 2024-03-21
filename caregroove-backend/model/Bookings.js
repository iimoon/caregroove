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
    Bookingdate: {
        type: String,
        required: true
    },
    sessionDuration:{
        type:String,
        required:true
    },
    time: {
        type: String,
        required: true
    },
    helpType: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
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
    approval: {
        type: String,
        enum: ["approved", "pending"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
