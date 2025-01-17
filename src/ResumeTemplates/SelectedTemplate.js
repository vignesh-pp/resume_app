import React from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import Template1 from "./SampleTemplates/Template1";

export default function SelectedTemplate(props) {
  const { selectedTemplate } = props;
  return (
    <>
      {selectedTemplate.template_name === "Template1" && (
        <Template1 selectedTemplate={selectedTemplate} isPreview={true} />
      )}
    </>
  );
}
