import React from "react";
import CareGrooveIcon from "../images/register-page/logo.png";
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '../images/res/notification-bell.png'
import AvatarIcon from '../images/res/avatar.png'
import { IconButton, InputBase } from "@mui/material";
import './userlayout.css'

const Userlayout = () => {
  return (
    <div>
      <div className="main-nav">
        <div className="logo-nav">
          <h3>CareGroove</h3>
        </div>
        <div className="search-bar">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        <div className="nav-icons">
          <img src={NotificationIcon}/>
          <img src={AvatarIcon}/>
        </div>
      </div>
    </div>
  );
};

export default Userlayout;
