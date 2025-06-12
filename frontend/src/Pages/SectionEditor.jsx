import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, QuillToolbar } from "../ResumeTemplates/QuillToolbar";
const SectionEditor = ({ sectionName, initialValue, handleSave, handleSelectSection,selectedTemplate,type ,text,setText,customHeading,setCustomHeading,errors,setErrors,validateCustom}) => {

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const CustomTextBoxStyle = {
    marginTop: "0px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "3px", // Rounded corners
      backgroundColor: "white", // Light background
      backgroundColor: "#f9fafb",
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
  return (
    <>
      <Box sx={{ padding: 0, width: "100%", }}>
        <Typography variant="h6" gutterBottom>
        {sectionName === "Add Own" 
        ? `${type === "add" ? "Create" : "Edit"} Personalized Section`
        : `${type.charAt(0).toUpperCase() + type.slice(1)} ${sectionName}`}
        </Typography>

        {sectionName === "Add Own" && (
          <>
             <TextField
              placeholder="Personalised Section Heading"
              fullWidth
              label="Personalised Section Heading"
              value={customHeading}
              onChange={(e) => {
                setCustomHeading(e.target.value);
                setErrors({errors,customHeading:""})
              }}
              // helperText={
              //   selectedTemplate?.steps?.some(
              //     (step) => step.toLowerCase() === customHeading.toLowerCase()
              //   )
              //     ? "This heading already exists"
              //     : ""
              // }
              // error={selectedTemplate?.steps?.some(
              //   (step) => step.toLowerCase() === customHeading.toLowerCase()
              // )}
              size="small"
              className="my-2 mb-2"
              sx={{
                // marginLeft: "10px",
                ...CustomTextBoxStyle,
              }}
            />
            {errors?.customHeading && (
              <p
                className="my-0 mb-1"
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
              {errors?.customHeading}
              </p>
            )}
            </>
        )}
              <QuillToolbar/>
        <ReactQuill
          placeholder={sectionName === "Add Own" ? "Provide details for your personalised section" : `Enter ${sectionName}`}
          theme="snow"
          modules={modules}
          formats={formats}
          // modules={{
          //   toolbar: [
          //     ["bold", "italic", "underline"],
          //     [{ list: "ordered" }, { list: "bullet" }],
          //   ],
          // }}
          style={{ marginBottom: "0px",height: "100px" }}
          value={text}
          onChange={(val)=>{
            setErrors({...errors,description:""})
            setText(val)
          }}
        />
        <Box sx={{mt:7}}>
         {errors?.description && (
              <p
                className="my-0 mb-2"
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
              {errors?.description}
              </p>
            )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 0 }}>
        <Button
          variant="contained"
          onClick={()=>{
            if(Object.keys(validateCustom()).length === 0){
              handleSave()
            }
          }}
          // disabled={((sectionName === "Add Own" && (customHeading.trim() === "" || selectedTemplate?.steps?.some(
          //   (step) => step.toLowerCase() === customHeading.toLowerCase()
          // )))) || (text.trim() === "" || text.trim() === "<p><br></p>")}
        >
          Save{''}
        </Button>
        <Button variant="outlined" onClick={() => handleSelectSection("list")}>
          Back
        </Button>
      </Box>
    </>
  );
};

export default SectionEditor;
