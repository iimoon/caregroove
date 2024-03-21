import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const UserBookings = () => {
  const [location, setLocation] = useState("");
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const setTherapistName = (therapistName) => {
    localStorage.setItem("selectedTherapistName", therapistName);
  };

  const handleBookingpage = ()=>{
    navigate("/user/booked")
  }

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

  const handleBookTherapist = (therapistId, therapistName) => {
    localStorage.setItem("selectedTherapistName", therapistName);
    navigate(`/user/bookings/details/${therapistId}`); // Navigate to the details page with therapist ID
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
        <Button variant="Outlined" color="secondary" onClick={handleBookingpage}>View bookings</Button>
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
                      onClick={() => handleBookTherapist(therapist._id, therapist.fname)}
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
      </div>
    </div>
  );
};

export default UserBookings;
