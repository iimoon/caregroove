import React, { useState } from "react";
import "./register.css";
import axios from "axios";

const Register = () => {
  const baseurl = "http://localhost:3007/user/newuser";

  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
    gender: "", // Added gender field
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  
    // Check for password match and update state
    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
    }
  };

  const handleSubmit = () => {
    console.log("Formdata:", formData);
    if (!passwordsMatch) {
      alert("Passwords don't match");
    } else {
      // Exclude confirmPassword from the data sent to the server
      const { confirmPassword, ...dataToSend } = formData;
  
      axios
        .post(`${baseurl}`, { ...dataToSend, usertype: "user" })
        .then(() => {
          alert("User registration successful!");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('Submit clicked', dataToSend);
    }
  };
  

  return (
    <div className="main2">
      <div className="intro2">
        <h3>Register to get started!</h3>
        <p>It's quick and easy.</p>
      </div>
      <div className="form-container2">
        <div className="form2">
          <div className="name-inputs2">
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

          <input type="button" id="button" value="Submit" onClick={handleSubmit} />
          <small>
            &#x1F6C8; By clicking on submit, you are agreeing with the{" "}
            <a href="/">terms and services</a> of our product.
          </small>
        </div>
      </div>
      <div className="logo-end2">
        <h2>CareGroove</h2>
        <p>Your mental health assistant.</p>
      </div>
    </div>
  );
};

export default Register;
