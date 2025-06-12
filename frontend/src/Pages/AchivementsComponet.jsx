import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, QuillToolbar } from "../ResumeTemplates/QuillToolbar";
const AchievementsComponent = ({ selectedTemplate, setSelectedTemplate,CustomTextBoxStyle }) => {
  const [tempEntry, setTempEntry] = useState({ name: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChange = (field, value) => {
    setTempEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    setTempEntry({ name: "", description: "" });
    setEditIndex(null);
    setIsFormOpen(true);
  };

  const handleEdit = (index) => {
    setTempEntry({ ...selectedTemplate.achievements.value[index] });
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index) => {
    const updatedValue = selectedTemplate.achievements.value.filter((_, i) => i !== index);
    setSelectedTemplate((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        value: updatedValue,
      },
    }));
  };

  const handleSave = () => {
    const updatedValue = [...(selectedTemplate.achievements.value || [])];
    if (editIndex !== null) {
      updatedValue[editIndex] = tempEntry;
    } else {
      updatedValue.push(tempEntry);
    }

    setSelectedTemplate((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        value: updatedValue,
      },
    }));

    resetForm();
  };

  const resetForm = () => {
    setTempEntry({ name: "", description: "" });
    setEditIndex(null);
    setIsFormOpen(false);
  };

  return (
    <Box>
      {/* List View */}
      {!isFormOpen &&
        selectedTemplate?.achievements?.value?.map((item, index) => (
          <Box
            key={index}
            className="p-3 mt-3"
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "#f9f9f9",
              mb: 2,
            }}
          >
            <Box className="d-flex justify-content-between">
              <Box>
                <Typography color="#666" fontWeight="bold" fontSize={"14px"}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"14px"}>
                  {item.description}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}

      {/* Add Button */}
      {!isFormOpen && (
        <Button variant="contained" onClick={handleAdd}>
          Add Achievement
        </Button>
      )}

      {/* Form View */}
      {isFormOpen && (
        <Box sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null ? "Edit Achievement" : "Add Achievement"}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0, mb: 1 }}>
          Achievement Name
         </Typography>
          <TextField
            fullWidth
            placeholder="Achievement Name"
            value={tempEntry.name}
            onChange={(e) => handleChange("name", e.target.value)}
            margin="normal"
            size="small"
            sx={CustomTextBoxStyle}
          />
          <Typography variant="subtitle2" sx={{ mt: 0, mb: 1 }}>
                Description
            </Typography>
            <QuillToolbar/>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={tempEntry.description}
                onChange={(value) => handleChange("description", value)}
                style={{
                backgroundColor: "white",
                marginBottom: "1rem",
                height:"100px"
                }}
            />

          <Box mt={7}>
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              {editIndex !== null ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" color="error" onClick={resetForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AchievementsComponent;
