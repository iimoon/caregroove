import React from "react";
import CareGrooveLogo from "./images/register-page/logo.png";
import { Button, Typography } from "@mui/material";
import meditate from "./images/register-page/meditate.json";
import "./Home.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleNavigate=(page)=>{
    if(page=='Signup'){
      navigate('/register')
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={CareGrooveLogo} />
        </div>
        <ul>
          <li>
            <a href="{Home}">Home</a>
          </li>
          <li>
            <a href="register">Services</a>
          </li>
          <li>
            <a href="{About}">Contact</a>
          </li>
          <li>
            <a href="admin-login">About</a>
          </li>
        </ul>
        <div className="Button-Container">
          <button id="signup-btn" type="Button" onClick={() => handleNavigate('Signup')}>
            Sign up
          </button>
          <button id="login-btn" type="Button" onClick={handleNavigate}>
            Login
          </button>
        </div>
      </div>
      <div className="body-main">
        <div className="intro-para">
          <h3>
            YOUR PATH TO{" "}
            <span id="intro-color">
              MENTAL
              <br /> WELLNESS
            </span>{" "}
            STARTS HERE <span id="cursor"></span>
          </h3>
          <h4>
            Embrace happiness and peace of mind with our mental health
            companion.
          </h4>
        </div>
        <div className="intro-image">
          <Lottie
            animationData={meditate}
            loop={true}
            style={{ width: "400px", height: "400px" }}
          />
        </div>
      </div>
      <div className="intro-button-container">
        <button id="get-started-button">GET STARTED</button>
      </div>
      <div className="gradient-stuff"></div>
      <div className="black-bar">
        <h3 className="features-intro">
          Our Initiative that can improve your mental health
        </h3>
      </div>
      <div className="features-tab"></div>
    </div>
  );
};

export default Home;
