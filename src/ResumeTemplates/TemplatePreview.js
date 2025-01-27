import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import TemplateStepper from "./TemplateStepper";
import SelectedTemplate from "./SelectedTemplate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import TemplateStyles from "./TemplateStyles";
import CreatableSelect from "react-select/creatable";
import { Chip } from "@mui/material";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EducationComponent from "../Pages/EducationComponent";
import ExperienceComponent from "../Pages/ExperienceComponent";
import CertificateComponent from "../Pages/CertificateComponent";
import ProjectComponent from "../Pages/ProjectComponent";

function TemplatePreview(props) {
  const { selectedTemplate, setSelectedTemplate, setActiveTab } = props;
  const steps = selectedTemplate.steps;

  const [activeStep, setActiveStep] = useState(steps[0]);
  const isPreview = activeStep === "preview";
  const currentIndex = steps.indexOf(activeStep);
  const [content, setContent] = useState("");
  const [currentSection, setCurrentSection] = useState(null); // 'education' or 'experience'
  const [editIndex, setEditIndex] = useState(null);
  const [tempEntry, setTempEntry] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(null); // Tracks the open form for 'education' or 'experience'

  useEffect(() => {
    console.log("====================================");
    console.log(steps);
    console.log("====================================");
  }, []);

  // Options for the dropdown
  const [skillOptions, setKillOptions] = useState([
    { value: "power bi", label: "Power BI" },
    { value: "spotfire", label: "Spotfire" },
    { value: "snowflake", label: "Snowflake" },
  ]);

  // Convert `skills.value` array to the format react-select requires
  const selectedSkillOptions =
    typeof selectedTemplate?.skills?.value === "object" &&
    selectedTemplate?.skills?.value?.map((skill) => ({
      value: skill.toLowerCase(),
      label: skill,
    }));

  // Handle changes in selection
  const handleSkillChange = (newSelectedOptions) => {
    const newSkills = newSelectedOptions
      ? newSelectedOptions.map((opt) => opt.label)
      : [];
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: newSkills, // Update the skills.value array with new selections
      },
    }));
  };

  // Handle adding a new option dynamically
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setKillOptions((prevOptions) => [...prevOptions, newOption]); // Add new option to the list
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: [...prev.skills.value, newOption.label], // Add the new skill
      },
    }));
  };

  // Handle removing a chip
  const handleDeleteChip = (chipToDelete) => {
    setSelectedTemplate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        value: prev.skills.value.filter((skill) => skill !== chipToDelete),
      },
    }));
  };

  const formats = [
    "header", // Headers (h1, h2, etc.)
    "bold",
    "italic",
    "underline",
    "strike", // Text formatting
    "list",
    "bullet", // Lists
    "align", // Alignment
    "link", // Links
    "image", // Images
    "blockquote",
    "code-block",
    "formula",
    "table",
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
      ["formula"],
      ["table"],
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
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleSave();
    if (currentIndex === steps.length - 1) {
      setActiveStep("preview"); // Go to Preview if on the last step
    } else {
      setActiveStep(steps[currentIndex + 1]); // Move to the next step
    }

    // setCurrentSection('certificate')
    if (activeStep === steps.length - 1) {
      const element = document.getElementById("resume");

      const bloboptions = {
        scale: 2, // Higher scale for better quality
      };

      // Use html2canvas to convert the element to an image
      html2canvas(element, bloboptions)
        .then((canvas) => {
          // Convert the canvas to a data URL
          const imgDataUrl = canvas.toDataURL("image/png");
          selectedTemplate.template_thumbnail = imgDataUrl;
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          console.log(selectedTemplate);
          console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        })
        .catch((error) => console.error("Image generation failed:", error));
    }
  };

  const handleBack = () => {
    handleSave();
    if (isPreview) {
      setActiveStep(steps[steps.length - 1]); // Go back to the last step from Preview
    } else if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1]); // Move to the previous step
    }
    // activeStep === 1
    //   ? setActiveTab(0)
    //   : setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const CustomTextBoxStyle = {
    marginTop: "0px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "3px", // Rounded corners
      backgroundColor: "white", // Light background
      backgroundColor: "#f5f5f5",
      marginTop: "0px",
      outLine: "none",
      "&.Mui-focused": {
        // backgroundColor: "#e3f2fd", // Slight highlight when focused
        // boxShadow: "0 0 5px #42a5f5", // Blue glow
      },
      "& fieldset": {
        // borderColor: "#42a5f5", // Custom border color
      },
      "&:hover fieldset": {
        // borderColor: "#1e88e5", // Border color on hover
      },
      "& .MuiInputBase-input": {
        fontSize: "12px", // Smaller font size for the input text
      },
    },
    "& .MuiInputLabel-root": {
      // color: "#757575", // Label color
    },
    "& .MuiInputLabel-root": {
      // color: "#757575", // Label color
      fontSize: "12px", // Smaller font size for the label
    },
    "& .MuiInputLabel-root.Mui-focused": {
      // color: "#1e88e5", // Label color when focused
    },
  };

  const labelStyle = {
    // color: "#1e88e5", // Custom color for the label
    marginBottom: "4px", // Space between label and input
    // fontWeight: "bold",
  };

  //

  // Handle input changes for the form
  const handleChangesss = (field, value) => {
    setTempEntry((prev) => ({ ...prev, [field]: value }));
  };

  // Save the current entry (add or update)
  const handleSave = () => {
    setIsFormOpen(null); // Open form for the section

    if (currentSection) {
      // setSelectedTemplate((prev) => {
      //   const updatedList = [...prev[currentSection].value];
      //   if (editIndex !== null) {
      //     updatedList[editIndex] = tempEntry; // Update existing
      //   } else {
      //     updatedList.push(tempEntry); // Add new
      //   }
      //   return {
      //     ...prev,
      //     [currentSection]: { value: updatedList },
      //   };
      // });
      setSelectedTemplate((prev) => {
        const updatedList = [...prev[currentSection].value];

        const defaultStructure = Object.keys(
          prev[currentSection].value[0] || {}
        ).reduce((acc, key) => {
          acc[key] = ""; // Default all keys to empty
          return acc;
        }, {});

        if (editIndex !== null) {
          // Merge the updated entry with the default structure
          updatedList[editIndex] = { ...defaultStructure, ...tempEntry };
        } else {
          // Add new entry with default structure
          updatedList.push({ ...defaultStructure, ...tempEntry });
        }

        return {
          ...prev,
          [currentSection]: {
            ...prev[currentSection],
            value: updatedList, // Update value
          },
        };
      });
    }

    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setTempEntry({});
    setEditIndex(null);
    setCurrentSection(null);
  };

  // Edit an entry
  const handleEdit = (section, index) => {
    setIsFormOpen(section); // Open form for the section

    setCurrentSection(section);
    setEditIndex(index);
    setTempEntry(selectedTemplate[section].value[index]);
  };

  // Delete an entry
  const handleDelete = (section, index) => {
    // setSelectedTemplate((prev) => {
    //   const updatedList = prev[section].value.filter((_, i) => i !== index);
    //   return { ...prev, [section]: { value: updatedList } };
    // });
    console.log(section);

    setSelectedTemplate((prev) => {
      const updatedList = prev[section].value.filter((_, i) => i !== index);

      // Preserve other keys like `has_institution`, etc.
      return {
        ...prev,
        [section]: {
          ...prev[section], // Preserve other keys
          value: updatedList, // Update value
        },
      };
    });
    // setSelectedTemplate((prev) => {
    //   const updatedList = [...prev[section].value];
    //   const emptyKeys = Object.keys(updatedList[index]).reduce((acc, key) => {
    //     acc[key] = ""; // Reset all keys to an empty string
    //     return acc;
    //   }, {});

    //   updatedList[index] = emptyKeys;

    //   return {
    //     ...prev,
    //     [section]: {
    //       ...prev[section],
    //       value: updatedList, // Update value with the cleared object
    //     },
    //   };
    // });
  };

  // Delete an entry
  // const handleDelete = (section, index) => {
  //   setSelectedTemplate((prev) => {
  //     const updatedList = [...prev[section].value];
  //     const emptyEntry = Object.keys(updatedList[index]).reduce((acc, key) => {
  //       acc[key] = ""; // Set all keys to empty strings
  //       return acc;
  //     }, {});
  //     updatedList[index] = emptyEntry; // Replace the entry with the empty object
  //     return { ...prev, [section]: { value: updatedList } };
  //   });
  // };

  // Open the form for adding a new entry
  const handleAdd = (section) => {
    console.log("====================================");
    console.log(section);
    console.log("====================================");
    setIsFormOpen(section); // Open form for the section

    setCurrentSection(section);
    setTempEntry({});
    setEditIndex(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // background: "linear-gradient(180deg, #fff 0%, #ceeeff 100%)",
      }}
    >
      {/* Stepper */}

      {!isPreview && (
        <Box
          sx={{
            background: "navy",
            padding: 2,
            height: "100vh",
            position: "fixed",
            width: "60px",
          }}
        >
          <TemplateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            setActiveTab={setActiveTab}
          />
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          marginLeft: activeStep !== steps.length ? "60px" : "0px",
          height: "100%",
        }}
      >
        {/* preview header */}
        {!isPreview && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderBottom: "1px solid gray",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {activeStep}
            </Typography>

            {/* Buttons */}
            <Box>
              <Button
                variant="outlined"
                onClick={handleBack}
                // disabled={activeStep === 0}
                disabled={
                  (currentIndex === 0 && !isPreview) || currentSection !== null
                } // Disable if at the first step
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  currentSection === null && handleNext();
                }}
                // disabled={activeStep === steps.length}
                disabled={isPreview || currentSection !== null}
                // sx={{ mr: 2 }}
              >
                {/* {activeStep === steps.length - 1 ? "Finish" : "Next"} */}
                {currentIndex === steps.length - 1 ? "Finish" : "Next"}
              </Button>

              {/* {activeStep === steps.length && (
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  color="secondary"
                >
                  Reset
                </Button>
              )} */}
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
          {!isPreview && (
            <>
              <Box style={{ width: "60%" }}>
                {/* Form for Editing */}
                <Box
                  sx={{
                    flex: 1,
                    // background: "#f7f7f7",
                    padding: "5px 10px",
                    borderRadius: 2,
                  }}
                >
                  {!isPreview && activeStep === "Personal Details" && (
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
                            placeholder="Enter first name"
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
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Last Name
                          </Typography>
                          <TextField
                            // label="Last Name"
                            placeholder="Enter last name"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.lastname}
                            sx={{
                              // marginLeft: "10px",
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
                          type="email"
                          placeholder="Enter email"
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
                          type="number"
                          placeholder="Enter phone number"
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={labelStyle}>
                            City
                          </Typography>
                          <TextField
                            // label="City"
                            placeholder="Enter city"
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
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Country
                          </Typography>
                          <TextField
                            // label="Country"
                            placeholder="Enter  country"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.country}
                            onChange={(e) =>
                              handleChange("country", e.target.value)
                            }
                            size="small"
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Pincode
                          </Typography>
                          <TextField
                            // label="Pincode"
                            type="number"
                            placeholder="Enter pincode"
                            fullWidth
                            margin="normal"
                            value={selectedTemplate.personaldetails.pincode}
                            onChange={(e) =>
                              handleChange("pincode", e.target.value)
                            }
                            size="small"
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  {!isPreview && activeStep === "Summary" && (
                    <Box>
                      <div className="d-flex">
                        <ReactQuill
                          theme="snow"
                          ref={editorRef}
                          modules={{
                            toolbar: [
                              ["bold", "italic", "underline"], // Text styling
                              [{ list: "ordered" }, { list: "bullet" }], // List options
                            ],
                          }}
                          placeholder="Enter professional summary"
                          style={{ height: "400px", width: "100%" }}
                          value={selectedTemplate.summary?.value || ""}
                          onChange={(e) => handleChange("summary", e)}
                        />
                      </div>
                    </Box>
                  )}
                  {/* Skills */}
                  {!isPreview && activeStep === "Skills" && (
                    <>
                      {typeof selectedTemplate.skills?.value === "object" ? (
                        // <textarea
                        //   value={selectedTemplate.skills.value}
                        //   onChange={(e) => handleChange("skills", e)}
                        // />
                        <>
                          <CreatableSelect
                            isMulti
                            isClearable
                            options={skillOptions} // Options for the dropdown
                            value={selectedSkillOptions} // Convert selected values to react-select format
                            onChange={handleSkillChange} // Handle selecting options
                            onCreateOption={handleCreate} // Handle creating a new option
                            placeholder="Type to search or add new skill"
                          />
                          {/* Chips for selected skills */}
                          <div
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                            }}
                          >
                            {selectedTemplate.skills.value.map(
                              (skill, index) => (
                                <Chip
                                  key={index}
                                  label={skill}
                                  onDelete={() => handleDeleteChip(skill)}
                                  style={{
                                    backgroundColor: "#e0f7fa",
                                    color: "#006064",
                                  }}
                                />
                              )
                            )}
                          </div>
                        </>
                      ) : (
                        <ReactQuill
                          theme="snow"
                          modules={{
                            toolbar: [
                              ["bold", "italic", "underline"], // Text styling
                              [{ list: "ordered" }, { list: "bullet" }], // List options
                            ],
                          }}
                          style={{ height: "400px", width: "100%" }}
                          placeholder="Enter skills"
                          value={selectedTemplate.skills?.value || ""}
                          onChange={(e) => handleChange("skills", e)}
                        />
                      )}
                    </>
                  )}
                  {/* Education */}
                  {!isPreview && activeStep === "Education" && (
                    <EducationComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                    />
                  )}
                  {/* Certificates */}
                  {!isPreview && activeStep === "Certificate" && (
                    <CertificateComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                    />
                  )}

                  {/* Experience */}
                  {!isPreview && activeStep === "Experience" && (
                    <ExperienceComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                    />
                  )}

                  {/* Projects */}
                  {!isPreview && activeStep === "Projects" && (
                    <ProjectComponent
                      selectedTemplate={selectedTemplate}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      tempEntry={tempEntry}
                      handleChangesss={handleChangesss}
                      handleSave={handleSave}
                      currentSection={currentSection}
                      editIndex={editIndex}
                      resetForm={resetForm}
                      CustomTextBoxStyle={CustomTextBoxStyle}
                      labelStyle={labelStyle}
                      isFormOpen={isFormOpen}
                    />
                  )}
                </Box>
              </Box>
              <Box
                id={"resume_container"}
                style={{
                  width: "35%",
                  height: "450px",
                  overflow: "auto",
                  // height: document?.documentElement?.scrollHeight - 300 + "px",
                  // Cursor: "grab",
                }}
              >
                <SelectedTemplate
                  selectedTemplate={selectedTemplate}
                  isPreview={true}
                />
              </Box>
            </>
          )}

          {/* Rendered Resume */}

          {isPreview && (
            <div className="container d-flex justify-content-between">
              {" "}
              {/* <Box className="col-3 text-center">
                <TemplateStyles
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              </Box> */}
              <Box
                // className="col-7"
                style={{ width: "60%" }}
              >
                <SelectedTemplate
                  selectedTemplate={selectedTemplate}
                  isPreview={false}
                />
              </Box>
              <Box
                // className="col-3"
                style={{
                  position: "fixed",
                  right: "50px",
                  top: "20px",
                  textAlign: "center",
                  width: "30%",
                }}
              >
                <Button
                  // variant="contained"
                  style={{
                    textAlign: "left",
                    color: "black",
                    border: "1px solid gray",
                    width: "100%",
                    padding: "10px",
                  }}
                  onClick={() => {
                    const element = document.getElementById("resume");
                    console.log(element);
                    const options = {
                      margin: 0.5,
                      filename: "table.pdf",
                      image: { type: "jpeg", quality: 0.98 },
                      html2canvas: { scale: 2 },
                      jsPDF: {
                        unit: "in",
                        format: "letter",
                        orientation: "portrait",
                      },
                    };

                    html2pdf()
                      .set(options)
                      .from(element)
                      .output("blob") // Ensure the output is a Blob
                      .then((pdfBlob) => {
                        console.log(pdfBlob);
                        console.log("save", selectedTemplate);

                        // Create a URL for the Blob and open it in a new tab
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        window.open(pdfUrl, "_blank");
                      })
                      .catch((error) =>
                        console.error("PDF generation failed:", error)
                      );
                  }}
                  startIcon={<DownloadForOfflineIcon />}
                >
                  <span>Download & Save</span>
                </Button>
                <div
                  className="mt-3"
                  style={{
                    padding: "10px",
                    border: "bisque",
                    color: "#5a5a73",
                    borderBottom: "2px dashed gray",
                    borderTop: "2px dashed gray",
                  }}
                >
                  {" "}
                  <b>Resume Sections</b>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr", // Two equal columns
                    gap: "10px", // Spacing between items
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  {steps.map((step, index) => (
                    <Button
                      key={index}
                      style={{
                        // display: index === 0 ? "none" : "block",
                        border: "1px solid gray",
                        textAlign: "center",
                        gridColumn:
                          steps.length % 2 !== 0 && index === steps.length - 1
                            ? "1 / -1"
                            : "auto",
                      }}
                      onClick={() => setActiveStep(step)}
                      startIcon={step.icon}
                    >
                      <span>{step}</span>
                    </Button>
                  ))}
                </div>
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TemplatePreview;
