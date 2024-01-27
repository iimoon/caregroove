import React from "react";
import CareGrooveIcon from "../images/register-page/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";

const UserLayout = () => {
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column",color:'black',background:'linear-gradient(to bottom, #9c27b0, white)' }}>
      <AppBar position="static">
        <Toolbar sx={{background:'black'}}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CareGroove
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputBase
              sx={{ flexGrow: 1 , color:'white'}}
              placeholder="Search"
              inputProps={{ "aria-label": "search " }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label="search" sx={{color:'white'}}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <Box sx={{ display: "flex", ml: 1 }}>
              {" "}
              {/* Create a separate space for icons */}
              <IconButton size="small" sx={{color:'white'}}>
                <NotificationsIcon />
              </IconButton>
              <IconButton size="small" sx={{color:'white'}}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, padding: 2 }}>{}</Box>
    </Box>
  );
};

export default UserLayout;
