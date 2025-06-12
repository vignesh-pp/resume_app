import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

const CustomTextBoxStyle = {
  marginTop: "0px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "3px", // Rounded corners
    backgroundColor: "white", // Light background
    backgroundColor: "#f9fafb",
    marginTop: "0px",
    outLine: "none",
    
    "&.Mui-focused": {
      // backgroundColor: "#e3f2fd", // Slight highlight when focused
      // boxShadow: "0 0 5px #42a5f5", // Blue glow
    },
    "& fieldset": {
      // borderColor: "#42a5f5", // Custom border color
    },
    "&:hover fieldset": {
      // borderColor: "#1e88e5", // Border color on hover
    },
    "& .MuiInputBase-input": {
      fontSize: "12px", // Smaller font size for the input text
    },
  },
  "& .MuiInputLabel-root": {
    // color: "#757575", // Label color
  },
  "& .MuiInputLabel-root": {
    // color: "#757575", // Label color
    fontSize: "12px", // Smaller font size for the label
  },
  "& .MuiInputLabel-root.Mui-focused": {
    // color: "#1e88e5", // Label color when focused
  },
};

const labelStyle = {
  // color: "#1e88e5", // Custom color for the label
  marginBottom: "4px", // Space between label and input
  // fontWeight: "bold",
};

export default function UserForm({ selectedUser, setSelectedUser,isEdit,getUserDetails,setIsEdit }) {
  const roles = ["manager", "admin", "user"]; // Example roles for dropdown
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", selectedUser);
  
    try {
      if (isEdit) {
        // Update user (PUT)
        const res = await axiosInstance.put("api/user-details/", selectedUser);
        console.log(res);
        toast.success(`${selectedUser.username}'s account edited successfully!!`);
      } else {
        // Create new user (POST)
        const res = await axiosInstance.post("api/user-details/", selectedUser);
        console.log(res);
        toast.success(`${selectedUser.username}'s account created successfully!!`);
      }
  
      setSelectedUser(null);
      getUserDetails();
      setIsEdit(false);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error?.response?.data?.error?.message);
    }
  };
  
  const handleSwitchChange = (e) => {
    setSelectedUser({ ...selectedUser, is_active: e.target.checked });
  };

  return (
    <Card sx={{ maxWidth: "850px", margin: "30px auto", padding: 2, boxShadow: 'none',bgcolor:"#fafafa" }}>
      <CardContent className="pb-0">
      <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back Link */}
        <div
          onClick={() => setSelectedUser(null)}
          className="d-flex align-items-center mb-2"
          style={{ cursor: "pointer", color: "gray" }}
        >
          <IconButton sx={{
                   width: "34px",
                   height: "34px",
                   borderRadius: "50%",
                   backgroundColor: "#f9fafb", // Mild light grey background
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   padding: 0,
                   zIndex: 1000,
                   transition: "background-color 0.3s",
                   "&:hover": {
                     backgroundColor: "#e0e0e0", // Slightly darker grey on hover
                   }
          }}>
          <ArrowBackIcon  fontSize="small"/>
          </IconButton>
            <div
          className="ms-1"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          {isEdit ? "Edit User" : "Create User"}
        </div>
        </div>
  
        {/* Title */}
       
  
        {/* Form Fields */}
        <Grid container spacing={2} alignItems="center">
          {/* Username */}
          <Grid item xs={6}>
            <Typography sx={labelStyle}>Username</Typography>
            <TextField
              fullWidth
              name="username"
              placeholder="Enter username"
              value={selectedUser.username}
              onChange={handleChange}
              size="small"
              sx={CustomTextBoxStyle}
              disabled={isEdit}
            />
          </Grid>
  
          {/* Role */}
          <Grid item xs={6}>
            <Typography sx={labelStyle}>Role</Typography>
            <TextField
              select
              fullWidth
              name="role"
              value={selectedUser.role || "user"}
              onChange={handleChange}
              sx={{
                '& .MuiInputBase-root': {
                  height: '35px',
                },
                ...CustomTextBoxStyle,
              }}
              size="small"
              placeholder="Enter role"
              disabled={isEdit}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
  
          {/* First Name */}
          <Grid item xs={6}>
            <Typography sx={labelStyle}>First Name</Typography>
            <TextField
              fullWidth
              name="first_name"
              size="small"
              value={selectedUser.first_name}
              onChange={handleChange}
              sx={CustomTextBoxStyle}
              placeholder="Enter first name"
              disabled={isEdit}
            />
          </Grid>
  
          {/* Last Name */}
          <Grid item xs={6}>
            <Typography sx={labelStyle}>Last Name</Typography>
            <TextField
              fullWidth
              name="last_name"
              size="small"
              value={selectedUser.last_name}
              onChange={handleChange}
              sx={CustomTextBoxStyle}
              placeholder="Enter last name"
              disabled={isEdit}
            />
          </Grid>
  
          {/* Email */}
          <Grid item xs={6}>
            <Typography sx={labelStyle}>Email</Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              size="small"
              value={selectedUser.email}
              onChange={handleChange}
              sx={CustomTextBoxStyle}
              placeholder="Enter email"
              disabled={isEdit}
            />
          </Grid>
  
          {/* Password */}
          <Grid item xs={6}>
            {!isEdit && (
              <>
                <Typography sx={labelStyle}>Password</Typography>
                <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                size="small"
                value={selectedUser.password}
                onChange={handleChange}
                sx={CustomTextBoxStyle}
                placeholder="Enter password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff style={{fontSize:20}}/> : <Visibility style={{fontSize:20}}/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </>
            )}
          </Grid>
  
          {/* Is Active Switch */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={selectedUser.is_active}
                  onChange={handleSwitchChange}
                  name="is_active"
                  color="primary"
                />
              }
              label="Is Active"
            />
          </Grid>
  
          {/* Submit Button */}
          <Grid item xs={12} className="pt-0">
              <Box className="p-0 m-0" display="flex" justifyContent="end" gap={2} mt={0}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#555", // Darker text
                    borderColor: "#ccc", // Light grey border
                    backgroundColor: "#f9fafb", // Light grey background
                    "&:hover": {
                      backgroundColor: "#e0e0e0", // Slightly darker on hover
                      borderColor: "#bdbdbd",
                    },
                  }}
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
