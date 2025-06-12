import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
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
  setSelectedTemplate,
  validateEducationForm,
  errors,
  setErrors,
}) => {
  const [stillEnrolled, setStillEnrolled] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [deleteIndex, setDeleteIndex] = useState();
  const handleDeleteClick = (index, item, section) => {
    setSelectedToDelete(item?.degree);
    setSectionName("education");
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    handleDelete("education", deleteIndex);
    setOpenDeleteDialog(false);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (hoverIndex) => {
    if (hoverIndex === draggedIndex) return;

    setSelectedTemplate((prev) => {
      const items = [...prev.education.value];
      const draggedItem = items[draggedIndex];

      // Remove and reinsert the item
      items.splice(draggedIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);

      // Update the dragged index for further hover
      setDraggedIndex(hoverIndex);

      return {
        ...prev,
        education: {
          ...prev.education,
          value: items,
        },
      };
    });
  };
  return (
    <Box>
      <>
        {isFormOpen === null &&
          selectedTemplate?.education?.value.map((item, index) => (
            <div
              key={index}
              className="p-3 mt-3"
              style={{
                border: "1px solid lightgray",
                marginBottom: "10px",
                cursor: "pointer",
                background: "#f9fafb",
                borderRadius: "4px",
                cursor: "grab",
              }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => handleDragEnter(index)}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.institution}
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    {item.degree}{" "}
                    {selectedTemplate?.has_duration &&
                      item.year &&
                      " • " + item.year}
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
                      onClick={(e) => {
                        setErrors({})
                        e.stopPropagation(); // Prevent triggering handleEdit on container click
                        handleEdit("education", index);
                      }}
                    />
                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#ef4444" },
                        color: "gray",
                        fontSize: "16px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering handleEdit on container click
                        handleDeleteClick(index, item);
                      }}
                    />
                  </Box>
                </div>
              </div>
            </div>
          ))}

        {isFormOpen === null && (
          <>
            <Button
              variant="contained"
              onClick={() => {
                setErrors({})
                handleAdd("education")}}
              sx={{ mt: 2 }}
            >
              Add Education
            </Button>
            <Divider sx={{ my: 1 }} />
          </>
        )}
      </>

      {/* Show Form when isFormOpen is not null */}
      {currentSection && isFormOpen === currentSection && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null
              ? `Edit ${currentSection}`
              : `Add New ${currentSection}`}
          </Typography>

          {/* Form fields for adding/editing Education */}
          {currentSection === "education" && (
            <>
              <Typography variant="subtitle2" sx={labelStyle}>
                Institution<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter institution"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 200 }}
                value={tempEntry.institution}
                onChange={(e) => handleChangesss("institution", e.target.value)}
                onBlur={(e) =>
                  handleChangesss("institution", e.target.value.trim())
                }
                size="small"
                sx={CustomTextBoxStyle}
              />

              {errors?.institution && (
                <p
                  className="my-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.institution}
                </p>
              )}
              <Typography variant="subtitle2" sx={labelStyle}>
                Degree<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter degree"
                fullWidth
                margin="normal"
                value={tempEntry.degree}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangesss("degree", e.target.value)}
                onBlur={(e) => handleChangesss("degree", e.target.value.trim())}
                size="small"
                sx={CustomTextBoxStyle}
              />
              {errors?.degree && (
                     <p
                  className="my-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  {errors?.degree}
                </p>
              )}
              <Box className="d-flex justify-content-between">
                <div>
                  {selectedTemplate?.education?.has_duration && (
                    <>
                      <Typography variant="subtitle2" sx={labelStyle}>
                        Graduation Date<span style={{ color: "red" }}>*</span>
                      </Typography>
                      {/* <TextField
                    // type="date"
                    fullWidth
                    margin="normal"
                    value={tempEntry.year}
                    onChange={(e) => handleChangesss("year", e.target.value)}
                    size="small"
                    sx={CustomTextBoxStyle}
                  /> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year", "month"]}
                          value={tempEntry.year ? dayjs(tempEntry.year) : null}
                          onChange={(date) => {
                            if (!date) return;
                            const formattedDate = date.format("YYYY-MM");
                            handleChangesss("year", formattedDate);
                            setStillEnrolled(
                              dayjs(formattedDate).isAfter(dayjs())
                            );
                            setErrors({...errors,year:""})
                          }}
                          openTo="month"
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              size: "small",
                              sx: {
                                ...CustomTextBoxStyle, // Spread the existing styles correctly
                                width: "255px", // Ensure width is applied
                                "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                                  fontSize: "18px", //  Correctly targets the calendar icon
                                },
                              },
                            },
                          }}
                        />

                        {stillEnrolled && (
                          <FormControlLabel
                            className="ms-2"
                            control={
                              <Checkbox
                                sx={{ transform: "scale(0.85)" }}
                                checked={stillEnrolled}
                                disabled
                                size="small"
                              />
                            }
                            sx={{
                              ".MuiTypography-root": {
                                fontSize: "12px",
                              },
                            }}
                            label="I'm still enrolled"
                          />
                        )}
                      </LocalizationProvider>
                    </>
                  )}
                {errors?.year && (
                     <p
                  className="my-0 mt-2"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  {errors?.year}
                </p>
              )}
                </div>
                <div>
                  {selectedTemplate?.education?.has_mark && (
                    <>
                      <Typography variant="subtitle2" sx={labelStyle}>
                        Marks<span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        placeholder="Enter marks"
                        fullWidth
                        margin="normal"
                        value={tempEntry.marks}
                        type="number"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = Number(value);

                          if (
                            value === "" ||
                            (!isNaN(numericValue) &&
                              numericValue >= 0 &&
                              numericValue <= 100)
                          ) {
                            setErrors({...errors,marks:""})
                            handleChangesss("marks", value);
                          }
                        }}
                        size="small"
                        sx={{ ...CustomTextBoxStyle, width: "255px" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                      />
                          {errors?.marks && (
                          <p
                          className="my-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                          }}
                          >
                            {errors?.marks}
                          </p>
                        )}
                    </>
                  )}
                </div>
              </Box>
            </>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={() => {
                if (!validateEducationForm(editIndex)) {
                  handleSave();
                }
              }}
              sx={{ mr: 2 }}
            >
              {editIndex !== null ? "Update" : "Add"}
            </Button>
            <Button color="error" variant="outlined" onClick={()=>{
              setErrors({})
              resetForm()
            }}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        sectionName={sectionName}
        selectedItem={selectedToDelete}
      />
    </Box>
  );
};

export default EducationComponent;
