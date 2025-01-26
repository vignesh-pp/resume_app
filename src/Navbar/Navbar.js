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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.user);
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
    window.location.href = "/";
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
        zIndex: 1,
      }}
    >
      <Toolbar>
        {/* App name (logo or text) */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
          Resume Builder
        </Typography>
        {/* Profile Icon */}
        {/* <IconButton onClick={handleProfileMenuOpen} color="inherit">
          <Avatar>
            <LogoutIcon />
          </Avatar>
        </IconButton> */}
        {/* Profile menu */}
        <Typography style={{ marginRight: "10px" }}>Hi, VIGNESH</Typography>

        <Avatar>
          <LogoutIcon />
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/create")}>Create</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
