import React, { useState, useEffect } from "react";
import axios from "axios";

const UserNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem("user_id");
      console.log("User id:",userId);

      // Fetch notifications from the backend API for the specific user
      const response = await axios.get(
        `http://localhost:3007/user/notifications/${userId}`
      );

      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
        // Update notification status to 'read' in the backend
        await axios.patch(`http://localhost:3007/user/notifications/${notificationId}/mark-as-read`);
        
        // Refresh notifications after marking as read
        fetchNotifications();
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
};


  return (
    <div>
      <h1>User Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <h3>{notification.message}</h3>
            <p>Status: {notification.status}</p>
            <p>
              Created At: {new Date(notification.createdAt).toLocaleString()}
            </p>
            {notification.status === "unread" && (
              <button onClick={() => markNotificationAsRead(notification._id)}>
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNotificationPage;
