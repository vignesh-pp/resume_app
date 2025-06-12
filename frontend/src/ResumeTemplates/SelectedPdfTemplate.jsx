import React from "react";
import Resume_template_2Pdf from "./SampleTemplates/Resume_template_2Pdf";
import ResumeDocumentPdf1 from "./SampleTemplates/ResumeDocumentPdf1";
import Resume_template_3pdf from "./SampleTemplates/Resume_template_3pdf";
import Resume_template_4pdf from "./SampleTemplates/Resume_template_4pdf";
import Resume_template_5pdf from "./SampleTemplates/Resume_template_5pdf";

export default function SelectedPdfTemplate(props) {
  const {selectedTemplate} = props;
  return (
    <>

      {selectedTemplate.template_name === "Template1" && (
        <ResumeDocumentPdf1 selectedTemplate={selectedTemplate}/>
      )}
      {selectedTemplate.template_name === "Resume_Template_2" && (
        <Resume_template_2Pdf selectedTemplate={selectedTemplate}/>
      )}
      {selectedTemplate.template_name === "Resume_Template_3" && (
        <Resume_template_3pdf selectedTemplate={selectedTemplate}/>
      )}
      {selectedTemplate.template_name === "Resume_Template_4" && (
        <Resume_template_4pdf selectedTemplate={selectedTemplate}/>
      )}
      {selectedTemplate.template_name === "Resume_Template_5" && (
        <Resume_template_5pdf selectedTemplate={selectedTemplate}/>
      )}
 
    </>
  );
}
