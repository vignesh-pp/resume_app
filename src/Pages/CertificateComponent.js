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

const CertificateComponent = ({
  selectedTemplate,
  handleEdit,
  handleDelete,
  handleAdd,
  tempEntry,
  handleChangesss,
  handleSave,
  currentSection = "certificate",
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
          selectedTemplate.certificate.value.map((item, index) => (
            <div
              key={index}
              className="p-3"
              style={{
                border: "1px solid lightgray",
                marginBottom: "10px",
                background: "#f5f5f5",
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "13px" }}>{item.year}</div>
                  {/* <Typography variant="body2">Link: {item.link}</Typography> */}
                  {/* <Typography variant="body2">
                organization: {item.organization}
              </Typography> */}
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
                      onClick={() => handleEdit("certificate", index)}
                    />
                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#ef4444" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={() => handleDelete("certificate", index)}
                    />
                  </Box>
                </div>
              </div>
            </div>
          ))}

        <>
          <Button
            variant="contained"
            onClick={() => handleAdd("certificate")}
            sx={{ mt: 2 }}
          >
            Add Certificate
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
          {currentSection === "certificate" && (
            // <>
            //   <Typography
            //     variant="subtitle2"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...labelStyle,
            //     }}
            //   >
            //     Institution
            //   </Typography>
            //   <TextField
            //     // label="Institution"
            //     fullWidth
            //     margin="normal"
            //     value={tempEntry.institution}
            //     onChange={(e) => handleChangesss("institution", e.target.value)}
            //     size="small"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...CustomTextBoxStyle,
            //     }}
            //   />
            //   <Typography
            //     variant="subtitle2"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...labelStyle,
            //     }}
            //   >
            //     Degree
            //   </Typography>
            //   <TextField
            //     // label="Degree"
            //     fullWidth
            //     margin="normal"
            //     value={tempEntry.degree}
            //     onChange={(e) => handleChangesss("degree", e.target.value)}
            //     size="small"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...CustomTextBoxStyle,
            //     }}
            //   />
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
            //     // label="Year"
            //     fullWidth
            //     margin="normal"
            //     value={tempEntry.year}
            //     onChange={(e) => handleChangesss("year", e.target.value)}
            //     size="small"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...CustomTextBoxStyle,
            //     }}
            //   />
            //   <Typography
            //     variant="subtitle2"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...labelStyle,
            //     }}
            //   >
            //     Marks
            //   </Typography>
            //   <TextField
            //     // label="Year"
            //     fullWidth
            //     margin="normal"
            //     value={tempEntry.marks}
            //     onChange={(e) => handleChangesss("marks", e.target.value)}
            //     size="small"
            //     sx={{
            //       // marginLeft: "10px",
            //       ...CustomTextBoxStyle,
            //     }}
            //   />
            // </>
            <>
              <>
                <Typography
                  variant="subtitle2"
                  sx={{
                    // marginLeft: "10px",
                    ...labelStyle,
                  }}
                >
                  Title
                </Typography>
                <TextField
                  // label="Title"
                  placeholder="Enter title"
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
                  Year
                </Typography>
                <TextField
                  // label="Link"
                  placeholder="Enter year"
                  fullWidth
                  margin="normal"
                  value={tempEntry.year}
                  onChange={(e) => handleChangesss("year", e.target.value)}
                  size="small"
                  sx={{
                    // marginLeft: "10px",
                    ...CustomTextBoxStyle,
                  }}
                />
              </>
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

export default CertificateComponent;
