import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  styled,
} from "@mui/material";

const AdminBookings = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
    } else {
      // Fetch the list of users when the component mounts
      axios
        .get("http://localhost:3007/admin/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("Error fetching users:", error);
        });
    }
  }, [navigate]);

  const handleDeleteUser = (userId) => {
    // Delete a user by ID
    axios
      .delete(`http://localhost:3007/admin/deleteuser/${userId}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        // Update the user list after deletion
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>

      <h3>Registered Users</h3>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.fname}</TableCell>
                    <TableCell>{user.sname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteUser(user._id)}
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const StyledNav = styled("div")({
  position: "static",
  padding: "10px",
  height: "60px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "purple",
});

export default AdminBookings;
