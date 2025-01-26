import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video">
        <source
          //   src={`${process.env.PUBLIC_URL}/GreenHome.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Navbar />
      <div className="content-container d-flex justify-content-center align-items-center">
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
      </div>
    </div>
  );
}
