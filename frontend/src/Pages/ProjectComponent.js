import React, { useRef, useState } from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { modules, formats, QuillToolbar } from "../ResumeTemplates/QuillToolbar";
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
  setSelectedTemplate,
  validateProjectsForm,
  errors,
  setErrors,
}) => {
  const projectdescripref = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [deleteIndex, setDeleteIndex] = useState();
  const handleDeleteClick = (index,item, section) => {
    setSelectedToDelete(item?.name);
    setSectionName("projects");
    setDeleteIndex(index)
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    handleDelete("projects", deleteIndex)
    setOpenDeleteDialog(false);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (hoverIndex) => {
    if (hoverIndex === draggedIndex) return;

    setSelectedTemplate((prev) => {
      const items = [...prev.projects.value];
      const draggedItem = items[draggedIndex];

      // Remove and reinsert the item
      items.splice(draggedIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);

      // Update the dragged index for further hover
      setDraggedIndex(hoverIndex);

      return {
        ...prev,
        projects: {
          ...prev.projects,
          value: items,
        },
      };
    });
  };

  return (
    <Box>
      <>
        {isFormOpen === null &&
          selectedTemplate.projects.value.map((item, index) => (
            <div
              key={index}
              className="p-3 mt-3"
              style={{
                border: "1px solid lightgray",
                borderRadius:"4px",
                marginBottom: "10px",
                background: "#f9fafb",
                cursor: "grab",
              }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => handleDragEnter(index)}
            >
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "13px",width:'95%' }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.name}
                    {item.role && " • " + item.role}
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

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                    style={{ margin: "0px", textAlign: "justify" }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
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
                      onClick={() => {
                        handleDeleteClick(index,item)
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
              onClick={() => handleAdd("projects")}
              sx={{ mt: 2 }}
            >
              Add Project
            </Button>
            <Divider sx={{ my: 4 }} />
          </>
        )}
      </>

      {currentSection && isFormOpen === currentSection && (
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
                Client Name<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Title"
                placeholder="Enter client name"
                fullWidth
                margin="normal"
                value={tempEntry.client_name}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangesss("client_name", e.target.value)}
                onBlur={(e) => handleChangesss("client_name", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.client_name && (
                <p
                  className="my-0 mb-2"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.client_name}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Project Name<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Title"
                placeholder="Enter project name"
                fullWidth
                margin="normal"
                value={tempEntry.name}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangesss("name", e.target.value)}
                onBlur={(e) => handleChangesss("name", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.name && (
                <p
                  className="my-0 mb-2"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.name}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Role<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Link"
                placeholder="Enter role"
                fullWidth
                margin="normal"
                value={tempEntry.role}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangesss("role", e.target.value)}
                onBlur={(e) => handleChangesss("role", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.role && (
                <p
                  className="my-0 mb-2"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.role}
                </p>
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Technology/Tools<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                // label="Link"
                placeholder="Enter Technology/Tools"
                fullWidth
                margin="normal"
                value={tempEntry.technology}
                // inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangesss("technology", e.target.value)}
                onBlur={(e) => handleChangesss("technology", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.technology && (
                <p
                  className="my-0 mb-2"
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                {errors?.technology}
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
                onChange={(e) => handleChangesss("location", e.target.value)}
                onBlur={(e) => handleChangesss("location", e.target.value.trim())}
                size="small"
                sx={{
                  // marginLeft: "10px",
                  ...CustomTextBoxStyle,
                }}
              />
              {errors?.location && (
                <p
                  className="my-0 mb-2"
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
                  {errors?.startDate && (
                    <p
                      className="my-0 mb-2"
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
                        }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0px",
                        }}
                      >
                        <label>
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
                          }}
                        />
                        <span style={{ fontSize: "12px" }}>
                          Currently Working on Project
                        </span>
                        </label>
                      </div>
                      {errors?.endDate && (
                        <p
                          className="my-0 mb-2"
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
              <Typography
                variant="subtitle2"
                sx={{
                  // marginLeft: "10px",
                  ...labelStyle,
                }}
              >
                Description<span style={{ color: "red" }}>*</span>
              </Typography>
              <QuillToolbar/>
              <ReactQuill
                placeholder="Enter description"
                theme="snow"
                modules={modules}
                formats={formats}
                style={{ height: "100px" }}
                value={tempEntry.description || ""}
                onChange={(e) => {
                  handleChangesss("description", e)
                }}
              />
                  <Box mt={3}>
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
            </>
          )}
          <Box mt={0}>
            <Button variant="contained" onClick={()=>{
              if(!validateProjectsForm()){
                handleSave()
              }
            }} sx={{ mr: 2 }}>
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

export default ProjectComponent;
