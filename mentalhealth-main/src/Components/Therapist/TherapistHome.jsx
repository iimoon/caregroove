import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import "./TherapistHome.css";
import FaceIcon from "@mui/icons-material/Face";

const TherapistHome = () => {
  const [therapistName, setTherapistName] = useState("");
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [pendingPatients, setPendingPatients] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10).split("-")[0] +
      "-01-" +
      new Date().toISOString().slice(0, 10).split("-")[2]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10)
  );

  useEffect(() => {
    const fetchUsername = () => {
      setTherapistName(localStorage.getItem("fname"));
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    fetchTotalCost();
    fetchBookingCounts();
    fetchPendingPatients();
  }, [startDate, endDate]);

  const fetchBookingCounts = async () => {
    try {
      const therapistId = localStorage.getItem("therapist_id");
      const response = await axios.get(
        `http://localhost:3007/therapist/bookings/count/${therapistId}`,
        {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        }
      );

      setTotalBookings(response.data.totalBookings);
    } catch (error) {
      console.error("Error fetching booking counts:", error);
    }
  };

  const fetchTotalCost = async () => {
    try {
      const therapistId = localStorage.getItem("therapist_id");
      const response = await axios.get(
        `http://localhost:3007/therapist/total-cost/${therapistId}`
      );

      setTotalCost(response.data.totalCost);
    } catch (error) {
      console.error("Error fetching total cost:", error);
    }
  };

  const fetchPendingPatients = async () => {
    try {
      const therapistId = localStorage.getItem("therapist_id");
      const response = await axios.get(
        `http://localhost:3007/therapist/pending-patients/${therapistId}`
      );

      setPendingPatients(response.data.pendingPatients);
    } catch (error) {
      console.error("Error fetching pending patients:", error);
    }
  };

  return (
    <div className="therapist-home-container">
      <div className="therapist-banner">
        <div className="therapist-greeting">
          <h2 id="intro-first">
            Hello <span id="therapist-name">{therapistName}</span>
          </h2>
        </div>
      </div>
      <Typography variant="h6">Overview</Typography>
      <Typography variant="h7">
        Today is a great day to serve our patients.
      </Typography>
      <div className="first-box-container">
        <div className="date-inputs">
          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end-date"
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="second-box">
        <div className="second-box-m">Upcoming appointments:</div>
        <div
          className="table"
          style={{
            maxHeight: "300px",
            overflowY: "scroll",
            border: "1px solid black",
            borderRadius: 10,
            width: "60%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey", color: "white" }}>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Help Needed</TableCell>
                <TableCell>Session Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPatients.length > 0 ? (
                pendingPatients.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FaceIcon />
                    </TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.helpType}</TableCell>
                    <TableCell>
                      {patient.sessionDuration} minutes
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No appointments for now</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="information-ctn">
        <div className="info-box">
          <h3>
            <FaceIcon sx={{ paddingTop: -1 }} /> Total Bookings:
          </h3>
          <h1 id="booking">{totalBookings}</h1>
          <h4>Last 30 days</h4>
        </div>
        <div className="info-box">
          <h3>Money received:</h3>
          <h1 id="cost">${totalCost}</h1>
          <h4>Last 30 days</h4>
        </div>
      </div>
    </div>
  );
};

export default TherapistHome;
