import { useState, useEffect } from "react";
import {
  Typography,
  Modal,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Lottie from "lottie-react";
import GroupMeditation from "../images/register-page/meditate-page.json";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import './UserMeditation.css'

const UserMeditation = () => {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(5);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingTime === 0) {
      setIsRunning(false);
      // Handle timer completion action here
    }
  }, [isRunning, remainingTime]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStart = () => {
    setRemainingTime(duration * 60); // Convert minutes to seconds
    setIsRunning(true);
    handleClose();
  };

  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleExit = () => {
    setIsRunning(false);
    setRemainingTime(0);
  };

  return (
    <div>
      <div className="meditation-maincontainer">
        <div className="meditation-header">
          <div className="meditation-intro">
            <Typography variant="h2">
              Your <span id="meditation-highlight">meditation</span>
            </Typography>
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
              <a href="#" onClick={handleOpen}>
                {" "}
                😮‍💨Click here to get started!
              </a>
            </Typography>
          </div>
          <div className="meditation-button">
            <button onClick={handleOpen}>Meditate</button>
          </div>
        </div>
      </div>

      {/* Main modal for meditation duration selection */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            height:"500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 10,
          }}
        >
          <div className="meditation-modal">
            <div className="modal-header">
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Daily meditation
              </Typography>
            </div>
            <Typography sx={{ marginBottom: 2 }}>
              A different meditation session each day to help you develop a
              greater sense of awareness in the present moment.{" "}
              <b>
                We advise you to go through the basics mention in the meditation
                page.
              </b>
            </Typography>
            <Typography id="modal-modal-title" variant="h5">
              Select Meditation Duration
            </Typography>
            <Select
              value={duration}
              color="secondary"
              onChange={handleChangeDuration}
              fullWidth
              variant="outlined"
              label="Meditation Duration"
              startAdornment={<AvTimerIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
              <MenuItem value={5}>5 minutes</MenuItem>
              <MenuItem value={10}>10 minutes</MenuItem>
              <MenuItem value={15}>15 minutes</MenuItem>
              <MenuItem value={20}>20 minutes</MenuItem>
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={60}>60 minutes</MenuItem>
            </Select>
            <Button
              onClick={handleStart}
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Start
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Modal for countdown timer */}
      <Modal
        open={isRunning}
        onClose={handleExit}
        aria-labelledby="timer-modal-title"
        aria-describedby="timer-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 10,
          }}
        >
          <Typography variant="h5" id="timer-modal-title" align="center">
            Remaining Time: {remainingTime} seconds
          </Typography>
          <Button onClick={handleExit} color="error" fullWidth>
            Exit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserMeditation;
