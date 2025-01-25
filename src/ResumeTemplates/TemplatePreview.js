import React, { useRef, useState } from "react";
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
// import { jsPDF } from "jspdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EducationComponent from "../Pages/EducationComponent";
import ExperienceComponent from "../Pages/ExperienceComponent";
import CertificateComponent from "../Pages/CertificateComponent";
import ProjectComponent from "../Pages/ProjectComponent";

function TemplatePreview(props) {
  const { selectedTemplate, setSelectedTemplate, setActiveTab } = props;
  const [activeStep, setActiveStep] = useState(1);
  const steps = selectedTemplate.steps;
  const [content, setContent] = useState("");
  const [currentSection, setCurrentSection] = useState(null); // 'education' or 'experience'
  const [editIndex, setEditIndex] = useState(null);
  const [tempEntry, setTempEntry] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(null); // Tracks the open form for 'education' or 'experience'

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
      backgroundColor: "white", // Light background
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
    },
    "& .MuiInputLabel-root": {
      // color: "#757575", // Label color
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

      {activeStep !== steps.length && (
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
                              // marginLeft: "10px",
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

                  {activeStep === 2 && (
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
                          style={{ height: "400px" }}
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
                            height: "400px",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                          }}
                        /> */}
                      </div>
                    </Box>
                  )}
                  {/* Skills */}
                  {activeStep === 3 && (
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
                            placeholder="Type to search or add..."
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
                          style={{ height: "400px" }}
                          value={selectedTemplate.skills?.value || ""}
                          onChange={(e) => handleChange("skills", e)}
                        />
                      )}
                    </>
                  )}
                  {/* Education */}
                  {activeStep === 4 && (
                    <>
                      {/* {selectedTemplate.education?.value?.map((edu, index) => (
                        <Box key={index} mt={2}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Institution
                          </Typography>
                          <TextField
                            // label="Institution"
                            fullWidth
                            margin="normal"
                            value={edu.institution}
                            onChange={(e) =>
                              handleNestedChange(
                                "education",
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                            size="small"
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Degree
                          </Typography>
                          <TextField
                            // label="Degree"
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
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // marginLeft: "10px",
                              ...labelStyle,
                            }}
                          >
                            Year
                          </Typography>
                          <TextField
                            // label="Year"
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
                            sx={{
                              // marginLeft: "10px",
                              ...CustomTextBoxStyle,
                            }}
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
                            institution: "",
                            degree: "",
                            year: "",
                            duration: "",
                            location: "",
                            marks: "",
                          })
                        }
                      >
                        Add Education
                      </Button> */}

                      {/* Education Section */}
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
                    </>
                  )}
                  {/* Certificates */}
                  {activeStep === 5 && (
                    // <>
                    //   {selectedTemplate.certificate?.value?.map(
                    //     (edu, index) => (
                    // <Box key={index} mt={2}>
                    //   <Typography
                    //     variant="subtitle2"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...labelStyle,
                    //     }}
                    //   >
                    //     Title
                    //   </Typography>
                    //   <TextField
                    //     // label="Title"
                    //     fullWidth
                    //     margin="normal"
                    //     value={edu.name}
                    //     onChange={(e) =>
                    //       handleNestedChange(
                    //         "certificate",
                    //         index,
                    //         "name",
                    //         e.target.value
                    //       )
                    //     }
                    //     size="small"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...CustomTextBoxStyle,
                    //     }}
                    //   />
                    //   {/* <Typography
                    //     variant="subtitle2"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...labelStyle,
                    //     }}
                    //   >
                    //     Link
                    //   </Typography>
                    //   <TextField
                    //     // label="Link"
                    //     fullWidth
                    //     margin="normal"
                    //     value={edu.link}
                    //     onChange={(e) =>
                    //       handleNestedChange(
                    //         "certificate",
                    //         index,
                    //         "link",
                    //         e.target.value
                    //       )
                    //     }
                    //     size="small"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...CustomTextBoxStyle,
                    //     }}
                    //   /> */}
                    //   <Typography
                    //     variant="subtitle2"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...labelStyle,
                    //     }}
                    //   >
                    //     Year
                    //   </Typography>
                    //   <TextField
                    //     // label="Link"
                    //     fullWidth
                    //     margin="normal"
                    //     value={edu.year}
                    //     onChange={(e) =>
                    //       handleNestedChange(
                    //         "certificate",
                    //         index,
                    //         "year",
                    //         e.target.value
                    //       )
                    //     }
                    //     size="small"
                    //     sx={{
                    //       // marginLeft: "10px",
                    //       ...CustomTextBoxStyle,
                    //     }}
                    //   />

                    //   <Button
                    //     color="error"
                    //     onClick={() =>
                    //       handleDeleteItem("certificate", index)
                    //     }
                    //     sx={{ mt: 1 }}
                    //   >
                    //     Delete Certificate
                    //   </Button>
                    //   <Divider sx={{ my: 2 }} />
                    // </Box>

                    //     )
                    //   )}
                    //   <Button
                    //     variant="outlined"
                    //     startIcon={<Add />}
                    //     onClick={() =>
                    //       handleAddItem("certificate", {
                    //         title: "",
                    //         link: "",
                    //         year: "",
                    //       })
                    //     }
                    //   >
                    //     Add Certificate
                    //   </Button>
                    // </>
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
                  {activeStep === 6 && (
                    // <>
                    //   {selectedTemplate.experience?.value?.map((edu, index) => (
                    //     <Box key={index} mt={2}>
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Position
                    //       </Typography>
                    //       <TextField
                    //         // label="Title"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.position}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "experience",
                    //             index,
                    //             "position",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Company
                    //       </Typography>
                    //       <TextField
                    //         // label="Link"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.company}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "experience",
                    //             index,
                    //             "company",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Location
                    //       </Typography>
                    //       <TextField
                    //         // label="Link"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.location}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "experience",
                    //             index,
                    //             "location",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Duration
                    //       </Typography>
                    //       <TextField
                    //         // label="Link"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.duration}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "experience",
                    //             index,
                    //             "duration",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Responsibilities
                    //       </Typography>

                    //       <ReactQuill
                    //         theme="snow"
                    //         // ref={editorRef}
                    //         modules={{
                    //           toolbar: [
                    //             ["bold", "italic", "underline"], // Text styling
                    //             [{ list: "ordered" }, { list: "bullet" }], // List options
                    //           ],
                    //         }}
                    //         style={{ height: "100px" }}
                    //         value={edu.responsibilities || ""}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "experience",
                    //             index,
                    //             "responsibilities",
                    //             e
                    //           )
                    //         }
                    //       />

                    //       <Button
                    //         color="error"
                    //         onClick={() =>
                    //           handleDeleteItem("experience", index)
                    //         }
                    //         sx={{ mt: 1 }}
                    //       >
                    //         Delete Experience
                    //       </Button>
                    //       <Divider sx={{ my: 2 }} />
                    //     </Box>
                    //   ))}
                    //   <Button
                    //     variant="outlined"
                    //     startIcon={<Add />}
                    //     onClick={() =>
                    //       handleAddItem("experience", {
                    //         position: "",
                    //         company: "",
                    //         location: "",
                    //         duration: "",
                    //         responsibilities: "",
                    //       })
                    //     }
                    //   >
                    //     Add Experience
                    //   </Button>
                    // </>
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
                    />
                  )}

                  {/* Projects */}
                  {activeStep === 7 && (
                    // <>
                    //   {selectedTemplate.projects?.value?.map((edu, index) => (
                    //     <Box key={index} mt={2}>
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Project Name
                    //       </Typography>
                    //       <TextField
                    //         // label="Title"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.name}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "projects",
                    //             index,
                    //             "name",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Role
                    //       </Typography>
                    //       <TextField
                    //         // label="Link"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.role}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "projects",
                    //             index,
                    //             "role",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Duration
                    //       </Typography>
                    //       <TextField
                    //         // label="Link"
                    //         fullWidth
                    //         margin="normal"
                    //         value={edu.duration}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "projects",
                    //             index,
                    //             "duration",
                    //             e.target.value
                    //           )
                    //         }
                    //         size="small"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...CustomTextBoxStyle,
                    //         }}
                    //       />
                    //       <Typography
                    //         variant="subtitle2"
                    //         sx={{
                    //           // marginLeft: "10px",
                    //           ...labelStyle,
                    //         }}
                    //       >
                    //         Description
                    //       </Typography>
                    //       <ReactQuill
                    //         theme="snow"
                    //         modules={{
                    //           toolbar: [
                    //             ["bold", "italic", "underline"], // Text styling
                    //             [{ list: "ordered" }, { list: "bullet" }], // List options
                    //           ],
                    //         }}
                    //         style={{ height: "100px" }}
                    //         value={edu.description || ""}
                    //         onChange={(e) =>
                    //           handleNestedChange(
                    //             "projects",
                    //             index,
                    //             "description",
                    //             e
                    //           )
                    //         }
                    //       />

                    //       <Button
                    //         color="error"
                    //         onClick={() => handleDeleteItem("projects", index)}
                    //         sx={{ mt: 1 }}
                    //       >
                    //         Delete Projects
                    //       </Button>
                    //       <Divider sx={{ my: 2 }} />
                    //     </Box>
                    //   ))}
                    //   <Button
                    //     variant="outlined"
                    //     startIcon={<Add />}
                    //     onClick={() =>
                    //       handleAddItem("projects", {
                    //         name: "",
                    //         role: "",
                    //         description: "",
                    //         location: "",
                    //         duration: "",
                    //       })
                    //     }
                    //   >
                    //     Add Projects
                    //   </Button>
                    // </>
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

          {activeStep === steps.length && (
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
                    console.log("save", selectedTemplate);
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
                        display: index === 0 ? "none" : "block",
                        border: "1px solid gray",
                        textAlign: "center",
                        gridColumn:
                          steps.length % 2 !== 0 && index === steps.length - 1
                            ? "1 / -1"
                            : "auto",
                      }}
                      onClick={() => setActiveStep(index)}
                      startIcon={step.icon}
                    >
                      <span>{step.label}</span>
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
