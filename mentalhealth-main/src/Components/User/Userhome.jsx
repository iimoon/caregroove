import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import "./userhome.css";

const Userhome = () => {
  const [person, setPerson] = useState("");

  useEffect(() => {
    const fetchUsername = () => {
      setPerson(localStorage.getItem("fname"));
    };
    fetchUsername();
  }, []);

  // Get potential time zone hint (might not always be accurate)
  const potentialTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get current time
  const currentTime = new Date();
  let userHour = currentTime.getHours();

  // If potential time zone is available, try to apply an estimated offset
  if (potentialTimeZone) {
    const timeZoneOffset = potentialTimeZone.includes("GMT+")
      ? parseInt(potentialTimeZone.slice(4, 7)) * 60
      : potentialTimeZone.includes("GMT-")
      ? -parseInt(potentialTimeZone.slice(4, 7)) * 60
      : null; // Handle cases without GMT offset

    if (timeZoneOffset !== null) {
      const adjustedTime = new Date(
        currentTime.getTime() + timeZoneOffset * 60000
      );
      userHour = adjustedTime.getHours();
    }
  }

  // Determine greeting, considering potential inaccuracies
  const greeting =
    userHour >= 4 && userHour < 12
      ? "Good Morning"
      : userHour >= 12 && userHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="home-maincontainer">
      <div className="banner-user">
        <div className="intro-greeting">
          <Typography variant="h2" sx={{ color: "black" }}>{`${greeting} ${person}!`}</Typography>
          <div className="intro-quote">
            <Typography sx={{ color: "purple", fontSize: 30 }}>
              Word of the day
            </Typography>
            <h4>"ikigai"</h4>
            <p>a reason for being.</p>
          </div>
        </div>
      </div>
      <div className="streak-container">
        <div className="icons">
          <HourglassBottomRoundedIcon sx={{ color: "white" }} />
          <p>Total meditation time:0</p>
        </div>
        <div className="icons">
          <CalendarMonthRoundedIcon sx={{ color: "red" }} />
          <p> Longest streak:0</p>
        </div>
        <div className="icons">
          <PlayCircleFilledRoundedIcon sx={{ color: "green" }} />
          <p>Meditations:0</p>
        </div>
        <div className="icons">
          <WhatshotRoundedIcon sx={{ color: "orange" }} />
          <p>Current Streak:0</p>
        </div>
      </div>
      <div className="input-mind">
        <p>Have something on your mind?</p>
        <input type="text" placeholder="drop your thoughts here :)" />
      </div>
      <div className="selections">
        <div className="selection-btn">
          <button>Meditate</button>
        </div>
        <div className="selection-btn">
          <button>Journal</button>
        </div>
      </div>
      <div className="secondary-selections">
        <div className="selection-btn">
          <button>Affirmations</button>
        </div>
        <div className="selection-btn">
          <button>Breathing exercises</button>
        </div>
      </div>
    </div>
  );
};

export default Userhome;
