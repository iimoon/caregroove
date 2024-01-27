import { Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import "./userhome.css";

const Userhome = () => {
  const user = "Person";

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

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <div className="home-maincontainer">
      <div className="banner-user">
        <div className="intro-greeting">
          <Typography variant="h2" sx={{color:'black'}}>{`${greeting} ${user}!`}</Typography>
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
          <HourglassBottomRoundedIcon sx={{ color: "purple" }} />
          <p>Total meditation time:</p>
        </div>
        <div className="icons">
          <CalendarMonthRoundedIcon sx={{ color: "red" }} />
          <p> Longest streak:</p>
        </div>
        <div className="icons">
          <PlayCircleFilledRoundedIcon sx={{ color: "green" }} />
          <p>Meditations:-</p>
        </div>
        <div className="icons">
          <WhatshotRoundedIcon sx={{ color: "orange" }} />
          <p>Current Streak:</p>
        </div>
      </div>
      <div className="input-mind">
        <p>Have you lost your mind?</p>
        <input type="text" placeholder="drop your thoughts here :)" />
      </div>
      <div className="selections">
        <button>Meditate</button>
        <button>Journal</button>
      </div>
    </div>
  );
};

export default Userhome;
