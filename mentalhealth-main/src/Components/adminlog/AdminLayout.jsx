import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import AdminPage from "./AdminPage";
import Person from "@mui/icons-material/Person";
import { Button, MenuItem } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BookIcon from '@mui/icons-material/Book';
import PreviewIcon from '@mui/icons-material/Preview';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawWidth = 220;
function AdminLayout() {
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const handleMenuClick = (path) => {
    navigate(`/admin${path}`);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');
    // Refresh the page to redirect to the login page
    navigate('/login-page')
  };

  const permanentDrawer = (
    <div style={{ backgroundColor: "#09212E", height: "100%" }}>
      <Toolbar />
      <Divider />
      <Typography
        sx={{ textAlign: "center", pt: 4, color: "white", fontSize: 20 }}
      >
        CareGroove
      </Typography>
      <Typography sx={{ textAlign: "center", pt: 1, color: "#9c27b0", fontSize: 15 }}>Admin Panel</Typography>
      <List sx={{ backgroundColor: "#09212E" }}>
        {[
          { path: '/users', icon: <Person />, text: 'User Details' },
          { path: '/posts', icon: <InsertDriveFileIcon />, text: 'Posts' },
          { path: '/blog', icon: <BookIcon />, text: 'Blog' },
          { path: '/viewblogs', icon: <PreviewIcon />, text: 'View Blog' },
          { path: '/bookings', icon: <ListAltIcon />, text: 'Bookings' },
          { path: '/therapist', icon: <PsychologyIcon />, text: 'Therapists' },
        ].map((item) => (
          <ListItemButton
            key={item.path}
            sx={{ color: location.pathname === `/admin${item.path}` ? "#9c27b0" : "white" }}
            onClick={() => handleMenuClick(item.path)}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      {/* Logout button */}
      <Box sx={{ position: "absolute", bottom: 0, width: "100%", textAlign: "center", pb: 2 }}>
        <Button variant='outlined' onClick={handleLogout} sx={{ color: "white",backgroundColor:'red' }}>Logout</Button>
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
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AdminLayout;
