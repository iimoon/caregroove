import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import GroupMeditation from '../images/register-page/meditate-page.json'
import './UserMeditation.css'
const UserMeditation = () => {
  return (
    <div>
      <div className="meditation-maincontainer">
        <div className="meditation-header">
          <div className="meditation-intro">
            Your <span id="meditation-highlight">meditation</span>
          </div>
          <div className="meditation-animation">
          <Lottie
            animationData={GroupMeditation}
            loop={true}
            style={{ width: "800px", height: "400px" }}
          />
          </div>
          <div className="meditation-message">
            <Typography>
              Don't know where to start?
              <a href="#">Click here to get started!</a>
            </Typography>
          </div>
          <div className="meditation-button">
            <button>Meditate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMeditation;
