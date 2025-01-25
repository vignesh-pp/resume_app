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
  currentSection,
  editIndex,
  resetForm,
  CustomTextBoxStyle,
  labelStyle,
  isFormOpen,
}) => {
  return (
    <Box>
      <>
        {selectedTemplate.projects.value.map((item, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent className="d-flex justify-content-between">
              <div>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2"> {item.duration}</Typography>
                {/* <Typography variant="body2"> {item.role}</Typography> */}
                <Typography variant="body2"> {item.location}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </div>
              <div>
                <Box>
                  <EditIcon
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "#3b82f6" },
                      color: "gray",
                    }}
                    onClick={() => handleEdit("projetcs", index)}
                  />
                  <DeleteIcon
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "#ef4444" },
                      color: "gray",
                    }}
                    onClick={() => handleDelete("projetcs", index)}
                  />
                </Box>
              </div>
            </CardContent>
          </Card>
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
          {currentSection === "projects" && (
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
          )}
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
