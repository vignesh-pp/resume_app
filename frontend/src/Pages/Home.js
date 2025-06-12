import React, { Component, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "./store";
import Image from "../Images/Resume-Black.png";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloudCustomerLoader from "../Custom/CloudCustomLoader";
import axiosInstance from "./axiosInstance";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = store.getState()?.user;
  const isLoggedIn = store.getState()?.user?.isLoggedIn; // Assuming `user.isLoggedIn` holds login status
  const [count, setCount] = useState({
    templates: 0,
    myresumes: 0,
    users: 0,
  });

  useEffect(() => {
    axiosInstance
      .get("api/user-template/")
      .then((res) => {
        setCount((prevCount) => ({
          ...prevCount,
          myresumes: Array.isArray(res?.data?.data) ? res.data.data.length : 0,
        }));
      })
      .catch((err) => {
        console.error("Error fetching user templates:", err);
      });
    axiosInstance
      .get("api/resume-template/")
      .then((res) => {
        setCount((prevCount) => ({
          ...prevCount,
          templates: Array.isArray(res?.data?.data) ? res.data.data.length : 0,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .get("api/user-details/")
      .then((res) => {
        console.log(res);

        setCount((prevCount) => ({
          ...prevCount,
          users: Array.isArray(res?.data?.data) ? res.data.data.length : 0,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/"); // Redirect to login if not logged in
    }
  }, []);
  return (
    <div className="" style={{ height: "100vh" }}>
      <Navbar />

      <div className="container">
        <div className="row w-100" style={{ padding: "150px 0px 0px 0px" }}>
          <div className="col-sm-8 ">
            <h1 style={{ fontSize: "50px", fontWeight: 700 }}>
              WEB RESUME BUILDER
            </h1>
            <p className="mt-4" style={{ fontSize: "17px" }}>
              Craft your professional resume with ease using our intuitive
              builder. Highlight your skills, showcase your achievements, and
              stand out to potential employers with a polished, user-friendly
              design. From fresh graduates to seasoned professionals, our tools
              make the process seamless.
            </p>
            <div
              className="d-flex flex-wrap justify-content-between gap-4 mt-5"
              style={{ width: "95%", margin: "auto" }}
            >
              {/* Create Resume Box */}
              <div
                onClick={() => navigate("/create")}
                style={{
                  cursor: "pointer",
                  flex: user?.userrole === "admin" ? "0 0 30%" : "0 0 47%",
                  background: "#FFF5E1",
                  border: "1px solid #FFCD7D",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  position: "relative",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h5 style={{ color: "#d17c00", fontWeight: 700 }}>
                  Create Resume
                </h5>
                <p
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#444",
                  }}
                >
                  Start with a professional template and customize it to match
                  your background, skills, and career objectives.
                </p>
                {/* <span style={{ color: "#d17c00" }}>Click to create.</span> */}
                {count.templates > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "#FFCD7D",
                      color: "black",
                      padding: "5px 10px",
                      borderRadius: "50px",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {count.templates}
                  </span>
                )}
              </div>

              {/* My Resumes Box */}
              <div
                onClick={() => navigate("/myresumes")}
                style={{
                  cursor: "pointer",
                  flex: user?.userrole === "admin" ? "0 0 30%" : "0 0 45%",
                  background: "#E8F0FF",
                  border: "1px solid #8AB4F8",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  position: "relative",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h5 style={{ color: "#1a5cc8", fontWeight: 700 }}>
                  My Resumes
                </h5>
                <p
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Access your saved resumes and organize them as needed for
                  future use or quick reference.
                </p>
                {/* <span style={{ color: "#1a5cc8" }}>Click to manage.</span> */}

                {count.myresumes > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "#1a5cc8",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "50px",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {count.myresumes}
                  </span>
                )}
              </div>

              {/* Admin-only - All Users Box */}
              {user?.userrole === "admin" && (
                <div
                  onClick={() => navigate("/allusers")}
                  style={{
                    cursor: "pointer",
                    flex: "0 0 30%",
                    background: "#FFF3F3",
                    border: "1px solid #ff9999",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    position: "relative",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <h5 style={{ color: "#d22c2c", fontWeight: 700 }}>
                    All Users
                  </h5>
                  <p
                    style={{
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    Browse the list of registered users and manage their
                    profiles and activity across the resume builder platform.
                  </p>
                  {/* <span style={{ color: "#d22c2c" }}>Click to view.</span> */}

                  {count.users > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: "rgb(219 91 91)",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "50px",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      {count.users}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <div className="col-sm-4">
            <img
              src={Image}
              width="100%"
              height="100%"
              alt="Resume Preview"
              class="resume-image"
              style={{ borderRadius: "5px", objectFit: "cover" }}
            />{" "}
          </div> */}
          <div className="col image-container">
            <img src={Image} alt="Resume Preview" className="resume-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
