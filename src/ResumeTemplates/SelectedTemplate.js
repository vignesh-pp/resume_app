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
import Resume1 from "./SampleTemplates/Resume1";
import Resume2 from "./SampleTemplates/Resume2";
import Resume3 from "./SampleTemplates/Resume3";
import Resume4 from "./SampleTemplates/Resume4";

export default function SelectedTemplate(props) {
  const { selectedTemplate, isPreview } = props;
  return (
    <>
      {selectedTemplate.template_name === "Template1" && (
        // <Template1 selectedTemplate={selectedTemplate} isPreview={true} />
        <Resume1 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}

      {selectedTemplate.template_name === "Template2" && (
        <Resume2 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Template3" && (
        <Resume3 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Template4" && (
        <Resume4 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
    </>
  );
}
