import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Box,
  Grid,
  IconButton,
  CardActions,
  InputBase,
  Tooltip,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Button, duration } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TemplatePreview from "./TemplatePreview";
import { Popover } from "@mui/material";
import { Description, PictureAsPdf } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./Template.css";
import { useSelector, useDispatch } from "react-redux";
import ReactDOMServer from "react-dom/server";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import axiosInstance from "../Pages/axiosInstance";
import { store } from "../Pages/store";
import CloudCustomerLoader from "../Custom/CloudCustomLoader";
import animationgif from "../Images/animation_loader.gif";
import { useParams } from "react-router-dom";
import NoResult from "../Images/NoResult.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { set, get } from "idb-keyval";
import { Clock, ArrowUpRight, FileText, Edit, Download } from "lucide-react";
import AddIcon from "@mui/icons-material/Add";
import htmlDocx from "html-docx-js/dist/html-docx";
import EditIcon from "@mui/icons-material/Edit";
import { FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { saveAs } from "file-saver";
import SelectedTemplate from "./SelectedTemplate";
import SelectedPdfTemplate from "./SelectedPdfTemplate";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete'; 
import CloseIcon from "@mui/icons-material/Close";
// import Cookies from "js-cookie";

// const csrfToken = Cookies.get("csrftoken");
// console.log("====================================");
// console.log("csrfToken", csrfToken);
// console.log("====================================");
// // axios.defaults.withCredentials = true;

export default function Template() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetailsAutosave = useSelector(
    (state) => state.user_template_details
  );
  const navigationType = useNavigationType();
  const location = useLocation();
  const { childroute } = useParams();
  const pathname = location.pathname;
  const mainRoute = pathname.split("/")[1];
  const user = store?.getState()?.user?.username;

  const isLoggedIn = store?.getState()?.user?.isLoggedIn;
  // const pathname = window.location.pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setuserName] = useState(store?.getState().username);
  const [editing, setEditing] = useState({});
  const [OpenDeleteTemplate, setOpenDeleteTemplate] = useState(false);
  const [TemplateToDelete, setTemplateToDelete] = useState(null);
  const [allTemplates, setAllTemplates] = useState([]);
  const { userId } = useParams();
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileName, setFileName] = useState(
    selectedTemplate?.template_saved_name || `file-name-${formattedDate}`
  );
  const [tempName, setTempName] = useState(fileName);
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/"); // Redirect to login if not logged in
    }
  }, []);
// utils/resumeAPI.js or define this in the same component/file
const fetchMyResumes = async () => {
  setIsLoading(true);
  try {
    const res = await axiosInstance.get("api/user-template/");
    const data = Array.isArray(res?.data?.data)
    ? res?.data?.data.map((item) => ({
        ...item?.resume_details,
        resume_id: item?.id,
      }))
    : [];
    console.log(data,'dataofew');
    
    setAllTemplates(data);
    dispatch({ type: "MY_RESUMES", data });
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false); 
  }
};

  useEffect(() => {
    setIsLoading(true);
    if( pathname.includes("myresume")){
      fetchMyResumes();
    }

    console.log("pathaname", pathname);

    pathname.includes("usertemplates") &&
      axiosInstance
        .get(`api/user-template/?user_id=${userId}`)
        .then((res) => {
          if (res?.data?.data === "No Resumes") {
            setIsLoading(false);
          } else {
            const data =
              res?.data?.data.map((item) => ({
                ...item.resume_details, // Spread the existing template object
                resume_id: item.id, // Add the `id` as `resume_id` inside each template

                // template_saved_name:
                //   item?.template_saved_name === ""
                //     ? user?.username
                //     : item.template_saved_name,
              })) || [];
            setAllTemplates(data);
            dispatch({ type: "MY_RESUMES", data });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });

    pathname.includes("create") &&
      axiosInstance
        .get("api/resume-template/")
        .then((res) => {
          console.log("res", res.data);
          const templates =
            res?.data?.data.map((item) => ({
              ...item.template, // Spread the existing template object
              resume_template: item.id, // Add the `id` as `resume_id` inside each template
              template_saved_name:
                item?.template_saved_name === ""
                  ? user?.username
                  : item.template_saved_name,
            })) || [];

          console.log("Templatef", templates);
          dispatch({ type: "ALL_TEMPLATES", templates });

          setAllTemplates(templates);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoading(false);
        });
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer); // Clear the old timer
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Auto-save function
  const saveToIndexedDB = async (data) => {
    try {
      // await set(`data`, data);
      dispatch({
        type: "USER_TEMPLATE_DETAILS",
        data,
      });
    } catch (error) {
      console.error("Error auto-saving:", error);
    }
  };
  const handlePopoverOpen = (event, template) => {
    setSelectedTemplate(template);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleRename = (current_template) => {
    const trimmedName = tempName.trim();

    if (!trimmedName) {
      // Do nothing or optionally show an error
      return;
    }
    setFileName(trimmedName);
    const updatedTemplates =
      allTemplates?.map((template) =>
        template?.resume_id === current_template?.resume_id
          ? { ...template, template_saved_name: trimmedName }
          : template
      ) || [];

    setAllTemplates(updatedTemplates || []);
    setEditing(false);

    const updatedTemplate = updatedTemplates.find(
      (template) => template.resume_id === current_template.resume_id
    );

    const payload = {
      resume_id: updatedTemplate?.resume_id,
      resume_details: updatedTemplate,
    };
    
    if (
      pathname.includes("myresume") ||
      pathname.includes("usertemplates")
    ) {
      axiosInstance
        .put("api/user-template/", payload)
        .then((res) => {
          console.log(res);
          // navigate("/home");
          toast.success("Resume updated successfully!");
        })
        .catch((err) => console.log(err));
    }
  };
  // Debounced save
  const debouncedSave = debounce(saveToIndexedDB, 100);
  const handleSelect = (template) => {
    const templateSelec = JSON.parse(JSON.stringify(template));
    setActiveTab(1);
    if (userId) {
      navigate(`/${mainRoute}/${template?.steps?.[0]}/${userId}`);
    } else {
      navigate(`/${mainRoute}/${template?.steps?.[0]}`);
    }
    setSelectedTemplate(templateSelec);
    // debouncedSave(template)
    saveToIndexedDB(templateSelec);
  };

  useEffect(() => {
    const loadFormData = async () => {
      const dynamicKey = `resumeData_${selectedTemplate?.resume_template}${
        selectedTemplate?.resume_id || ""
      }`;
      const savedData = store.getState()?.user_template_details;
      if (
        savedData?.resume_template &&
        !savedData.steps.includes("custom") &&
        childroute === "custom"
      ) {
        savedData.steps.push("custom");
      }
      if (
        savedData?.resume_template &&
        (mainRoute === "create" ||
          mainRoute === "myresumes" ||
          mainRoute === "usertemplates") &&
        (savedData.steps.includes(childroute) || childroute === "preview")
      ) {
        setSelectedTemplate(savedData);
        setActiveTab(1);
      } else {
        setActiveTab(0);
      }
    };

    loadFormData(); // Load saved data on component mount
  }, []);

  return (
    <div
      style={{
        // background: "linear-gradient(180deg, #fff 0%, #ceeeff 100%)",
        height: "100vh",
      }}
    >
      {activeTab === 0 && <Navbar />}

      {isLoading ? (
        // <div style={{ paddingTop: "200px",margin:'auto',display:'flex',textAlign: "center",justifyContent:'center' }}>
        //   {/* <CloudCustomerLoader /> */}
        //   <img src={animationgif} />
        // </div>
        <div
          style={{
            paddingTop: "180px",
            margin: "auto",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {/* <CloudCustomerLoader /> */}
          <img src={animationgif} />
        </div>
      ) : (
        <>
          {activeTab === 0 && (
            <>
              {allTemplates.length === 0 && (
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "3rem",
                    }}
                  >
                    <IconButton
                      onClick={() => navigate("/home")}
                      style={{
                        color: "gray",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: "#f9fafb", // Mild light grey background
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        zIndex: 5,
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#e0e0e0", // Slightly darker grey on hover
                        },
                      }}
                    >
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Typography style={{ color: "gray" }}>Back</Typography>
                  </div>
                  <div style={{ textAlign: "center", paddingTop: "150px" }}>
                    <img
                      src={NoResult}
                      alt="No Results"
                      style={{ width: "12rem", height: "12rem" }}
                    />
                    <h2 className="text-xl font-semibold text-gray-700">
                      No Resumes Found
                    </h2>
                    <p className="text-gray-500">
                      Select a template and craft a professional resume
                      effortlessly.
                    </p>
                  </div>
                </div>
              )}
              <Box sx={{ paddingTop: 4 }}>
                {/* Other content */}
                <Box>
                  {/* MUI Grid Container */}
                  {allTemplates.length > 0 && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{
                        marginTop: "35px",
                        position: "sticky",
                        top: "64.4px",
                        zIndex: 1000,
                        backgroundColor: "#ffffff",
                        padding: "7px",
                        paddingLeft: "32px",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0px",
                        }}
                      >
                        {/* Back Button */}
                        <IconButton
                          className="me-1"
                          sx={{
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
                            },
                          }}
                          onClick={() => {
                            navigate("/home");
                          }}
                        >
                          <ArrowBackIcon
                            fontSize="small"
                            style={{ cursor: "pointer", color: "gray" }}
                          />
                        </IconButton>
                        <div
                          className="font-weight-bold"
                          style={{
                            fontSize: "18px",
                            color: "black",
                            fontWeight: "600",
                          }}
                        >
                          {pathname.includes("myresume")
                            ? "My Resumes"
                            : pathname.includes("create")
                            ?
                            "Choose a Resume Template"
                            : `${userName ? userName : 'User'}'s resumes`}
                        </div>
                      </div>
                      <div className="text-primary d-flex align-items-center">
                        {/* <span>Custom Template</span>{" "}
                        <span className="ms-1" style={{ fontSize: "28px" }}>
                          +
                        </span> */}
                        {/* <Button
                          onClick={() => {
                            navigate("/custom");
                          }}
                          // endIcon={<span style={{ fontSize: "14px" }}>+</span>}
                          sx={{
                            border: "1px solid ",
                            // marginTop: "-10px",
                            background: "white",
                            color: "#1976d2",
                            borderRadius: "25px",
                          }}
                        >
                          Custom Template
                        </Button> */}
                      </div>
                    </div>
                  )}

                  {/* <Button  sx={{marginLeft:'85%',position:'absolute',border:'1px solid ',marginTop:'-10px',background:'#1976d2',color:'white',borderRadius:'25px'}}>Custom Template</Button> */}

                  <div
                    className="d-flex flex-wrap justify-content-center"
                    style={{
                      gap: "50px",
                      padding: "10px 32px",
                    }}
                  >
                    {console.log(allTemplates, "templat")}
                    {allTemplates?.map((value, index) => (
                      <div
                        key={index}
                        className="template-box"
                        style={{
                          flex: "0 0 calc(30.3333% - 50px)", // Exactly 3 items per row
                          maxWidth: "calc(30.3333% - 50px)",
                          minWidth: "250px",
                          position: "relative",
                          // paddingTop:!pathname.includes('create') ? "3.5rem" : "",
                          border: "1px solid #eaeaea",
                          borderRadius: "8px",
                          boxSizing: "border-box",
                          transition: "0.3s",
                          // padding:"0px 2rem",
                        }}
                      >
                        {/* Top bar with icons */}
                        {!pathname.includes('create') && <Box
                        className="py-2"
                          sx={{
                            // position: "absolute",
                            // top: 10,
                            // left: 16,
                            // right: 16,
                            display: "flex",
                            backgroundColor: "#eff2f9",
                            justifyContent: "space-between",
                            width: "100%",
                            px: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              // border: "1px solid #eaeaea",
                              gap: 1,
                              // backgroundColor: "rgba(255, 255, 255, 0.5)",
                              backdropFilter: "blur(4px)",
                              px: 1.2,
                              py: 0.75,
                              borderRadius: "9999px",
                            }}
                          >
                            {/* Download Icon */}
                            {/* <FileText
                              style={{
                                width: 16,
                                height: 16,
                                color: "#2563eb",
                              }}
                            /> */}
                            {editing?.[value?.resume_id] ? (
                              <>
                                <InputBase
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && handleRename(value)
                                  }
                                  autoFocus
                                  sx={{
                                    fontSize: 13,
                                    textAlign: "center",
                                    borderBottom: "1px solid #ccc",
                                    px: 0,
                                    pb: "0px",
                                    pt: "1px",
                                    height: "26px",
                                    width: "100%",
                                    maxWidth: 110, // Reduced width
                                    lineHeight: 1.2,
                                    "& input": {
                                      padding: 0, // ✅ This targets the actual input element
                                      textAlign: "center",
                                    },
                                  }}
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => handleRename(value)}
                                  sx={{ p: 0.5, color: "green" }} // Green for Save
                                >
                                  <FiCheckCircle size={20} />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                <Typography
                                  fontSize={13}
                                  noWrap
                                  sx={{
                                    maxWidth: "150px", // adjust as needed
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                    color: "#212529",
                                  }}
                                  onClick={() => {
                                    setEditing({ [value?.resume_id]: true });
                                    setTempName(
                                      value?.template_saved_name ||
                                        `file-name-${formattedDate}`
                                    );
                                  }}
                                >
                                  {" "}
                                  <Tooltip
                                    title={
                                      value?.template_saved_name ||
                                      `file-name-${formattedDate}`
                                    }
                                  >
                                    {value?.template_saved_name ||
                                      `file-name-${formattedDate}`}
                                  </Tooltip>
                                </Typography>
                                <Tooltip title={"Edit File Name"}>
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setEditing({ [value?.resume_id]: true });
                                      setTempName(
                                        value?.template_saved_name ||
                                          `file-name-${formattedDate}`
                                      );
                                    }}
                                    sx={{
                                      p: 0.5,
                                      color: "#1976d2", // Blue for Edit
                                      "&:hover": {
                                        color: "#1565c0", // Darker blue on hover
                                      },
                                    }}
                                  >
                                    <FiEdit2 size={14} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Box>
                          <Tooltip title={"Export Resume"}>
                          <Box
                            sx={{
                              width: 35, // or any equal width/height
                              height: 35,
                              border: "1px solid #eaeaea",
                              backgroundColor: "rgba(255, 255, 255, 0.5)",
                              backdropFilter: "blur(4px)",
                              borderRadius: "50%", // makes it a circle
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(34, 197, 94, 0.15)", // optional hover effect
                              },
                            }}
                            onClick={(e) => {
                              handlePopoverOpen(e, value);
                            }}
                          >
                            <Download
                              style={{
                                width: 14,
                                height: 14,
                                color: "#22c55e",
                              }}
                            />
                          </Box>
                            </Tooltip>
                        </Box>
                        }
                        {/* Template Preview */}
                        <div
                          style={{
                            width: "100%",
                            height: "500px",
                            borderRadius: "5px",
                            // cursor: "pointer",
                            position: "relative", // add this if not already
                            overflow: "hidden", // crop overflow for nice edges
                          }}
                        >
                          <img
                            src={value?.template_thumbnail}
                            alt={value?.template_name}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "5px",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                          />
                          <Box
                            className="hover-overlay"
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              // background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            }}
                          >
                          <div className="overlay-buttons gap-3">
                              {pathname.includes("myresume") &&
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTemplateToDelete(value)
                                  setOpenDeleteTemplate(true)
                                }}
                                sx={{
                                  borderRadius: "16px",
                                  paddingX: 2,
                                  paddingY: 1,
                                  fontWeight: 550,
                                  fontSize: "13px",
                                  minWidth: "9rem",
                                  textTransform: "none",
                                  backgroundColor: "#fff",
                                  color: "#d32f2f", // Red color for delete action
                                  // border: "1px solid #d32f2f",
                                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                  "&:hover": {
                                    // backgroundColor: "#d32f2f",
                                    // color: "#fff",
                                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                                  },
                                }}
                              >
                                Delete
                              </Button>}

                            <Button
                              variant="contained"
                              size="small"
                              // color={pathname.includes("create") ? "success" : "primary"}
                              startIcon={
                                pathname.includes("create") ? (
                                  <AddIcon />
                                ) : (
                                  <EditIcon />
                                )
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(value);
                              }}
                              sx={{
                                borderRadius: "10px",
                                paddingX: 2,
                                paddingY: 1,
                                fontWeight: 550,
                                borderRadius: "16px",
                                fontSize: "13px",
                                minWidth:"9rem",
                                textTransform: "none",
                                // border:"1px solid #4d63da",
                                backgroundColor:"#fff",
                                color:"#4d63da",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                                },
                              }}
                            >
                              {pathname.includes("create") ? "Use Template" : "Edit Resume"}{" "}
                            </Button>
                          </div>
                          </Box>
                        </div>
                        {/* <div
                        style={{
                          marginTop:"auto",
                          backgroundColor: "#eff2f9",
                          padding: "2rem",
                        }}
                      /> */}
                      </div>
                    ))}
                  </div>

                  <style>
                    {`
                    @media (max-width: 600px) {
                      .template-box {
                        flex: 0 0 100%;
                        max-width: 100%;
                      }
                    }

                    .template-box {
                      position: relative;
                      overflow: hidden;
                    }

                    .template-box:hover img {
                      transform: scale(1.03);
                    }

                    .template-box:hover .overlay-buttons {
                      opacity: 1;
                      pointer-events: auto;
                    }
                    .template-box:hover .hover-overlay {
                      opacity: 1;
                    }
                    .overlay-buttons {
                      opacity: 0;
                      pointer-events: none;
                      transition: opacity 0.3s ease;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      z-index: 2;
                    }
                      
                  `}
                  </style>
                </Box>
              </Box>
            </>
          )}
          {activeTab === 1 && (
            <Box>
              {selectedTemplate !== null && (
                <TemplatePreview
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  setActiveTab={setActiveTab}
                  pathname={pathname}
                  debouncedSave={debouncedSave}
                  setAllTemplates={setAllTemplates}
                />
              )}
            </Box>
          )}
        </>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            borderRadius: 3,
            overflow: "visible",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        disableScrollLock
      >
        <div
          style={{ padding: "10px" }}
          className="d-flex flex-column align-items-start"
        >
          {/* DOCX Button */}
          <Button
            startIcon={<Description style={{ fontSize: "16px" }} />}
            onClick={() => {
              const converted = htmlDocx.asBlob(
                ReactDOMServer.renderToString(
                  <SelectedTemplate
                    selectedTemplate={selectedTemplate}
                    isDownload={true}
                  />
                )
              );

              saveAs(converted, `${fileName}.docx`);
              handlePopoverClose();
            }}
            style={{ fontSize: "12px", textTransform: "none" }}
          >
            Export as DOCX
          </Button>

          {/* PDF Button using PDFDownloadLink */}
          <PDFDownloadLink
            document={
              <SelectedPdfTemplate selectedTemplate={selectedTemplate} />
            }
            fileName={`${fileName}.pdf`}
          >
            {({ loading }) => (
              <Button
                color="error"
                startIcon={<PictureAsPdf style={{ fontSize: "16px" }} />}
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  textTransform: "none",
                  color: "#FF4D4D",
                }}
                onClick={handlePopoverClose}
              >
                {loading ? "Preparing PDF..." : "Export as PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </Popover>
        <Dialog
              open={OpenDeleteTemplate}
              onClose={() => {
                setOpenDeleteTemplate(false)
                setTemplateToDelete(null)
              }}
              maxWidth="xs"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  p: 1.5,
                },
              }}
            >
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  pb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Delete Account?
                </Typography>
                <IconButton onClick={() => setOpenDeleteTemplate(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 2, py: 1 }}>
                <Typography variant="body1">
                  Are you sure you want to delete <b>{TemplateToDelete?.template_saved_name || `file-name-${formattedDate}`}</b>
                </Typography>
              </DialogContent>
              <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button
                  onClick={() => {
                    setOpenDeleteTemplate(false)
                    setTemplateToDelete(null)
                  }}
                  sx={{
                    minWidth: 100, // or use width: 100
                    color: "#555",
                    borderColor: "#ccc",
                    backgroundColor: "#f9fafb",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                      borderColor: "#bdbdbd",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={()=>{
                    setOpenDeleteTemplate(false)
                    setTemplateToDelete(null)
                    axiosInstance
                    .delete("api/user-template/", {
                      params: {
                        template_id: TemplateToDelete?.resume_id,
                      },
                    })
                    .then((res) => {
                      console.log(res);
                      fetchMyResumes();
                      toast.success("Resume deleted successfully!");
                    })
                    .catch((err) => {
                      console.log(err);
                      toast.error("Failed to delete resume.");
                    });
                  }}
                  sx={{
                    minWidth: 100, // match the Cancel button
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
}
