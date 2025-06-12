import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../Images/resumebg.png"; // Use same image as login
import logo from "../Images/logo.png"; // Use your logo here

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleReset = async () => {
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");
    setSubmitted(false);

    try {
      // const res = await axios.post("/forgot-password/", { email });
      setMessage(`Password reset email sent to ${email}. Check your inbox.`);
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.detail || "Something went wrong");
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
      // WebkitBackdropFilter: "blur(2px)", // for Safari support
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
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <img src={logo} alt="Logo" style={{ width: "45px" }} />
            </Box>

            {!submitted ? (
              <>
                <Typography variant="h6" sx={{ fontWeight: 500, textAlign: "center", mb: 1 }}>
                  Forgot Password?
                </Typography>
                <Typography sx={{ color: "#8687A3", fontSize: "0.85rem", textAlign: "center", mb: 0 }}>
                  Enter your email address and we'll send you reset instructions.
                </Typography>

                <label style={{ fontSize: "0.75rem" }}>Email Address</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  size="small"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
                  helperText={error}
                  error={!!error}
                  className="mt-0"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.75rem",
                      "& fieldset": { borderColor: "#D0D5DD", borderRadius: "6px" },
                      "&:hover fieldset": { borderColor: "#D0D5DD" },
                      "&.Mui-focused fieldset": { borderColor: "#667085", borderWidth: "1px" },
                    },
                  }}
                />

                <Button
                  onClick={handleReset}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: "#b8b3a6",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
