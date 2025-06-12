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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
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
  setSelectedTemplate,
  validateCertificateForm,
  errors,
  setErrors,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [deleteIndex, setDeleteIndex] = useState();
  const handleDeleteClick = (index,item, section) => {
    setSelectedToDelete(item?.name);
    setSectionName("certificate");
    setDeleteIndex(index)
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    handleDelete("certificate", deleteIndex);
    setOpenDeleteDialog(false);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (hoverIndex) => {
    if (hoverIndex === draggedIndex) return;

    setSelectedTemplate((prev) => {
      const items = [...prev.certificate.value];
      const draggedItem = items[draggedIndex];

      // Remove and reinsert the item
      items.splice(draggedIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);

      // Update the dragged index for further hover
      setDraggedIndex(hoverIndex);

      return {
        ...prev,
        certificate: {
          ...prev.certificate,
          value: items,
        },
      };
    });
  };

  return (
    <Box>
      <>
        {isFormOpen === null &&
          selectedTemplate.certificate.value.map((item, index) => (
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
                borderRadius:"4px",
                cursor: "grab",
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    {dayjs(item.year, "YYYY").isValid()
                      ? dayjs(item.year, "YYYY").format("MMM YYYY")
                      : item.year}
                  </div>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit("certificate", index);
                        setErrors({})
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
              onClick={() => handleAdd("certificate")}
              sx={{ mt: 2 }}
            >
              Add Certificate
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
          {currentSection === "certificate" && (
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
                  inputProps={{ maxLength: 200 }}
                  onChange={(e) => {
                    handleChangesss("name", e.target.value)
                  }}
                  onBlur={(e) => handleChangesss("name", e.target.value.trim())}
                  size="small"
                  sx={{
                    // marginLeft: "10px",
                    ...CustomTextBoxStyle,
                  }}
                />
                {errors?.name && (
                      <p
                      className="my-0"
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
                  Year
                </Typography>
                {/* <TextField
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
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month"]}
                    value={tempEntry.year ? dayjs(tempEntry.year) : null}
                    onChange={(date) => {
                      if (!date) return;
                      // const formattedDate = date.format("YYYY-MM");
                      setErrors({...errors,year:""})
                      handleChangesss("year", date);
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
                </LocalizationProvider>
              </>
            </>
          )}
             {errors?.year && (
              <p
              className="my-0"
              style={{
                color: "red",
                fontSize: "12px",
              }}
              >
                {errors?.year}
              </p>
            )}
          <Box mt={3}>
            <Button variant="contained" onClick={()=>{
              if(!validateCertificateForm()){
                handleSave()
              }
            }} sx={{ mr: 2 }}>
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

export default CertificateComponent;
