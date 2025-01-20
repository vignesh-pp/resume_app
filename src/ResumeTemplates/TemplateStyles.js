import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

const TemplateStyles = (props) => {
  const { selectedTemplate, setSelectedTemplate, setActiveTab } = props;
  const [styleTab, setStyleTab] = useState(false);
  // State for Font Formatting
  const [fontStyle, setFontStyle] = useState("Verdana");
  const [fontSize, setFontSize] = useState(10);
  const [headingSize, setHeadingSize] = useState(14);

  // State for Document Formatting
  const [sectionSpacing, setSectionSpacing] = useState(10);
  const [paragraphSpacing, setParagraphSpacing] = useState(10);
  const [lineSpacing, setLineSpacing] = useState(1.5);

  const handleStyleChange = (key, value) => {
    setSelectedTemplate((prevStyles) => {
      const updatedTemplate = { ...prevStyles };
      updatedTemplate.styles[key] = value;
      return updatedTemplate;
    });

    console.log(selectedTemplate);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2a2d3e",
        color: "white",
        padding: 2,
        borderRadius: 2,
        fontSize: "12px",
      }}
      className="resume_styles"
    >
      {/* Tabs Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* Design Tab */}
        <Typography
          variant="button"
          sx={{
            flex: 1,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: !styleTab ? "#1e2030" : "#ffaa00",
            color: !styleTab ? "white" : "black",
            padding: 1,
            borderRadius: "4px 0 0 4px",
            textTransform: "none",
          }}
          onClick={() => setStyleTab(!styleTab)}
        >
          Design
        </Typography>

        {/* Formatting Tab */}
        <Typography
          variant="button"
          sx={{
            flex: 1,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: !styleTab ? "#ffaa00" : "#1e2030",
            color: !styleTab ? "black" : "white",
            padding: 1,
            borderRadius: "0 4px 4px 0",
            textTransform: "none",
          }}
          onClick={() => setStyleTab(!styleTab)}
        >
          Formatting
        </Typography>
      </Box>

      {/* Font Formatting Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Font Formatting
      </Typography>
      <Typography>Font Style</Typography>
      <Select
        value={selectedTemplate.styles.fontFamily}
        onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
        fullWidth
        sx={{ mb: 2, backgroundColor: "white", color: "black" }}
      >
        <MenuItem value="Verdana">Verdana</MenuItem>
        <MenuItem value="Arial">Arial</MenuItem>
        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
      </Select>

      <Typography>Font Size</Typography>
      <Slider
        value={selectedTemplate.styles.textSize}
        min={4}
        max={16}
        valueLabelDisplay="auto"
        onChange={(e) => handleStyleChange("textSize", e.target.value)}
        sx={{ color: "#ffaa00", mb: 2 }}
      />

      <Typography>Heading Size</Typography>
      <Slider
        value={selectedTemplate.styles.headingSize}
        min={4}
        max={24}
        valueLabelDisplay="auto"
        onChange={(e) => handleStyleChange("headingSize", e.target.value)}
        sx={{ color: "#ffaa00", mb: 2 }}
      />

      <Divider sx={{ my: 2, borderColor: "white" }} />

      {/* Document Formatting Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Document Formatting
      </Typography>
      <Typography>Section Spacing</Typography>
      <Slider
        value={selectedTemplate.styles.sectionSpacing}
        min={0}
        max={50}
        valueLabelDisplay="auto"
        onChange={(e) => handleStyleChange("sectionSpacing", e.target.value)}
        sx={{ color: "#ffaa00", mb: 2 }}
      />

      <Typography>Paragraph Spacing</Typography>
      <Slider
        value={selectedTemplate.styles.paragraphIndent}
        min={0}
        max={50}
        valueLabelDisplay="auto"
        onChange={(e) => handleStyleChange("paragraphIndent", e.target.value)}
        sx={{ color: "#ffaa00", mb: 2 }}
      />

      <Typography>Line Spacing</Typography>
      <Slider
        value={selectedTemplate.styles.lineSpacing}
        min={1}
        max={3}
        step={0.1}
        valueLabelDisplay="auto"
        onChange={(e) => handleStyleChange("lineSpacing", e.target.value)}
        sx={{ color: "#ffaa00", mb: 2 }}
      />
    </Box>
  );
};

export default TemplateStyles;
