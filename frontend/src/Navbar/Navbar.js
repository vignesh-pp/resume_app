import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../Pages/store";
import logo from "../Images/logo.png";
import Profile from "../Images/profile.png";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  const user = store.getState()?.user;
  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null); // State for profile menu
  const navigate = useNavigate();

  // Open profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // dispatch({
    //   type: "USER_TEMPLATE_DETAILS",
    //   data: {},  // empty object clears template_details
    // });
    window.location.href = "/";
  };
  const menuItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    px: 2,
    py: 1.25,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#666",
    // width: "100%",
    transition: "background-color 0.2s ease",
    "&:hover": {
      bgcolor: "#f9fafb",
    },
  };
  
  return (
    <AppBar
      position="static"
      sx={{
        // background: "#ceeeff",
        background: "white",
        boxShadow: "none",
        borderBottom: "1px solid lightgray",
        position: "fixed",
        zIndex: 10,
      }}
    >
      <Toolbar>
        {/* App name (logo or text) */}
        <img
          src={logo}
          style={{ cursor: "pointer" }}
          alt="Logo"
          width={30}
          height={30}
          onClick={() => {
            navigate("/home");
          }}
        />

        <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
          Resume Builder
        </Typography>

        <Typography
          sx={{
            mr: 2,
            textTransform: 'capitalize',
            fontWeight: 500,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
          }}
        >
          <span role="img" aria-label="waving hand">👋</span> Welcome back, {user?.username}
        </Typography>

        {/* Profile Icon */}
        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{
            p: 0,
            borderRadius: "12px",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1976d2",
              width: 36,
              height: 36,
              boxShadow: 0,
            }}
          >
            {/* If Profile is an image URL, directly set it as the src */}
            <img
              src={Profile}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Avatar>
        </IconButton>

        {/* Profile menu */}

        {/* <Avatar>
          <LogoutIcon />
        </Avatar> */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          disableScrollLock
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              borderRadius: 3,
              minWidth: 230,
              overflow: "visible",
              boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* Profile Header */}
          <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center" }}>
            <Avatar
              src={Profile}
              alt="Profile"
              sx={{ width: 40, height: 40, mr: 1.5 }}
            />
            <Box>
              <Typography fontSize="0.95rem" fontWeight="600">
                {user?.username}
              </Typography>
              <Typography fontSize="0.8rem" color="text.secondary">
              {user?.useremail}
              </Typography>
            </Box>
          </Box>

          {/* <Divider sx={{ my: 1 }} />

          <MenuItem onClick={() => navigate("/profile")} sx={menuItemStyles}>
            <PersonIcon fontSize="small" />
            View Profile
          </MenuItem>

          <MenuItem onClick={() => navigate("/account")} sx={menuItemStyles}>
            <AccountCircleIcon fontSize="small" />
            My Account
          </MenuItem>

          <MenuItem onClick={() => navigate("/settings")} sx={menuItemStyles}>
            <SettingsIcon fontSize="small" />
            Settings
          </MenuItem> */}

          <Divider sx={{ my: 1 }} />
            <Box className="d-flex justify-content-center w-100">
          <MenuItem onClick={handleLogout} sx={{ ...menuItemStyles, color: "error.main" }}>
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
            </Box>

        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
