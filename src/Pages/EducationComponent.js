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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EducationComponent = ({
  selectedTemplate,
  handleEdit,
  handleDelete,
  handleAdd,
  tempEntry,
  handleChangesss,
  handleSave,
  currentSection = "education",
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
          selectedTemplate?.education?.value.map((item, index) => (
            <div
              key={index}
              className="p-3"
              style={{
                border: "1px solid lightgray",
                marginBottom: "10px",
                cursor: "pointer",
                background:'#f5f5f5'
              }}
              onClick={() => handleEdit("education", index)}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.institution}
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    {item.degree}
                    {item.year && " • " + item.year}
                  </div>
                  {/* <Typography variant="body2"> {item.year}</Typography> */}
                  {/* <Typography variant="body2">{item.duration}</Typography>
                  <Typography variant="body2">{item.location}</Typography>
                  <Typography variant="body2"> {item.marks}</Typography> */}
                </div>
                <div>
                  <Box style={{ fontSize: "14px" }}>
                    <EditIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#3b82f6" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={() => handleEdit("education", index)}
                    />
                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#ef4444" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={() => handleDelete("education", index)}
                    />
                  </Box>
                </div>
              </div>
            </div>
          ))}

        <>
          <Button
            variant="contained"
            onClick={() => handleAdd("education")}
            sx={{ mt: 2 }}
          >
            Add Education
          </Button>
          <Divider sx={{ my: 1 }} />
        </>
      </>

      {currentSection && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null
              ? `Edit ${currentSection}`
              : `Add New ${currentSection}`}
          </Typography>
          {currentSection === "education" && isFormOpen === "education" && (
            <>
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
                placeholder="Enter institution"
                fullWidth
                margin="normal"
                value={tempEntry.institution}
                onChange={(e) => handleChangesss("institution", e.target.value)}
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
                placeholder="Enter degree"
                fullWidth
                margin="normal"
                value={tempEntry.degree}
                onChange={(e) => handleChangesss("degree", e.target.value)}
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
                placeholder="Enter year"
                fullWidth
                margin="normal"
                type="date"
                value={tempEntry.year}
                onChange={(e) => handleChangesss("year", e.target.value)}
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
                Marks
              </Typography>
              <TextField
                // label="Year"
                placeholder="Enter mark"
                fullWidth
                margin="normal"
                value={tempEntry.marks}
                onChange={(e) => handleChangesss("marks", e.target.value)}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
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

export default EducationComponent;
