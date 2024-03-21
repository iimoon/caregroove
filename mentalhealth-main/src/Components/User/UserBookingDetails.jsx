import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios"; // Import Axios for HTTP requests
import "./UserBookingDetails.css";
import { useParams } from "react-router-dom";

const UserBookingDetails = () => {
  const { therapistId } = useParams();
  const [person, setPerson] = useState("");
  const [therapist, setTherapist] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [helpType, setHelpType] = useState("");
  const [sessionDuration, setSessionDuration] = useState(60); // Default session duration in minutes
  const [therapyAmount, setTherapyAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [bookingTime, setBookingTime] = useState(""); // State to hold the time of booking
  const therapyRatePerMinute = 16.67; // Rate per minute in rupees (1000 rupees per hour)

  useEffect(() => {
    const fetchUsername = () => {
        console.log("Therapist id:",therapistId)
      setPerson(localStorage.getItem("fname"));
      setTherapist(localStorage.getItem("selectedTherapistName"));
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setBookingDate(currentDate);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCalculateAmount = () => {
    const amount = sessionDuration * therapyRatePerMinute; // Calculate total amount
    setTherapyAmount(amount);
  };

  const handleBooking = async () => {
    try {
        console.log("helpType:",helpType)

      // Get the current time when the booking is made
      const currentTime = new Date().toLocaleTimeString();
      const response = await axios.post(
        `http://localhost:3007/user/book/${therapistId}`,
        {
          userId: localStorage.getItem("user_id"), // Assuming userId is stored in localStorage
          therapistId:therapistId,
          Bookingdate: bookingDate,
          helpType: helpType,
          sessionDuration: sessionDuration,
          cost: therapyAmount,
          date: bookingDate,
          paymentDetails: {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            accountNumber: accountNumber,
            pin: pin,
          },
          time: currentTime, // Add the current time of booking
        }
      );
      console.log("Server response:",response.data)
      ; // Log the response from the server
      // Handle success message or redirect as needed
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error message
    }
  };

  return (
    <div className="booking-mainContainer">
      <Typography variant="h3">Enter Booking details</Typography>
      <div className="booking-details">
        <div className="booking-details-item">
          <Typography variant="h5">Select appointment date</Typography>
          <TextField
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
        <div className="booking-details-item">
          <Typography variant="h5">Select help type</Typography>
          <Select
            displayEmpty
            value={helpType}
            onChange={(e) => setHelpType(e.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Anxiety Management">Anxiety Management</MenuItem>
            <MenuItem value="Depression Counseling">
              Depression Counseling
            </MenuItem>
            <MenuItem value="Relationship Issues">Relationship Issues</MenuItem>
            <MenuItem value="Stress Management">Stress Management</MenuItem>
            <MenuItem value="Family Counseling">Family Counseling</MenuItem>
            <MenuItem value="Self-Esteem Building">
              Self-Esteem Building
            </MenuItem>
          </Select>
        </div>
        <div className="booking-details-item">
          <Typography variant="h5">Select session duration</Typography>
          <Select
            displayEmpty
            value={sessionDuration}
            onChange={(e) => {
              setSessionDuration(parseInt(e.target.value));
              handleCalculateAmount();
            }}
          >
            <MenuItem value={30}>30 Minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
            <MenuItem value={90}>1 hour, 30 minutes</MenuItem>
          </Select>
        </div>
      </div>
      <div className="verify">
        <Typography variant="h4">Booking details</Typography>
        <Typography variant="h6">Patient name: {person}</Typography>
        <Typography variant="h6">Therapist name: {therapist}</Typography>
        <Typography variant="h6">Booking date: {bookingDate}</Typography>
        <Typography variant="h6">Help type: {helpType}</Typography>
        <Typography variant="h6">
          Session duration: {sessionDuration} minutes
        </Typography>
      </div>
      <div className="pricing">
        Total booking cost: {therapyAmount.toFixed(2)} Rupees
      </div>
      <div className="terms">
        <Checkbox />
        <p>By clicking this you agree with our terms and service</p>
      </div>
      <div className="booking-button-ctn">
        <Button variant="contained" color="secondary" onClick={handleOpenModal}>
          Proceed to payment
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleBooking}>
          Book Appointment
        </Button>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            borderRadius: 10,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4">Payment</Typography>
          <Typography>
            Enter your card details to complete the booking process.
          </Typography>
          <br />
          <TextField
            variant="outlined"
            placeholder="Card Number"
            fullWidth
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            placeholder="Expiry date"
            fullWidth
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            placeholder="Account Number"
            fullWidth
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            placeholder="PIN"
            fullWidth
            onChange={(e) => setPin(e.target.value)}
          />
          <br />
          <br />
          <Typography variant="h5">
            Total payment amount: {therapyAmount.toFixed(2)} Rupees
          </Typography>
          <br />
          <Button variant="contained" color="secondary" onClick={handleBooking}>
            Book
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserBookingDetails;
