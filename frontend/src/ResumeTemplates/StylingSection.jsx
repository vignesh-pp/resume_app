import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  ArrowBack,
} from "@mui/icons-material";

const themeColors = ["#0d6efd", "#6610f2", "#198754", "#dc3545", "#fd7e14"];

const StylingSection = ({
  setActiveStep,
  fontFamily,
  setFontFamily,
  selectedSection,
  setSelectedSection,
  textType,
  setTextType,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  fontWeight,
  setFontWeight,
  fontStyle,
  setFontStyle,
  textDecoration,
  setTextDecoration,
  textAlign,
  setTextAlign,
  fontColor,
  setFontColor,
  steps,
}) => {
  const [letterSpacing, setLetterSpacing] = useState("0px");
  const [wordSpacing, setWordSpacing] = useState("0px");
  const [textTransform, setTextTransform] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      "& fieldset": {
        borderColor: "#ddd",
      },
      "&:hover fieldset": {
        borderColor: "#aaa",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#007bff",
        borderWidth: 2,
      },
    },
    mb: 1.5,
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: "8%",
        width: "22%",
        height: "85vh",
        backgroundColor: "#fff",
        padding: "24px",
        pt: 0,
        fontSize: "14px",
        // border: "1px solid #ddd",
        margin: "20px",
        borderRadius: "6px",
        overflowY:"auto"
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={1.2} pt={2} gap={1} sx={{position:"sticky",top:0,backgroundColor:"#fff",zIndex:"200"}}>
        <IconButton
          onClick={() => setActiveStep(steps[steps.length - 1])}
          sx={{ backgroundColor: "#e8e8e8", width: "33px", height: "33px" }}
        >
          <ArrowBack sx={{ color: "#333", fontSize: "1.2rem" }} />
        </IconButton>
        <Typography fontWeight={600} fontSize="1.2rem">
          Style Configuration
        </Typography>
      </Box>

      {/* Theme Color Circles */}
      <Box>
      {/* Font Settings */}
      <Typography variant="subtitle2" fontWeight={600} mb={0.7}>
        Font Settings
      </Typography>
      <FormControl fullWidth size="small" sx={fieldStyle}>
        <InputLabel>Font Family</InputLabel>
        <Select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          label="Font Family"
        >
          {[
            "Arial",
            "Georgia",
            "Verdana",
            "Tahoma",
            "Calibri",
            "Cambria",
            "Garamond",
          ].map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5}>
        <TextField
          sx={{ ...fieldStyle, mb: 0 }}
          label="Font Size"
          type="number"
          value={parseInt(fontSize)}
          onChange={(e) => setFontSize(`${e.target.value}pt`)}
          fullWidth
          size="small"
        />
        <TextField
          sx={{ ...fieldStyle, mb: 0 }}
          label="Line Height"
          type="number"
          value={parseInt(lineHeight)}
          onChange={(e) => setLineHeight(`${e.target.value}pt`)}
          fullWidth
          size="small"
        />
        <TextField
          sx={{ ...fieldStyle, mb: 0,fontSize:"12px" }}
          label="Letter Spacing"
          type="number"
          value={letterSpacing}
          onChange={(e) => setLetterSpacing(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          sx={{ ...fieldStyle, mb: 0,fontSize:"12px" }}
          label="Word Spacing"
          type="number"
          value={wordSpacing}
          onChange={(e) => setWordSpacing(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>
      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
        Theme
      </Typography>
      <Box display="flex align-items-center" gap={1.5} mb={2}>
        {themeColors.map((color) => (
          <Box
            key={color}
            onClick={() => setFontColor(color)}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: color,
              cursor: "pointer",
              border: "2px solid transparent", // Default border is transparent
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for hover effect
              transition:
                "transform 0.2s, box-shadow 0.2s, border 0.3s ease-in-out", // Smooth transition for hover
              "&:hover": {
                transform: "scale(1.1)", // Slight zoom effect for interactivity
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover for depth
                // borderColor: "#4CAF50", // Greenish border on hover for more vibrant feedback
              },
              "&.selected": {
                border: "2px solid #9E9E9E", // Pink border to highlight selection
                boxShadow: `0 0 12px rgba(183, 173, 177, 0.5)`, // Stronger glow effect for selected color
                transform: "scale(1.2)", // Slightly larger selected state for emphasis
              },
            }}
            className={fontColor === color ? "selected" : ""}
          />
        ))}
      </Box>
      {/* Text Style */}
      <Typography variant="subtitle2" fontWeight={600} mt={2} mb={0.5}>
        Text Styles
      </Typography>
      <Box display="flex" gap={1} mb={1}>
        <Tooltip title="Bold">
          <ToggleButton
            value="bold"
            selected={fontWeight === "bold"}
            onClick={() =>
              setFontWeight(fontWeight === "bold" ? "normal" : "bold")
            }
            sx={{ padding: "4px", minWidth: "35px", height: "35px" }}
          >
            <FormatBold sx={{ fontSize: "16px" }} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Italic">
          <ToggleButton
            value="italic"
            selected={fontStyle === "italic"}
            onClick={() =>
              setFontStyle(fontStyle === "italic" ? "normal" : "italic")
            }
            sx={{ padding: "4px", minWidth: "35px", height: "35px" }}
          >
            <FormatItalic sx={{ fontSize: "16px" }} />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Underline">
          <ToggleButton
            value="underline"
            selected={textDecoration === "underline"}
            onClick={() =>
              setTextDecoration(
                textDecoration === "underline" ? "none" : "underline"
              )
            }
            sx={{ padding: "4px", minWidth: "35px", height: "35px" }}
          >
            <FormatUnderlined sx={{ fontSize: "16px" }} />
          </ToggleButton>
        </Tooltip>
      </Box>

      <FormControl fullWidth size="small" sx={fieldStyle} className="mt-2">
        <InputLabel>Text Transform</InputLabel>
        <Select
          value={textTransform}
          onChange={(e) => setTextTransform(e.target.value)}
          label="Text Transform"
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="uppercase">UPPERCASE</MenuItem>
          <MenuItem value="lowercase">lowercase</MenuItem>
          <MenuItem value="capitalize">Capitalize</MenuItem>
        </Select>
      </FormControl>

      {/* Alignment */}
      <Typography variant="subtitle2" fontWeight={600} mt={0} mb={0.5}>
        Alignment
      </Typography>
      <ToggleButtonGroup
        value={textAlign}
        exclusive
        onChange={(e, value) => value && setTextAlign(value)}
        sx={{ height: "32px" }} // optional: sets height for group
      >
        <ToggleButton
          value="left"
          sx={{ padding: "4px", minWidth: "32px", height: "32px" }}
        >
          <FormatAlignLeft sx={{ fontSize: "16px" }} />
        </ToggleButton>
        <ToggleButton
          value="center"
          sx={{ padding: "4px", minWidth: "32px", height: "32px" }}
        >
          <FormatAlignCenter sx={{ fontSize: "16px" }} />
        </ToggleButton>
        <ToggleButton
          value="right"
          sx={{ padding: "4px", minWidth: "32px", height: "32px" }}
        >
          <FormatAlignRight sx={{ fontSize: "16px" }} />
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Color Pickers */}
      <Typography variant="subtitle2" fontWeight={600} mt={2} mb={0.5}>
        Custom Colors
      </Typography>
      <Box display="flex" gap={2} mb={1.5}>
        <Box>
          <Typography fontSize="0.75rem" color="text.secondary">
            Font
          </Typography>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            style={{
              width: 32,
              height: 32,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Box>
        <Box>
          <Typography fontSize="0.75rem" color="text.secondary">
            Background
          </Typography>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{
              width: 32,
              height: 32,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>

      {/* Target Area */}
      <FormControl fullWidth size="small" sx={fieldStyle}>
        <InputLabel>Text Area</InputLabel>
        <Select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          label="Text Area"
        >
          {[
            "all",
            "name",
            "role",
            "contact",
            "professional",
            "techskills",
            "education",
            "certification",
            "experience",
            "projects",
          ].map((s) => (
            <MenuItem key={s} value={s}>
              {s === "all"
                ? "All Sections"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Text Type */}
      <FormControl fullWidth size="small" sx={fieldStyle}>
        <InputLabel>Text Type</InputLabel>
        <Select
          value={textType}
          onChange={(e) => setTextType(e.target.value)}
          label="Text Type"
        >
          <MenuItem value="header">Heading</MenuItem>
          <MenuItem value="body">Body Text</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
  );
};

export default StylingSection;
