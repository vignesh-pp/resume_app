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

const ExperienceComponent = ({
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
}) => {
  return (
    <Box>
      {selectedTemplate.experience.value.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent className="d-flex justify-content-between">
            <div>
              <Typography variant="h6">{item.position}</Typography>
              <Typography variant="body2"> {item.company}</Typography>
              <Typography variant="body2"> {item.location}</Typography>
              <Typography variant="body2"> {item.duration}</Typography>
              {/* <Typography variant="body2">
               {item.responsibilities}
            </Typography> */}
            </div>
            <div>
              <Box>
                <EditIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "#3b82f6" },
                    color: "gray",
                  }}
                  onClick={() => handleEdit("experience", index)}
                />
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "#ef4444" },
                    color: "gray",
                  }}
                  onClick={() => handleDelete("experience", index)}
                />
              </Box>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="contained"
        onClick={() => handleAdd("experience")}
        sx={{ mt: 2 }}
      >
        Add Experience
      </Button>
      <Divider sx={{ my: 4 }} />

      {currentSection && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null
              ? `Edit ${currentSection}`
              : `Add New ${currentSection}`}
          </Typography>
          {currentSection === "experience" && (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Position
              </Typography>
              <TextField
                // label="Title"
                fullWidth
                margin="normal"
                value={tempEntry.position}
                onChange={(e) => handleChangesss("position", e.target.value)}
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
                Company
              </Typography>
              <TextField
                // label="Link"
                fullWidth
                margin="normal"
                value={tempEntry.company}
                onChange={(e) => handleChangesss("company", e.target.value)}
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
                Location
              </Typography>
              <TextField
                // label="Link"
                fullWidth
                margin="normal"
                value={tempEntry.location}
                onChange={(e) => handleChangesss("location", e.target.value)}
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
                Responsibilities
              </Typography>

              <ReactQuill
                theme="snow"
                // ref={editorRef}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"], // Text styling
                    [{ list: "ordered" }, { list: "bullet" }], // List options
                  ],
                }}
                style={{ height: "100px" }}
                value={tempEntry.responsibilities || ""}
                onChange={(e) => handleChangesss("responsibilities", e)}
              />

              <Divider sx={{ my: 2 }} />
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

export default ExperienceComponent;
