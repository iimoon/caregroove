import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const UserBookingHistory = ({ userId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("user_id")
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:3007/user/booked/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        };

        fetchBookings();
    }, [userId]);

    const handleReportIssue = (bookingId) => {
        // Implement logic to handle reporting issue for the specific booking
        console.log('Report issue for booking:', bookingId);
    };

    return (
        <div>
            <h2>User Booking History</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Therapist</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.therapistId.fname}</TableCell>
                                <TableCell>{booking.Bookingdate}</TableCell>
                                <TableCell>{booking.approval}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleReportIssue(booking._id)}
                                    >
                                        Report Issue
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserBookingHistory;
