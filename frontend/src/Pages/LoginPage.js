import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "../../src/Assets/Logos/Logo.svg";
// import bg from "../../src/Assets/bg.png";
import Logo from "../Images/Logo1.jpg";
import bg from "../Images/resumebg.png";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { setUserDetails, resetUserDetails, setUserPassword } from '../authSlice';
// import axios from 'axios'
// import axiosApi from "../axiosAuth.js";
import logo from "../Images/logo.png";
import axios from "axios";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
    const [helperText, setHelperText] = useState("");
  // const { userDetails } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  const Navigate = useNavigate();
  const dummyUser = {
    email: "demo@accupredict.com",
    password: "demo@2024",
  };

  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const isMediumScreen = useMediaQuery("(min-width:1281px)");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginAuth = async (email, password) => {
    setHelperText("")
    let formData = {
      username: email,
      password:password
    }
    // Navigate("/home");
    axios
      .post("http://127.0.0.1:8000/api/login/", formData)
      .then((response) => {
      
        formData.userid = response?.data?.data[0]?.user_id;
        formData.userrole = response?.data?.data[0]?.user_role;
        formData.useremail = response?.data?.data[0]?.user_email;
        formData.isLoggedIn = true;


        dispatch({ type: "SET_USER", formData });

        Navigate("/home");

      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: "LOGOUT" });
        setHelperText(error?.response?.data?.error?.message)
        // alert("Invalid credentials");
      });

  };
  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = true;
    const newError = { email: "", password: "" };

    // Email validation
    // if (!email.trim()) {
    //   newError.email = "Email is required.";
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newError.email = "Please enter a valid email address.";
    //   isValid = false;
    // }

    // Password validation
    if (!password.trim()) {
      newError.password = "Password is required.";
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      handleLoginAuth(email.trim(), password.trim());
      // if (email === dummyUser.email && password === dummyUser.password) {
      // } else {
      //   newError.password =("Invalid credentials.");
      // }
    }
  };

  return (
    <div
      className="row no-gutters ms-0 me-0"
      style={{
        backgroundColor: "#F8F9FB",
        backgroundImage: `url(${bg})`,
        // background: "pink",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Section - Hidden on Small Screens */}

      {/* Right Section (Login Form) */}
      <div
        className={`col-md-${
          isSmallScreen ? "12" : "6"
        } d-flex justify-content-center align-items-center`}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Card
          elevation={0}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "white",
            // border:'1px solid #b4b8a6',
            marginTop: isSmallScreen ? "6rem" : "",
          }}
        >
          <CardContent>
            {/* <div className="d-flex justify-content-center mb-4">
              <img
              width={70}
              height={70}
                src={
                  logo
                  
                  // "https://dev-bleubird.data-aces.com/static/media/logo.6da1a7e482143042ff1d.png"
                }
                alt="Logo"
                style={{ width: "100px" }}
              />
            </div> */}

            <form className="" onSubmit={handleLogin}>
              {/* Welcome Back */}
              <div className="d-flex align-items-center">
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  Welcome Back
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="body" fontSize={"0.87rem"} color="#667085">
                  Enter your credentials to continue
                </Typography>
              </div>

              {/* Email Field */}
              <label style={{ fontSize: "0.75rem" }}>User Name</label>
              <TextField
              autoFocus={true}
                className="mt-0"
                fullWidth
                variant="outlined"
                type="name"
                margin="normal"
                value={email}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                // helperText={error.email}
                // error={!!error.email}
                autoComplete='off'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.75rem",
                    "& fieldset": {
                      borderColor: "#D0D5DD",
                      borderRadius: "6px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D0D5DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667085",
                      borderWidth: "1px",
                    },
                  },
                  // Remove background color from autofill
                  // Completely remove autofill styles
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px white inset",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />

              {/* Password Field */}
              <label style={{ fontSize: "0.75rem" }}>Password</label>
              <TextField
                className="mt-0"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                size="small"
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
                helperText={error.password}
                error={!!error.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.75rem",
                    "& fieldset": {
                      borderColor: "#D0D5DD",
                      borderRadius: "6px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D0D5DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667085",
                      borderWidth: "1px",
                    },
                  },
                  // Remove background color from autofill
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px white inset",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                  {helperText && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {helperText}
                    </div>
                  )}
                  <Typography
  style={{
    marginTop: "10px",
    textAlign: "right",
    fontSize: "0.8rem",
  }}
>
  {/* <Link href="/forgot-password" style={{ color: "#667085", textDecoration: "none" }}>
    Forgot Password?
  </Link> */}
</Typography>

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#b8b3a6",
                  color: "black",
                  textTransform: "none",
                }}
                type="submit"
              >
                Login
              </Button>

              {/* Don't have an account? Sign up */}
              {/* <Typography
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                  fontSize: "0.87rem",
                }}
              >
                Don't have an account?{" "}
                <Link href="/signup" style={{ color: "#D21E40" }}>
                  Sign up
                </Link>
              </Typography>  */}
            </form>
          </CardContent>
        </Card>
      </div>
      {/* {!isSmallScreen && (
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              marginTop: "auto",
              marginBottom: "6rem",
            }}
          >
            <Typography
              variant={isMediumScreen ? "h3" : "h4"}
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Welcome to Resume Builder
            </Typography>
            <Typography variant={isMediumScreen ? "h6" : "body"}>
              Manage your Resume
            </Typography>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default LoginPage;
