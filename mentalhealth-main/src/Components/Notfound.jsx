import axios from "axios";
import React, { useEffect, useState } from "react";
import CareGrooveLogo from "./images/register-page/logo.png";
import BananaDance from "./images/register-page/banana.json";
import Lottie from "lottie-react";
import "./Notfound.css";
import { Navigate, useNavigate } from "react-router-dom";

const Notfound = () => {
  const naviagte = useNavigate();
  const handleNavigate = ()=>{
    naviagte('/');
  }
  const [quote, setQuote] = useState("");
  // useEffect = ()=>[
  //   axios.get("https://api.quotable.io")
  //   .then((response)=>{
  //     setQuote(response.data)
  //   })
  // ]
  return (
    <div>
      <div className="main-container">
        <div className="nav"></div>
        <div className="error-container">
          <img src={CareGrooveLogo} />
        </div>
        <div className="animation-container">
          <Lottie
            animationData={BananaDance}
            loop={true}
            style={{ width: "300px", height: "300px" }}
          />
          <h3>Oops! you just got 404'd buddy</h3>
          <h4>The page your trying to visit does not exist 😓</h4>
          <button to="/" onClick={handleNavigate}>Click here to head back home </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
