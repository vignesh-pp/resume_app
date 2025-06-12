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
import Resume5 from "./SampleTemplates/Resume5";
import ResumeDocumentDocx1 from "./SampleTemplates/ResumeDocumentDocx1";
import Resume_template_2 from "./SampleTemplates/Resume_template_2";
import SelectedPdfTemplate from "./SelectedPdfTemplate";
import { PDFViewer } from "@react-pdf/renderer";
import Resume_template_3 from "./SampleTemplates/Resume_template_3";
import Resume_template_4pdf from "./SampleTemplates/Resume_template_4pdf";
import Resume_template_4 from "./SampleTemplates/Resume_template_4";
import ResumeDocumentPdf1 from "./SampleTemplates/ResumeDocumentPdf1";
import Resume_template_5pdf from "./SampleTemplates/Resume_template_5pdf";
import Resume_template_5 from "./SampleTemplates/Resume_template_5";

export default function SelectedTemplate(props) {
  const { selectedTemplate, isPreview, fontFamilyProp, fontSizeProp,lineHeightProp,isDownload=false } = props;
  return (
    <>
      {selectedTemplate.template_name === "Template1" && isPreview && (
        // <Template1 selectedTemplate={selectedTemplate} isPreview={true} />
        <Resume1 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Template1" && !isPreview &&(
        // <Template1 selectedTemplate={selectedTemplate} isPreview={true} />
        <>
        <ResumeDocumentDocx1 selectedTemplate={selectedTemplate} isPreview={isPreview} fontFamilyProp={fontFamilyProp} fontSizeProp={fontSizeProp} lineHeightProp={lineHeightProp}/>
        </>
      )}

      {selectedTemplate.template_name === "Template2" && (
        <Resume1 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Template3" && (
        <Resume3 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Template4" && (
        <Resume4 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}

      {selectedTemplate.template_name === "Template5" && (
        <Resume5 selectedTemplate={selectedTemplate} isPreview={isPreview} />
      )}
      {selectedTemplate.template_name === "Resume_Template_2" && (
        <>
        <Resume_template_2 selectedTemplate={selectedTemplate} isPreview={isPreview} fontFamilyProp={fontFamilyProp} isDownload={isDownload}/>
        </>
      )}
      {selectedTemplate.template_name === "Resume_Template_3" && (
        <>
        <Resume_template_3 selectedTemplate={selectedTemplate} isPreview={isPreview} fontFamilyProp={fontFamilyProp} isDownload={isDownload}/>
        </>
      )}
      {selectedTemplate.template_name === "Resume_Template_4" && (
        <>
        <Resume_template_4 selectedTemplate={selectedTemplate} isPreview={isPreview} fontFamilyProp={fontFamilyProp} isDownload={isDownload}/>
        </>
      )}
      {selectedTemplate.template_name === "Resume_Template_5" && (
        <>
        {/* <PDFViewer
          style={{
            width: '100%',              // or a fixed width like '800px'
            height: '90vh',             // or a fixed height like '600px'
            border: 'none',             // removes the default black border
            backgroundColor: '#f0f0f0', // set your desired background
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // optional for light elevation
          }}
        >
          <Resume_template_5pdf
            selectedTemplate={selectedTemplate}
            isPreview={isPreview}
            fontFamilyProp={fontFamilyProp}
            isDownload={isDownload}
          />
        </PDFViewer> */}
        <Resume_template_5 selectedTemplate={selectedTemplate} isPreview={isPreview} fontFamilyProp={fontFamilyProp} isDownload={isDownload}/>
        </>
      )}
    </>
  );
}
