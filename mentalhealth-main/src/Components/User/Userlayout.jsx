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
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovementRounded";
import ArticleIcon from "@mui/icons-material/Article";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "./userlayout.css";
import { AvatarIcon } from "@nextui-org/react";
import Person from "@mui/icons-material/Person";

const drawWidth = 200;
const UserLayout = () => {
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const handleMenuClick = (path) => {
    navigate(`/user${path}`);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("jwtToken");
    // Refresh the page to redirect to the login page
    navigate("/login-page");
  };

  const permanentDrawer = (
    <div style={{ backgroundColor: "white", height: "100%" }}>
      <Toolbar />
      <Divider />
      <Typography
        sx={{
          textAlign: "center",
          pt: 0,
          color: "purple",
          fontSize: 30,
          marginTop: -6,
          marginBottom: 4,
        }}
      >
        CareGroove
      </Typography>
      <List sx={{ backgroundColor: "white" }}>
        {[
          {
            path: "/home",
            icon: <HomeIcon sx={{ fontSize: 30, color:'blue' }} />,
            text: "Home",
          },
          {
            path: "/diary",
            icon: <CreateIcon sx={{ fontSize: 30, color:'green' }} />,
            text: "Diary",
          },
          {
            path: "/posts",
            icon: <SelfImprovementIcon sx={{ fontSize: 30, color:'purple'}} />,
            text: "Meditation",
          },
          {
            path: "/blog",
            icon: <ArticleIcon sx={{ fontSize: 30 }} />,
            text: "Blogs",
          },
          {
            path: "/bookings",
            icon: <DateRangeIcon sx={{ fontSize: 30 }} />,
            text: "Bookings",
          },
          {
            path: "/therapist",
            icon: <NotificationsIcon sx={{ fontSize: 30 }} />,
            text: "Notifications",
          },
        ].map((item) => (
          <ListItemButton
            key={item.path}
            sx={{
              color:
                location.pathname === `/admin${item.path}`
                  ? "#9c27b0"
                  : "white",
              height: 50,
            }}
            onClick={() => handleMenuClick(item.path)}
          >
            <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{ fontWeight: 200, color:'black' }} primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      {/* Logout button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          pb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{ color: "white", backgroundColor: "red" }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawWidth,
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawWidth,
              borderRight: "1px solid white",
            },
          }}
        >
          {permanentDrawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawWidth}px)` },
          }}
        >
          <div className="userhome-nav">
            <input type="text" aria-label="search" placeholder="Search"/>
            <SearchIcon sx={{color:'black '}}/>
            <div className="right-nav">
              <NotificationsIcon sx={{color:'black',marginRight:2}}/>
              <Person sx={{color:'black '}}/>
            </div>
          </div>
          <div className="outlet">
          <Outlet />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default UserLayout;
