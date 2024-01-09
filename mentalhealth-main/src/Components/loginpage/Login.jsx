import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const naviagte = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    usertype: '', // Add usertype field
  });



  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginHandler = () => {
    // Assuming you have separate routes for admin and user login
    const loginRoute =
      loginData.usertype === 'admin' ? 'http://localhost:3007/admin/login' : 'http://localhost:3007/user/login';

    axios
      .post(loginRoute, loginData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        // Handle successful login
        localStorage.setItem('jwtToken', response.data.token);
        const adminpath = '/adminpanel'
        naviagte(adminpath);
        console.log(response.data.message);
        console.log(response.data.data); // This will contain user/admin data
      })
      .catch((error) => {
        // Handle login error
        console.log("Error:",error);
      });
  };

  return (
    <div className="main">
      <div className="intro">
        <h3>Login</h3>
        <p>It's quick and easy.</p>
      </div>
      <div className="form-container">
        <div className="form">
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
          />
          <select className='usertype' name="usertype" onChange={inputHandler}>
            <option value="" disabled selected>
              Select UserType
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input type="button" id="button" value="Login" onClick={loginHandler} />
        </div>
      </div>
      <div className="logo-end">
        <h2>CareGroove</h2>
        <p>Your mental health assistant.</p>
      </div>
    </div>
  );
};

export default Login;
