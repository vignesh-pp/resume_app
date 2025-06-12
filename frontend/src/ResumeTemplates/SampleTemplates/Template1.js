import React, { useEffect } from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill, editor } from "react-quill";

export default function Template1(props) {

  const { selectedTemplate, isPreview = false } = props;
  return (
    <Paper
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "10%",
          height: "100%",
          backgroundColor: "#00a8e8",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        {/* Add a decorative pattern if required */}
      </Box>

      <Box sx={{ marginLeft: "10%" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize:
                // isPreview
                //   ? "10pt"
                //   :
                selectedTemplate.template_styles.headingSize + "pt",
            }}
          >
            {selectedTemplate.personaldetails.firstname +
              " " +
              selectedTemplate.personaldetails.lastname}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          {/* Left side */}
          <Box>
            {/* Summary Section */}
            <Box>
              <Typography
                variant="div"
                sx={{
                  color: "#00a8e8",
                  fontSize: isPreview
                    ? "10pt"
                    : `${selectedTemplate.template_styles.headingSize}pt`, // Conditional font size
                }}
              >
                SUMMARY
              </Typography>
              <Typography
                variant="div"
                sx={{
                  fontSize: isPreview
                    ? "8pt"
                    : `${selectedTemplate.template_styles.textSize}pt`, // Conditional font size
                }}
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.summary.value,
                }}
              />
            </Box>

            {/* Experience Section */}
            <Box>
              <Typography
                variant="div"
                sx={{
                  color: "#00a8e8",
                  fontSize: isPreview
                    ? "10pt"
                    : `${selectedTemplate.template_styles.headingSize}pt`, // Conditional font size
                }}
                marginTop={"10px"}
              >
                EXPERIENCE
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: isPreview
                    ? "8pt"
                    : `${selectedTemplate.template_styles.textSize}pt`, // Conditional font size
                }}
              >
                SOFTWARE ENGINEER
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  fontSize: isPreview
                    ? "8pt"
                    : `${selectedTemplate.template_styles.textSize}pt`, // Conditional font size
                }}
              >
                DACES INDIA PRIVATE LIMITED, CHENNAI • September 2022 - Current
              </Typography>
              <ul
                style={{
                  marginTop: "5px",
                  paddingLeft: "10px",
                  fontSize: isPreview
                    ? "8pt"
                    : `${selectedTemplate.template_styles.textSize}pt`, // Conditional font size
                }}
              >
                <li>
                  Built reusable UI components that can be used across multiple
                  projects with React.
                </li>
                <li>
                  Utilized React.js to design new features for the web
                  application development with React.
                </li>
                <li>
                  Maintained browser compatibility with React using libraries
                  like Redux, CSS3, and JavaScript DOM.
                </li>
              </ul>
            </Box>
          </Box>
          {/* Right Side */}
          <Box sx={{ paddingLeft: "10px" }}>
            {/* Contact Section */}

            <Box
              sx={{
                backgroundColor: "#eaf4fc",
                padding: "7px 10px",
                borderRadius: "3px",
                fontSize:
                  // isPreview ? "8pt" :
                  selectedTemplate.template_styles.textSize,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#00a8e8",
                  fontSize:
                    // isPreview
                    //   ? "10pt"
                    //   :
                    selectedTemplate.template_styles.headingSize + "pt",
                }}
              >
                CONTACT
              </Typography>
              <Box
                sx={{
                  fontSize:
                    // isPreview
                    //   ? "8pt"
                    //   :
                    selectedTemplate.template_styles.textSize,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize:
                      // isPreview
                      //   ? "8pt"
                      //   :
                      selectedTemplate.template_styles.textSize,
                  }}
                >
                  {selectedTemplate.personaldetails.phone}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize:
                      // isPreview
                      //   ? "8pt"
                      //   :
                      selectedTemplate.template_styles.textSize,
                  }}
                >
                  {selectedTemplate.personaldetails.email}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize:
                      // isPreview
                      //   ? "8pt"
                      //   :
                      selectedTemplate.template_styles.textSize,
                  }}
                >
                  {selectedTemplate.personaldetails.city +
                    "-" +
                    selectedTemplate.personaldetails.pincode}
                </Typography>
              </Box>
            </Box>

            {/* Skills Section */}

            <Box
              sx={{
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#00a8e8",
                  fontSize:
                    //  isPreview
                    //   ? "10pt"
                    //   :
                    selectedTemplate.template_styles.headingSize + "pt",
                }}
              >
                SKILLS
              </Typography>

              <Typography
                variant="div"
                sx={{
                  fontSize:
                    //  isPreview
                    //   ? "8pt"
                    //   :
                    selectedTemplate.template_styles.textSize,
                }}
                dangerouslySetInnerHTML={{
                  __html: selectedTemplate.skills.value,
                }}
              ></Typography>
            </Box>

            {/* Education Section */}
            <Box
              sx={{
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#00a8e8",
                  fontSize:
                    //  isPreview
                    //   ? "10pt"
                    //   :
                    selectedTemplate.template_styles.headingSize + "pt",
                }}
              >
                EDUCATION AND TRAINING
              </Typography>
              {selectedTemplate.education?.value.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    fontSize:
                      //  isPreview
                      //   ? "8pt"
                      //   :
                      selectedTemplate.template_styles.textSize,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize:
                        //  isPreview
                        //   ? "8pt"
                        //   :
                        selectedTemplate.template_styles.textSize,
                    }}
                  >
                    {edu.degree} in category
                    {/* BE in Electronics and Communication Engineering */}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "gray",
                      fontSize:
                        //  isPreview
                        //   ? "8pt"
                        //   :
                        selectedTemplate.template_styles.textSize,
                    }}
                  >
                    {edu.institution}({edu.year})
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Certifications */}
            <Box
              sx={{
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#00a8e8",
                  fontSize:
                    //  isPreview
                    //   ? "10pt"
                    //   :
                    selectedTemplate.template_styles.headingSize + "pt",
                }}
              >
                CERTIFICATIONS
              </Typography>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "10px",
                  fontSize:
                    // isPreview
                    //   ? "8pt"
                    //   :
                    selectedTemplate.template_styles.textSize,
                }}
              >
                {selectedTemplate.certificate?.value.map((cer, index) => (
                  <li key={index}>{cer.name}</li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
