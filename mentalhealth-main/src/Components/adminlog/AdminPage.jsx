// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h2>Admin Dashboard</h2>
      <h3>Registered Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.fname} {user.lname} - {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
