import React, { useState } from "react";
import axios from "axios";
import "./adminlog.css";

const Adminlog = () => {
  const baseurl = "http://localhost:3007/admin/newadmin";

  const [inputs, setInputs] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emptyFields, setEmptyFields] = useState([]);
  const [notification, setNotification] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));

    // Check for password match and update state
    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(inputs.password === value);
    }
  };

  const addHandler = async () => {
    // Check for empty fields
    const emptyFieldNames = Object.keys(inputs).filter((key) => !inputs[key]);
    setEmptyFields(emptyFieldNames);
  
    // Check for password match
    if (!passwordsMatch || emptyFieldNames.length > 0) {
      setNotification("Please fill in all fields and ensure passwords match");
      return;
    }
  
    try {
      const response = await axios.post(
        baseurl,
        { ...inputs, usertype: "admin" },
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Check if the response contains an error message
      if (response.data && response.data.error === "User exists") {
        setNotification("User with this email already exists");
      } else {
        setNotification("Admin registration successful!");
      }
  
      // Clear the notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err){
      console.error("Axios error:", err);
      console.error("Axios response:", err.response); // Log the response details
    
      // Check specifically for "User exists" error
      if (err.response && err.response.data && err.response.data.error === "User exists") {
        setNotification("User with this email already exists. Please use a different email.");
      } else {
        setNotification("An error occurred during registration");
      }
    }
  };

  return (
    <div className="main">
      <div className="intro">
        <h3>Sign up</h3>
        <p>It's quick and easy.</p>
      </div>
      <div className="form-container">
        <div className="form">
          <div className="name-inputs">
            <input
              type="text"
              name="fname"
              placeholder="First name"
              onChange={inputHandler}
            />
            <input
              type="text"
              name="sname"
              placeholder="Surname"
              onChange={inputHandler}
            />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={inputHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputHandler}
            style={{ borderColor: passwordsMatch ? "" : "red" }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={inputHandler}
            style={{ borderColor: passwordsMatch ? "" : "red" }}
          />

          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords don't match</p>
          )}

          {emptyFields.length > 0 && (
            <p style={{ color: "red" }}>
              Please fill in the following fields: {emptyFields.join(", ")}
            </p>
          )}

          <div className="notification">
            {notification && <p>{notification}</p>}
          </div>

          <input
            type="button"
            id="button"
            value="Submit"
            onClick={addHandler}
          />
        </div>
      </div>
      <div className="logo-end">
        <h2>CareGroove</h2>
        <p>Your mental health assistant.</p>
      </div>
    </div>
  );
};

export default Adminlog;
