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
    // navigate("/home");


    const isAuthenticated = true; // Replace with actual authentication logic
    // const basicAuth = "Basic " + btoa(`${username}:${password}`);

    console.log('====================================');
    console.log(formData);
    console.log('====================================');

    axios
      .post("http://192.168.0.183:8000/api/login/", formData)
      .then((response) => {
        console.log(response.data);
        formData.userid = response?.data?.data[0]?.user_id;
        formData.userrole = response?.data?.data[0]?.user_role;
        formData.isLoggedIn = true;

        dispatch({ type: "SET_USER", formData });

        navigate("/home");

        console.log(response.data);
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: "LOGOUT" });

        alert("Invalid credentials");
      });

    // navigate("/home");
  };
  return (
    <div className="login-page">
      <div className="login-card">
        {/* <div className="logo">
          <img src="logo-url-here" alt="Logo" />
        </div> */}
        <h2>Welcome back</h2>
        {/* <p style={{ fontSize: "14px" }}>Please enter your details.</p> */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ fontSize: "14px" }}>User Name</label>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                background: "#f9fafb",
                height: "35px",
                fontSize: "14px",
                borderRadius: "3px",
              }}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "14px" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                background: "#f9fafb",
                height: "35px",
                fontSize: "14px",
                borderRadius: "3px",
              }}
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
            {/* <a href="#" className="forgot-password">
              Forgot password?
            </a> */}
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
