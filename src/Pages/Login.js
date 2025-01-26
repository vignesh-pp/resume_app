import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
// import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // rememberMe: false,
  });
  const navigate = useNavigate();

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    dispatch({ type: "SET_USER", formData });

    const isAuthenticated = true; // Replace with actual authentication logic

    // axios
    //   .post(
    //     "http://localhost:8000/api/login/",
    //     formData
    //     // {
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     // Custom headers can go here if needed
    //     //   },
    //     // }
    //   )
    //   .then((response) => {
    //     navigate("/home");

    //     console.log(response.data);
    //     console.log(response.status);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Invalid credentials");
    //   });

    navigate("/home");
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">
          <img src="logo-url-here" alt="Logo" />
        </div>
        <h2>Welcome back</h2>
        <p>Please enter your details.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-options">
            <div>
              {/* <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label> */}
            </div>
            <a href="#" className="forgot-password">
              Forgot password ?
            </a>
          </div>

          <button type="submit" className="primary-button">
            Sign in
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account?
          <Link to={"/signup"}> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
