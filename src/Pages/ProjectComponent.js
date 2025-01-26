import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectComponent = ({
  selectedTemplate,
  handleEdit,
  handleDelete,
  handleAdd,
  tempEntry,
  handleChangesss,
  handleSave,
  currentSection = "projects",
  editIndex,
  resetForm,
  CustomTextBoxStyle,
  labelStyle,
  isFormOpen,
}) => {
  return (
    <Box>
      <>
        {isFormOpen === null &&
          selectedTemplate.projects.value.map((item, index) => (
            <div
              key={index}
              className="p-3"
              style={{ border: "1px solid lightgray", marginBottom: "10px",                background:'#f5f5f5'
              }}
            >
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "13px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.name}
                    {item.role && " • " + item.role}
                    {item.location && " • " + item.location}
                    {item.duration && " • " + item.duration}
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                    style={{ margin: "0px" }}
                  ></div>
                </div>
                <div>
                  <Box>
                    <EditIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#3b82f6" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={() => handleEdit("projects", index)}
                    />
                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#ef4444" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={() => handleDelete("projects", index)}
                    />
                  </Box>
                </div>
              </div>
            </div>
          ))}

        <>
          <Button
            variant="contained"
            onClick={() => handleAdd("projects")}
            sx={{ mt: 2 }}
          >
            Add Project
          </Button>
          <Divider sx={{ my: 4 }} />
        </>
      </>

      {currentSection && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null
              ? `Edit ${currentSection}`
              : `Add New ${currentSection}`}
          </Typography>
          {/* {currentSection === "projects" && ( */}
          <>
            <Typography
              variant="subtitle2"
              sx={{
                // marginLeft: "10px",
                ...labelStyle,
              }}
            >
              Project Name
            </Typography>
            <TextField
              // label="Title"
              placeholder="Enter project name"
              fullWidth
              margin="normal"
              value={tempEntry.name}
              onChange={(e) => handleChangesss("name", e.target.value)}
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
              Role
            </Typography>
            <TextField
              // label="Link"
              placeholder="Enter role"
              fullWidth
              margin="normal"
              value={tempEntry.role}
              onChange={(e) => handleChangesss("role", e.target.value)}
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
              Duration
            </Typography>
            <TextField
              // label="Link"
              placeholder="Enter duration"
              type="date"
              fullWidth
              margin="normal"
              value={tempEntry.duration}
              onChange={(e) => handleChangesss("duration", e.target.value)}
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
              Description
            </Typography>
            <ReactQuill
              placeholder="Enter description"
              theme="snow"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"], // Text styling
                  [{ list: "ordered" }, { list: "bullet" }], // List options
                ],
              }}
              style={{ height: "100px" }}
              value={tempEntry.description || ""}
              onChange={(e) => handleChangesss("description", e)}
            />
          </>
          {/* )} */}
          <Box mt={2}>
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              {editIndex !== null ? "Update" : "Add"}
            </Button>
            <Button color="error" variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProjectComponent;
