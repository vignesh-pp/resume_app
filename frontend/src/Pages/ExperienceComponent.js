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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControlLabel, Checkbox } from "@mui/material";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { modules, formats, QuillToolbar } from "../ResumeTemplates/QuillToolbar";
const ExperienceComponent = ({
  selectedTemplate,
  handleEdit,
  handleDelete,
  handleAdd,
  tempEntry,
  handleChangesss,
  handleSave,
  currentSection = "experience",
  editIndex,
  resetForm,
  CustomTextBoxStyle,
  labelStyle,
  isFormOpen,
  setSelectedTemplate,
  validateExperienceForm,
  errors,
  setErrors,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [deleteIndex, setDeleteIndex] = useState();
  const handleDeleteClick = (index, item, section) => {
    setSelectedToDelete(item?.company);
    setSectionName("experience");
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    handleDelete("experience", deleteIndex);
    setOpenDeleteDialog(false);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (hoverIndex) => {
    if (hoverIndex === draggedIndex) return;

    setSelectedTemplate((prev) => {
      const items = [...prev.experience.value];
      const draggedItem = items[draggedIndex];

      // Remove and reinsert the item
      items.splice(draggedIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);

      // Update the dragged index for further hover
      setDraggedIndex(hoverIndex);

      return {
        ...prev,
        experience: {
          ...prev.experience,
          value: items,
        },
      };
    });
  };
  return (
    <Box>
      {isFormOpen === null &&
        selectedTemplate.experience.value.map((item, index) => (
          <div
            key={index}
            className="p-3 mt-3"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(index)}
            style={{
              border: "1px solid lightgray",
              marginBottom: "10px",
              background: "#f9fafb",
              borderRadius: "4px",
              cursor: "grab",
            }}
          >
            <div className="d-flex justify-content-between">
              <div style={{ fontSize: "13px" }}>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {item.company}
                </div>
                <div>
                  {item.position}
                  {item.location && " • " + item.location}
                  {item?.startDate && dayjs(item?.startDate).isValid()
                    ? item?.endDate === "Present" ||
                      !item?.endDate ||
                      dayjs(item?.endDate).isValid()
                      ? ` • (${dayjs(item?.startDate).format("MMM YYYY")} - ${
                          item?.endDate === "Present" || !item?.endDate
                            ? "Present"
                            : dayjs(item?.endDate).format("MMM YYYY")
                        })`
                      : ""
                    : ""}
                </div>
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: item.responsibilities,
                  }}
                  style={{ margin: "0px" }}
                ></div> */}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("experience", index);
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
                      e.stopPropagation();
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
            onClick={() =>{
                handleAdd("experience")
              }}
            sx={{ mt: 2 }}
          >
            Add Experience
          </Button>
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {currentSection && isFormOpen === currentSection && (
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
                Position<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Title"
                placeholder="Enter position"
                fullWidth
                margin="normal"
                value={tempEntry.position}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => {
                  setErrors({...errors,position:''})
                  handleChangesss("position", e.target.value)}}
                onBlur={(e) => handleChangesss("position", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.position && (
                <p
                  className="my-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.position}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Company<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Link"
                fullWidth
                margin="normal"
                placeholder="Enter company"
                value={tempEntry.company}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => {
                  setErrors({...errors,company:''})
                  handleChangesss("company", e.target.value)}}
                onBlur={(e) => handleChangesss("company", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.company && (
                <p
                  className="my-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.company}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Location<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Link"
                placeholder="Enter location"
                fullWidth
                margin="normal"
                value={tempEntry.location}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => {
                  setErrors({...errors,location:''})
                  handleChangesss("location", e.target.value)}}
                onBlur={(e) => handleChangesss("location", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.location && (
                <p
                  className="my-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.location}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Duration<span style={{ color: "red" }}>*</span>
              </Typography>
              {/* <TextField
                // label="Link"
                placeholder="Enter duration"
                // type="date"
                fullWidth
                margin="normal"
                value={tempEntry.duration}
                onChange={(e) => handleChangesss("duration", e.target.value)}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Start Date */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                    <DatePicker
                      views={["year", "month"]}
                      label="Start Date"
                      value={
                        tempEntry.startDate ? dayjs(tempEntry.startDate) : null
                      }
                      onChange={(date) => {
                        handleChangesss("startDate", date);
                        setErrors({...errors,startDate:''})
                      }}
                      openTo="month"
                      className="mt-2"
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
                    {errors?.startDate && (
                      <p
                        className="my-0 mt-2"
                        style={{
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                      {errors?.startDate}
                      </p>
                    )}
                    </Box>
                    {/* Checkbox for Currently Working Here */}
                    {/* End Date */}
                    <Box>
                      <DatePicker
                        views={["year", "month"]}
                        label="End Date"
                        value={
                          tempEntry?.endDate && tempEntry?.endDate !== "Present"
                            ? dayjs(tempEntry?.endDate)
                            : null
                        }
                        onChange={(date) => {
                          handleChangesss("endDate", date);
                          setErrors({...errors,endDate:''})
                        }}
                        className="mt-2"
                        openTo="month"
                        disabled={tempEntry.endDate === "Present"}
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
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <Checkbox
                          checked={tempEntry.endDate === "Present"}
                          size="small"
                          sx={{ transform: "scale(0.85)", paddingLeft: "0px" }}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            handleChangesss(
                              "endDate",
                              isChecked ? "Present" : null
                            );
                            setErrors({...errors,endDate:''})
                          }}
                        />
                        <span style={{ fontSize: "12px" }}>
                          Currently Working Here
                        </span>
                      </label>
                      {errors?.endDate && (
                          <p
                            className="my-0"
                            style={{
                              color: "red",
                              fontSize: "12px",
                            }}
                          >
                          {errors?.endDate}
                          </p>
                        )}
                    </Box>
                  </Box>
                </Box>
              </LocalizationProvider>
              {selectedTemplate?.experience?.has_responsibilities && 
              selectedTemplate?.template_name !=="Template1" &&
              <div>
                <Typography
                  variant="subtitle2"
                  sx={{
                    // marginLeft: "10px",
                    ...labelStyle,
                  }}
                >
                  Responsibilities<span style={{ color: "red" }}>*</span>
                </Typography>
                <QuillToolbar/>
                <ReactQuill
                  theme="snow"
                  // ref={editorRef}
                  placeholder="Enter responsibilities"
                  modules={modules}
                  formats={formats}
                  style={{ height: "100px" }}
                  value={tempEntry.responsibilities || ""}
                  onChange={(e) => handleChangesss("responsibilities", e)}
                />
              </div>}
            </>
          )}
          <Box
            mt={selectedTemplate?.experience?.has_responsibilities && selectedTemplate?.template_name !=="Template1" ? 3 : 0}
            mb={1}
          >
            {errors?.responsibilities && (
              <p
                className="my-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
                {errors?.responsibilities}
              </p>
            )}
          </Box>
          <Box mt={0}>
            {/* <Divider sx={{ my: 2 }} /> */}

            <Button
              variant="contained"
              onClick={() => {
                if(!validateExperienceForm()){
                  handleSave();
                }
              }}
              sx={{ mr: 2 }}
            >
              {editIndex !== null ? "Update" : "Add"}
            </Button>
            <Button color="error" variant="outlined" onClick={resetForm}>
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

export default ExperienceComponent;
