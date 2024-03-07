import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";

const UserBookings = () => {
  const [location, setLocation] = useState("");
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(""); // State to store booking date
  const [cardNumber, setCardNumber] = useState(""); // State to store card number
  const [expiryDate, setExpiryDate] = useState(""); // State to store expiry date
  const [accountNumber, setAccountNumber] = useState(""); // State to store account number
  const [pin, setPin] = useState(""); // State to store PIN

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:3007/user/therapists");
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchTherapists();
  }, []);

  const handleSearchTherapists = async () => {
    try {
      const response = await axios.get(`http://localhost:3007/user/therapists?location=${location}`);
      setTherapists(response.data);
    } catch (error) {
      console.error("Error searching therapists:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookAppointment = async () => {
    const bookingDetails = {
      userId: localStorage.getItem("user_id"),
      therapistId: selectedTherapistId,
      date: bookingDate,
      paymentDetails: {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        accountNumber: accountNumber,
        pin: pin,
      },
    };

    try {
      const response = await axios.post("http://localhost:3007/user/book", bookingDetails);
      alert(response.data.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment. Please try again later.");
    }
  };

  return (
    <div>
      <div className="bookings-main">
        <br />
        <Typography variant="h4">Book your consultancy here</Typography>
        <p>Please enter your location</p> <br />
        <TextField
          variant="outlined"
          name="location"
          label="Location"
          type="text"
          id="location"
          color="secondary"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          sx={{ height: 55 }}
          onClick={handleSearchTherapists}
        >
          Submit
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Therapist</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Book</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {therapists.map((therapist) => (
                <TableRow key={therapist._id}>
                  <TableCell>{therapist.fname}</TableCell>
                  <TableCell>{therapist.location}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedTherapistId(therapist._id);
                        handleOpenModal();
                      }}
                    >
                      Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!therapists.length && (
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              No therapists found.
            </Typography>
          )}
        </TableContainer>
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Book Appointment
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Typography>
                To complete your booking process please complete the payment.
              </Typography>
              <br />
              <TextField
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              <br />
              <br />
              <Typography>Card details</Typography>
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <br />
              <br />
              <TextField
                label="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <br />
              <br />
              <TextField
                label="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <br />
              <br />
              <TextField
                label="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <br />
              <br />
              <Button onClick={handleBookAppointment}>Submit</Button>
            </Typography>
            <Button onClick={handleCloseModal}>Close</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserBookings;
