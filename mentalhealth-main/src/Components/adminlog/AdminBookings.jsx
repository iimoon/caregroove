import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Fetch the list of bookings when the component mounts
    axios
      .get("http://localhost:3007/admin/bookings")
      .then((response) => {
        setBookings(response.data);
        console.log("Server response:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching bookings:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteBooking = (bookingId) => {
    // Handle deletion of booking by ID
    axios
      .delete(`http://localhost:3007/admin/deleteBooking/${bookingId}`)
      .then((response) => {
        console.log("Booking deleted successfully:", response.data);
        // Update the booking list after deletion
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      })
      .catch((error) => {
        console.log("Error deleting booking:", error);
      });
  };

  return (
    <div>
      <Typography variant="h3">Booking Details</Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Therapist</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking) => (
                  <TableRow key={booking._id}>
                    {/* Render user information */}
                    <TableCell>
                      {booking.userId
                        ? `${booking.userId.fname} ${booking.userId.sname} (${booking.userId._id})`
                        : "N/A"}
                    </TableCell>
                    {/* Render therapist information */}
                    <TableCell>
                      {booking.therapistId
                        ? `${booking.therapistId.fname} (${booking.therapistId._id})`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell> 
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={bookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AdminBookings;
