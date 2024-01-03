import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, AppBar, Toolbar, Typography } from '@mui/material';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    axios.get("http://localhost:3007/admin/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    // Delete a user by ID
    axios.delete(`http://localhost:3007/admin/deleteuser/${userId}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        // Update the user list after deletion
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
          <Button color="inherit">User Details</Button>
        </Toolbar>
      </AppBar>

      <h3>Registered Users</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDeleteUser(user._id)}>
                    Delete
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

export default AdminPage;
