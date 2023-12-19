import React, { useState } from "react";
import axios from "axios"; // Import axios
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  
    // Check for password match and update state
    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(inputs.password === value);
    }
  };
  
  

  const addHandler = () => {
    if (!passwordsMatch) {
      alert("Passwords don't match");
    } else {
      axios
      .post(
        baseurl,
        { ...inputs, usertype: "admin" },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        alert("Admin registration successful!");
      })
      .catch((err) => {
        console.log(err);
      });
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

          <input type="button" id="button" value="Submit" onClick={addHandler} />
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
