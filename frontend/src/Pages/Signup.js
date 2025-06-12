import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const SignUp = () => {
  // State for the form inputs
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // termsAccepted: false,
  });

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axiosInstance
      .post("api/user-details/", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log("Sign Up Data Submitted:", formData);
    // Add sign-up API call or form submission logic here
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* <div className="logo">
          <img src="logo-url-here" alt="Logo" />
        </div> */}
        <h2>Create Your Account</h2>
        {/* <p>Fill in the details to get started.</p> */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your full name"
              value={formData.name}
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
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

          <button type="submit" className="primary-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to={"/"}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
