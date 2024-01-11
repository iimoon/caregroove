import React, { useState } from "react";
import "./register.css";
import axios from "axios";

const Register = () => {
  const baseUrl = "http://localhost:3007/user/newuser";

  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
    gender: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
    }
  };

  const handleSubmit = async () => {
    if (!passwordsMatch) {
      setNotification("Passwords don't match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post(`${baseUrl}`, { ...dataToSend, usertype: "user" });

      if (response.data && response.data.error === "User exists") {
        setNotification("User with this email already exists");
      } else {
        setNotification("User registration successful!");
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.error("Axios error:", err);
      console.error("Axios response:", err.response);

      if (err.response && err.response.data && err.response.data.error === "User exists") {
        setNotification("User with this email already exists. Please use a different email.");
      } else {
        setNotification("An error occurred during registration");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-intro">
        <h3>Register to get started!</h3>
        <p>It's quick and easy.</p>
      </div>
      <div className="register-form-container">
        <div className="register-form">
          <div className="register-name-inputs">
            <input
              type="text"
              name="fname"
              placeholder="First name"
              value={formData.fname}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="sname"
              placeholder="Surname"
              value={formData.sname}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ borderColor: passwordsMatch ? "" : "red" }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            style={{ borderColor: passwordsMatch ? "" : "red" }}
          />
          <p>Date of birth</p>
          <input
            type="date"
            name="date"
            placeholder="Date of birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          <p>Gender</p>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords don't match</p>
          )}

          <div className="register-notification">
            {notification && <p>{notification}</p>}
          </div>

          <input type="button" id="register-button" value="Submit" onClick={handleSubmit} />
          <small>
            &#x1F6C8; By clicking on submit, you are agreeing with the{" "}
            <a href="/">terms and services</a> of our product.
          </small>
        </div>
      </div>
      <div className="register-logo-end">
        <h2>CareGroove</h2>
        <p>Your mental health assistant.</p>
      </div>
    </div>
  );
};

export default Register;
