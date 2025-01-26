import React, { Component, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="" style={{ height: "100vh" }}>
      {/* <video autoPlay loop muted className="video">
        <source
          //   src={`${process.env.PUBLIC_URL}/GreenHome.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
      <Navbar />
      {/* <div className="content-container d-flex justify-content-center align-items-center">
        <div
          style={{ marginTop: "10px" }}
          className="px-4 py-5 text-center"
        >
          <div className="py-5">
            <h1
            //   style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              className="neon"
            >
              WEB RESUME BUILDER
            </h1>
            <div className="col-lg-6 mx-auto">
              <p className="fs-5 mb-4" style={{ marginTop: "30px" }}>
                Craft your professional resume with ease using our intuitive
                builder. Highlight your skills, showcase your achievements, and
                stand out to potential employers with a polished, user-friendly
                design. From fresh graduates to seasoned professionals, our
                tools make the process seamless.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link
                  to="/create"
                  className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                >
                  Create Resume
                </Link>
                <Link
                  to="/create"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  My Resumes
                </Link>
                <Link
                  to="/create"
                  className="btn btn-outline-info btn-lg px-4 fw-bold"
                >
                  All User Resumes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="home-container">
        <div className="hero" style={{ marginTop: "100px" }}>
          <h1>Web Resume Builder</h1>
          <p>Craft your professional resume with ease.</p>
          <p>
            Highlight your skills, showcase your achievements, and stand out to
            potential employers with a polished, user-friendly design.
          </p>
          <div
            className="d-flex align-items-center m-auto"
            style={{ width: "max-content" }}
          >
            <Link to="/create" className="custom-button create-resume-btn">
              Create Resume
            </Link>
            <Link to="/create" className="custom-button my-resume-btn">
              My Resume
            </Link>
            <Link to="/create" className="custom-button all-resumes-btn">
              All User Resumes
            </Link>
          </div>
        </div>

        {/* <div className="features">
          <h2>Key Features</h2>
          <div className="feature-list">
            <div className="feature">
              <i className="fas fa-rocket"></i>
              <h3>Fast & Easy</h3>
              <p>Quickly generate professional resumes in minutes.</p>
            </div>
            <div className="feature">
              <i className="fas fa-palette"></i>
              <h3>Customizable Templates</h3>
              <p>Choose from a variety of templates to match your style.</p>
            </div>
            <div className="feature">
              <i className="fas fa-cloud"></i>
              <h3>Cloud Storage</h3>
              <p>Save and access your resumes from anywhere.</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
