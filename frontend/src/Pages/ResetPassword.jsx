import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import bg from "../Images/resumebg.png"; // background image
import logo from "../Images/logo.png"; // logo image

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const path = location.pathname;
  const splitPath = path.split("/reset-password/")[1];

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");
    setSubmitted(false);

    try {
      const res = await axios.post(`/reset-password/${splitPath}`, {
        new_password: confirmPassword,
      });
      setMessage("Your password has been successfully reset.");
      setSubmitted(true);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.detail ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="row no-gutters ms-0 me-0 position-relative"
      style={{
        backgroundColor: "#F8F9FB",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backdropFilter: "blur(2px)",
          // WebkitBackdropFilter: "blur(2px)",
          // backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        }}
      ></div>

      <div
        className={`col-md-${isSmallScreen ? "12" : "6"} d-flex justify-content-center align-items-center`}
        style={{
          height: "100vh",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Card
          elevation={0}
          className="pb-0"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "white",
            marginTop: isSmallScreen ? "6rem" : "",
          }}
        >
          <CardContent sx={{ p: 1.5, pt: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <img src={logo} alt="Logo" style={{ width: "45px" }} />
            </Box>
            {!submitted ? (
              <>
                <Typography variant="h6" sx={{ fontWeight: 500, textAlign: "center", mb: 1 }}>
                  Reset Your Password
                </Typography>

                <label style={{ fontSize: "0.75rem" }}>New Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  className="mt-0"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                    size="small"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.75rem",
                      "& fieldset": { borderColor: "#D0D5DD", borderRadius: "6px" },
                      "&:hover fieldset": { borderColor: "#D0D5DD" },
                      "&.Mui-focused fieldset": { borderColor: "#667085", borderWidth: "1px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ padding: 0 }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <label style={{ fontSize: "0.75rem" }}>Confirm Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  margin="normal"
                  size="small"
                  className="mt-0"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  helperText={error}
                  error={!!error}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.75rem",
                      "& fieldset": { borderColor: "#D0D5DD", borderRadius: "6px" },
                      "&:hover fieldset": { borderColor: "#D0D5DD" },
                      "&.Mui-focused fieldset": { borderColor: "#667085", borderWidth: "1px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ padding: 0 }}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  onClick={handleResetPassword}
                  fullWidth
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#b8b3a6",
                    color: "black",
                    textTransform: "none",
                  }}
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            ) : (
              <Typography variant="body1" sx={{ color: "green", textAlign: "center" }}>
                {message}
              </Typography>
            )}
            <Button
              onClick={() => navigate("/")}
              fullWidth
              variant="text"
              sx={{
                mt: 1,
                textTransform: "none",
                fontSize: "0.95rem",
                color: "#667085",
              }}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
