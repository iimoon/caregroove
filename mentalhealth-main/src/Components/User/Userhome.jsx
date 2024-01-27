import { Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

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
    <div>
      <div className="intro-greeting">
        <Typography variant="h2">{`${greeting} ${user}!`}</Typography>
        <div className="intro-quote">
          <Box sx={{ width: 240 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Userhome;
