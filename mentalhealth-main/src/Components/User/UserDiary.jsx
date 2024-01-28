import { Typography } from "@mui/material";
import DiscoveryImage from "../images/res/8375091.jpg";
import React from "react";
import "./userdiary.css";
import { useNavigate } from "react-router-dom";

const UserDiary = () => {
    const navigate = useNavigate();
    const handleNavigate = (page) =>{
        if(page=='add'){
            navigate('/user/diary-entry')
        } else {
            navigate('/user/diary-view')
        }
    }
  return (
    <div>
      <div className="diary-maincontainer">
        <div className="diary-intro">
          <div className="diary-intro-text">
            <Typography variant="h3">
              Discover yourself with a{" "}
              <span id="diaryhighlight">personalized digital diary</span>
            </Typography>
          </div>
        </div>
        <div className="diary-intro-image">
          <img src={DiscoveryImage} />
        </div>
        <div className="diary-perks">
          <a href="https://www.webmd.com/mental-health/mental-health-benefits-of-journaling">
            👉 Research Proving the benefits of Mainting a Diary{" "}
          </a>
          <Typography sx={{ fontSize: 30, marginBottom:1 }}>
            Perks of maintaining a diary.
          </Typography>
          <ul>
            <li>
              <span id="bold">🧠 Self-Reflection</span>: Gain insights into
              thoughts, feelings, and behaviors.
            </li>
            <li>
              <span id="bold">😌 Emotional Release</span>: Vent frustrations and
              reduce stress and anxiety.
            </li> 
            <li>
              {" "}
              <span id="bold">🤔 Problem Solving</span>: Clarify thoughts and
              brainstorm solutions.
            </li>
            <li>
              <span id="bold">📝 Memory Enhancement</span>: Preserve memories and
              experiences.
            </li>
            <li>
              <span id="bold">🎯 Goal Setting</span>: Set and track personal goals
              and achievements.
            </li>
            <li>
              <span id="bold">🎨 Creativity Boost</span>: Stimulate imagination and
              explore new ideas.
            </li>
            <li>
              <span id="bold">🙊 Communication Skills</span>: Enhance writing and
              communication abilities.
            </li>
            <li>
              <span id="bold">🌱 Personal Growth</span>: Cultivate self-awareness
              and strive for improvement.
            </li>
            <li>
              <span id="bold">🏆 Sense of Accomplishment</span>: Celebrate progress
              and achievements.
            </li>
          </ul>
        </div>
        <div className="diary-button">
          <button className="add" onClick={()=>handleNavigate('add')}>Add journal</button>
          <button className="view" onClick={()=>handleNavigate('view')}>View journal</button>
        </div>
      </div>
    </div>
  );
};

export default UserDiary;
