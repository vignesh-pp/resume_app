import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TemplatePreview from "./TemplatePreview";
import "./Template.css";
import SelectedTemplate from "./SelectedTemplate";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

export default function Template() {
  const [allTemplates, setAllTemplates] = useState([
    {
      personaldetails: {
        firstname: "VIGNESH",
        lastname: "P",
        email: "pvignesh358@gmail.com",
        phone: "9566805138",
        city: "TENKASI",
        country: "India",
        pincode: "627818",
        photo: null,
      },
      summary: {
        label: "summary",
        value: `<div>Software engineering is a computer science field that involves designing, developing, testing, and maintaining software applications</div>`,
      },
      skills: {
        label: "skills",
        value: `
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>CSS</li>
        </ul>
      `,
      },
      experience: {
        label: "experience",
        value: [
          {
            title: "Retail Sales Associate",
            company: "ZARA - New Delhi, India",
            duration: "02/2017 - Current",
            responsibilities: [
              "Increased monthly sales 10% by upselling products.",
            ],
          },
        ],
      },
      education: {
        label: "education",
        value: [
          {
            institute: "Oxford Software Institute, New Delhi",
            degree: "Diploma in Financial Accounting",
            year: "2016",
          },
        ],
      },
      certificate: {
        label: "certificate",
        value: [
          {
            name: "Advanced Algorithms and Data Structures",
            link: "",
          },
          {
            name: "React Certification",
            link: "",
          },
        ],
      },
      template_id: 1,
      template_name: "Template1",
      template_image: null,
      styles: {
        bgcolor: "#00a8ee",
        color: "red",
        textSize: "10pt",
        fontFamily: "sans-serif",
        HeadingSize: "12pt",
        sectionSpacing: "2pt",
        lineSpacing: "1pt",
        topbottomMargin: "1pt",
        sideMargin: "1pt",
        paragraphIndent: "1pt",
      },
      sections: {
        has_personaldetails: true,
        has_experience: true,
        has_education: true,
        has_certificates: true,
        has_skills: true,
        has_summary: true,
      },
      steps: [
        { label: "Home", icon: <HomeIcon /> },
        { label: "Personal Details", icon: <PersonIcon /> },
        { label: "Summary", icon: <PersonIcon /> },
        { label: "Skills", icon: <BuildIcon /> },
        { label: "Education", icon: <SchoolIcon /> },
        { label: "Certificate", icon: <SchoolIcon /> },
      ],
      // steps: [
      //   { label: "Home", icon: "home" },
      //   { label: "Personal Details", icon: "person" },
      //   { label: "Summary", icon: "person" },
      //   { label: "Skills", icon: "build" },
      //   { label: "Education", icon: "school" },
      //   { label: "Certificate", icon: "school" },
      // ],
    },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Calculate the number of items that can fit in the first row
  const itemsPerRow = Math.floor(window.innerWidth / 320); // Assuming each item has width 300px + margin

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSelect = (template) => {
    console.log("seletem", template);
    setActiveTab(1);

    setSelectedTemplate(template);
  };
  return (
    <div>
      {activeTab === 0 && (
        <>
          <Navbar />
          <Box sx={{ padding: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Align items on both sides
                alignItems: "center", // Vertically center the items
                marginBottom: 2, // Space below the Box
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, marginLeft: 2 }}
                >
                  Resume Builder
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block", color: "lightgray" },
                    marginLeft: 2,
                    fontSize: "12px",
                  }}
                >
                  Select from the following templates
                </Typography>
              </div>

              {/* Show/Hide button */}
              {allTemplates.length > itemsPerRow && (
                <Button
                  onClick={handleToggleShowAll}
                  endIcon={<ArrowForwardIcon />}
                  style={{ textTransform: "none" }}
                >
                  {showAll ? "See Less" : "See All"}
                </Button>
              )}
            </Box>

            {/* Other content */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                padding: 2,
              }}
            >
              {(showAll
                ? allTemplates
                : allTemplates.slice(0, itemsPerRow)
              ).map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: 200,
                    height: 250,
                    backgroundColor: value.styles.bgcolor,
                    padding: "25px",
                    borderRadius: "5px",
                    opacity: 0.6,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleSelect(value);
                  }}
                >
                  {console.log("Templarete", value)}
                  {/* Your content here */}
                  <img
                    src="https://resumaker.ai/s3/en-US/resume-examples/Ui-Designer-Resume-Example.png"
                    alt={value.template_name}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </Box>
          </Box>
        </>
      )}
      {activeTab === 1 && (
        <Box>
          {selectedTemplate !== null && (
            <TemplatePreview
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setActiveTab={setActiveTab}
            />
          )}
        </Box>
      )}
    </div>
  );
}
