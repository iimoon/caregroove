import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from "@mui/material";

const TherapistBookingApproval = () => {
    const [bookings, setBookings] = useState([]);
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const therapistId = localStorage.getItem("therapist_id");
            const response = await axios.get(`http://localhost:3007/therapist/bookings/${therapistId}`);
            setBookings(response.data);
            // Filter bookings based on approval status
            setApprovedBookings(response.data.filter(booking => booking.approval === 'approved'));
            setPendingBookings(response.data.filter(booking => booking.approval !== 'approved'));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleApproveBooking = async (bookingId) => {
        try {
            await axios.put(`http://localhost:3007/therapist/bookings/approve/${bookingId}`);
            // Refresh bookings after approval
            fetchBookings();
        } catch (error) {
            console.error("Error approving booking:", error);
        }
    };

    return (
        <div>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>Pending Bookings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="pending bookings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Time of Booking</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingBookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.userId._id}</TableCell>
                                <TableCell>{booking.userId.fname}</TableCell>
                                <TableCell>{booking.userId.email}</TableCell>
                                <TableCell>{new Date(booking.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleApproveBooking(booking._id)}
                                    >
                                        Approve
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!pendingBookings.length && (
                    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                        No pending bookings found.
                    </Typography>
                )}
            </TableContainer>
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>Approved Bookings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="approved bookings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Time of Booking</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {approvedBookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.userId._id}</TableCell>
                                <TableCell>{booking.userId.fname}</TableCell>
                                <TableCell>{booking.userId.email}</TableCell>
                                <TableCell>{new Date(booking.date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!approvedBookings.length && (
                    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                        No approved bookings found.
                    </Typography>
                )}
            </TableContainer>
        </div>
    );
};

export default TherapistBookingApproval;
