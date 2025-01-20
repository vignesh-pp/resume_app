import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import TemplateStepper from "./TemplateStepper";
import SelectedTemplate from "./SelectedTemplate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import TemplateStyles from "./TemplateStyles";

function TemplatePreview(props) {
  const { selectedTemplate, setSelectedTemplate, setActiveTab } = props;
  const [activeStep, setActiveStep] = useState(1);
  const steps = selectedTemplate.steps;
  const [content, setContent] = useState('');

  const formats = [
    "header", // Headers (h1, h2, etc.)
    "bold", "italic", "underline", "strike", // Text formatting
    "list", "bullet", // Lists
    "align", // Alignment
    "link", // Links
    "image", // Images
    "blockquote", "code-block",
    "formula",
    "table"
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Header options
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ align: [] }], // Text alignment
      ["link", "image"], // Links and images
      ["blockquote", "code-block"], // Block-level formatting
      ["clean"], // Remove formatting
      ['formula'],['table']
    ],
  };

  const handleChanges = (value) => {
    setContent(value);
  };

  const editorRef = useRef(null);

  const handleChange = (field, value) => {
    console.log(field);

    setSelectedTemplate((prev) => {
      const updatedTemplate = { ...prev };

      console.log(updatedTemplate, field in updatedTemplate);

      // Check if the field belongs to personaldetails or any other section
      if (field in updatedTemplate.personaldetails) {
        console.log("personal");
        updatedTemplate.personaldetails[field] = value;
      } else if (field === "summary") {
        console.log("summary");
        updatedTemplate.summary.value = value;
      } else if (field === "skills") {
        console.log("skills");
        updatedTemplate.skills.value = value;
      }

      return updatedTemplate;
    });
  };

  const handleArrayChange = (field, index, value) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  // Handle changes in nested fields
  const handleNestedChange = (field, index, subField, value) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value];
      updatedArray[index] = { ...updatedArray[index], [subField]: value };
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };

  // Handle adding a new item to the array
  const handleAddItem = (field, newItem) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value, newItem];
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };

  // Handle deleting an item from the array
  const handleDeleteItem = (field, index) => {
    setSelectedTemplate((prev) => {
      const updatedArray = [...prev[field].value];
      updatedArray.splice(index, 1); // Remove item at the specified index
      return { ...prev, [field]: { ...prev[field], value: updatedArray } };
    });
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    activeStep === 1
      ? setActiveTab(0)
      : setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const CustomTextBoxStyle = {
    marginTop: "0px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px", // Rounded corners
      backgroundColor: "#f5f5f5", // Light background
      marginTop: "0px",
      "&.Mui-focused": {
        backgroundColor: "#e3f2fd", // Slight highlight when focused
        boxShadow: "0 0 5px #42a5f5", // Blue glow
      },
      "& fieldset": {
        borderColor: "#42a5f5", // Custom border color
      },
      "&:hover fieldset": {
        borderColor: "#1e88e5", // Border color on hover
      },
    },
    "& .MuiInputLabel-root": {
      color: "#757575", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1e88e5", // Label color when focused
    },
  };

  const labelStyle = {
    color: "#1e88e5", // Custom color for the label
    marginBottom: "4px", // Space between label and input
    fontWeight: "bold",
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      {activeStep !== steps.length && (
        <Box sx={{ background: "navy", padding: 2 }}>
          <TemplateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            setActiveTab={setActiveTab}
          />
        </Box>
      )}

      <Box sx={{ width: "100%" }}>
        {activeStep !== steps.length && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderBottom: "1px solid gray",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {steps[activeStep] &&
                steps[activeStep].label &&
                steps[activeStep].label}
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleChanges}
              modules={modules}
      formats={formats}
              placeholder="Write something..."
            />
            {/* Buttons */}
            <Box>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length}
                sx={{ mr: 2 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>

              {activeStep === steps.length && (
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  color="secondary"
                >
                  Reset
                </Button>
              )}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          {activeStep !== steps.length && (
            <>
              <Box className="col-7">
                {/* Form for Editing */}
                <Box
                  sx={{
                    flex: 1,
                    background: "#f7f7f7",
                    padding: "5px 10px",
                    borderRadius: 2,
                  }}
                >
                  {activeStep === 1 && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={labelStyle}>
                            First Name
                          </Typography>
                          <TextField
                            // label="First Name"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.firstname}
                            onChange={(e) =>
                              handleChange("firstname", e.target.value)
                            }
                            size="small"
                            sx={CustomTextBoxStyle}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Last Name
                          </Typography>
                          <TextField
                            // label="Last Name"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.lastname}
                            sx={{
                              marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                            onChange={(e) =>
                              handleChange("lastname", e.target.value)
                            }
                            size="small"
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Email
                        </Typography>
                        <TextField
                          // label="Email"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={labelStyle}>
                          Phone
                        </Typography>
                        <TextField
                          // label="Phone"
                          fullWidth
                          margin="normal"
                          value={selectedTemplate.personaldetails.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          size="small"
                          sx={CustomTextBoxStyle}
                        />
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box>
                          <Typography variant="subtitle2" sx={labelStyle}>
                            City
                          </Typography>
                          <TextField
                            // label="City"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.city}
                            onChange={(e) =>
                              handleChange("city", e.target.value)
                            }
                            size="small"
                            sx={CustomTextBoxStyle}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Country
                          </Typography>
                          <TextField
                            // label="Country"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.country}
                            onChange={(e) =>
                              handleChange("country", e.target.value)
                            }
                            size="small"
                            sx={{
                              marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Pincode
                          </Typography>
                          <TextField
                            // label="Pincode"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.pincode}
                            onChange={(e) =>
                              handleChange("pincode", e.target.value)
                            }
                            size="small"
                            sx={{
                              marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  {activeStep === 2 && (
                    <Box sx={{ marginTop: "10px" }}>
                      <ReactQuill
                        theme="snow"
                        ref={editorRef}
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline"], // Text styling
                            [{ list: "ordered" }, { list: "bullet" }], // List options
                          ],
                        }}
                        value={selectedTemplate.summary?.value || ""}
                        onChange={(e) => handleChange("summary", e)}
                      />
                      {/* <TextField
                    fullWidth
                    type="textarea"
                    margin="normal"
                    value={selectedTemplate.summary?.value || ""}
                    onChange={(e) => handleChange("summary", e)}
                    size="small"
                    sx={{
                      marginLeft: "10px",
                      ...CustomTextBoxStyle,
                    }}
                  /> */}
                    </Box>
                  )}
                  {/* Skills */}
                  {activeStep === 3 && (
                    <>
                      <ReactQuill
                        theme="snow"
                        // ref={editorRef}
                        value={selectedTemplate.skills?.value || ""}
                        onChange={(e) => handleChange("skills", e)}
                      />
                    </>
                  )}
                  {/* Education */}
                  {activeStep === 4 && (
                    <>
                      {selectedTemplate.education?.value?.map((edu, index) => (
                        <Box key={index} mt={2}>
                          <TextField
                            label="Institute"
                            fullWidth
                            margin="normal"
                            value={edu.institute}
                            onChange={(e) =>
                              handleNestedChange(
                                "education",
                                index,
                                "institute",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="Degree"
                            fullWidth
                            margin="normal"
                            value={edu.degree}
                            onChange={(e) =>
                              handleNestedChange(
                                "education",
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="Year"
                            fullWidth
                            margin="normal"
                            value={edu.year}
                            onChange={(e) =>
                              handleNestedChange(
                                "education",
                                index,
                                "year",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <Button
                            color="error"
                            onClick={() => handleDeleteItem("education", index)}
                            sx={{ mt: 1 }}
                          >
                            Delete Education
                          </Button>
                          <Divider sx={{ my: 2 }} />
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() =>
                          handleAddItem("education", {
                            institute: "",
                            degree: "",
                            year: "",
                          })
                        }
                      >
                        Add Education
                      </Button>
                    </>
                  )}
                  {/* Certificates */}
                  {activeStep === 5 && (
                    <>
                      {selectedTemplate.certificate?.value?.map(
                        (edu, index) => (
                          <Box key={index} mt={2}>
                            <TextField
                              label="Title"
                              fullWidth
                              margin="normal"
                              value={edu.name}
                              onChange={(e) =>
                                handleNestedChange(
                                  "certificate",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                            <TextField
                              label="Link"
                              fullWidth
                              margin="normal"
                              value={edu.link}
                              onChange={(e) =>
                                handleNestedChange(
                                  "certificate",
                                  index,
                                  "link",
                                  e.target.value
                                )
                              }
                              size="small"
                            />

                            <Button
                              color="error"
                              onClick={() =>
                                handleDeleteItem("certificate", index)
                              }
                              sx={{ mt: 1 }}
                            >
                              Delete Certificate
                            </Button>
                            <Divider sx={{ my: 2 }} />
                          </Box>
                        )
                      )}
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() =>
                          handleAddItem("certificate", {
                            title: "",
                            link: "",
                          })
                        }
                      >
                        Add Certificate
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
              <Box className="col-4">
                <SelectedTemplate
                  selectedTemplate={selectedTemplate}
                  // isPreview={true}
                />
              </Box>
            </>
          )}

          {/* Rendered Resume */}

          {activeStep === steps.length && (
            <div className="container d-flex justify-content-between">
              {" "}
              <Box className="col-3 text-center">
                <TemplateStyles
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              </Box>
              <Box className="col-5">
                <SelectedTemplate selectedTemplate={selectedTemplate} />
              </Box>
              <Box className="col-3 text-center">dejf</Box>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TemplatePreview;
