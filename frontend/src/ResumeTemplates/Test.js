// // import React, { useEffect, useState } from "react";
// // import { pdf, StyleSheet, Document, Page, View, Text,} from "@react-pdf/renderer";
// // import { pdfjs,  Document as DocumentPdf, Page as PagePdf } from "react-pdf";
// // import { Box, IconButton, Typography } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// // import { Font } from '@react-pdf/renderer';
// // import SamplePdf from './resume.pdf'
// // import 'react-pdf/dist/esm/Page/TextLayer.css';
// // import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// // const hyphenate = (word) => word.length > 10 ? word.split('') : [word];
// // Font.registerHyphenationCallback(hyphenate);

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //   "pdfjs-dist/build/pdf.worker.min.mjs",
// //   import.meta.url
// // ).toString();

// // // PDF Document
// // const MyPDFDocument = () => (
// //   <Document>
// //     <Page style={styles.page} size="A4">
// //       <View style={styles.section}>
// //         <Text style={styles.title}>React PDF Renderer</Text>
// //         <Text style={styles.text}> </Text>
// //       </View>
// //     </Page>
// //     <Page style={styles.page} size="A4">
// //       <View style={styles.section}>
// //         <Text style={styles.title}>Page 2</Text>
// //         <Text>This is the second page.</Text>
// //       </View>
// //     </Page>
// //   </Document>
// // );

// // // Styles for PDF content
// // const styles = StyleSheet.create({
// //   page: {
// //     padding: 30,
// //     fontFamily: "Helvetica",
// //     backgroundColor: "transparent",
// //     wordBreak: 'break-all',
// //   },
// //   section: {
// //     margin: 10,
// //     padding: 10,
// //   },
// //   title: {
// //     fontSize: 18,
// //     marginBottom: 10,
// //     wordBreak: 'break-all',
// //   },
// //   text: {
// //     fontSize: 12,
// //     flexWrap: 'wrap',
// //     wordBreak: 'break-all',
// //   },
// // });

// // const PDFPreviewer = () => {
// //   const [blobUrl, setBlobUrl] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pdfDocument, setPdfDocument] = useState(null);

// //   useEffect(() => {
// //     const generatePDF = async () => {
// //       const blob = await pdf(<MyPDFDocument />).toBlob();
// //       const url = URL.createObjectURL(blob);
// //       setBlobUrl(url);
// //       // const buffer = await pdf(<MyPDFDocument />).toBuffer();
// //       // setPdfDocument(buffer);
// //     };
// //     generatePDF();
// //   }, []);

// //   useEffect(() => {
// //     if (blobUrl) setPdfDocument(blobUrl);
// //   }, [blobUrl]);

// //   const totalPages = 2;

// //   return (
// //     <Box
// //       sx={{
// //         height: "100vh",
// //         width: "100vw",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         backgroundColor: "#ececec",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           width: "420px",
// //           height: "600px",
// //           position: "relative",
// //           boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
// //           borderRadius: "12px",
// //           backgroundColor: "#f9f9f9",
// //           overflow: "hidden",
// //           "&:hover .nav-controls": {
// //             opacity: 1,
// //             pointerEvents: "auto",
// //           },
// //         }}
// //       >
// //         {pdfDocument ? (
// //           <>
// //             <Box sx={{ width: "100%", height: "100%" }}>
// //               <DocumentPdf
// //                 file={blobUrl}
// //                 // options={{
// //                 //   disableTextLayer: false, // Enable text layer
// //                 //   disableAutoFetch: true,
// //                 // }}
// //               >
// //                 <PagePdf
// //                   pageNumber={currentPage}
// //                   renderAnnotationLayer={false}
// //                   renderTextLayer={true} // Enable text layer rendering
// //                   width={420}
// //                   scale={1.01}
// //                   customTextRenderer={(textItem) => {
// //                     return textItem.str;
// //                   }}
// //                 />
// //               </DocumentPdf>
// //             </Box>

// //             {/* Navigation Controls */}
// //             <Box
// //               className="nav-controls"
// //               sx={{
// //                 position: "absolute",
// //                 bottom: "10px",
// //                 left: "50%",
// //                 transform: "translateX(-50%)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "10px",
// //                 opacity: 0,
// //                 pointerEvents: "none",

// //                 transition: "opacity 0.3s ease-in-out",
// //                 backgroundColor: "rgba(255,255,255,0.85)",
// //                 padding: "6px 12px",
// //                 borderRadius: "20px",
// //                 zIndex:2,
// //               }}
// //             >
// //               <IconButton
// //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //                 disabled={currentPage === 1}
// //                 sx={{
// //                   borderRadius: "50%",
// //                   backgroundColor: "#0078d4",
// //                   color: "#fff",
// //                   padding: "4px",
// //                   fontSize: "16px",
// //                   cursor:"pointer",
// //                   "&:hover": { backgroundColor: "#005a9e" },
// //                   "&:disabled": {
// //                     backgroundColor: "#c5c5c5",
// //                     cursor: "not-allowed",
// //                   },
// //                 }}
// //               >
// //                 <ArrowBackIcon fontSize="small" />
// //               </IconButton>
// //               <Typography sx={{ fontSize: "12px", color: "#333", fontWeight: "bold" }}>
// //                 Page {currentPage} of {totalPages}
// //               </Typography>
// //               <IconButton
// //                 onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
// //                 disabled={currentPage === totalPages}
// //                 sx={{
// //                   borderRadius: "50%",
// //                   backgroundColor: "#0078d4",
// //                   color: "#fff",
// //                   padding: "4px",
// //                   fontSize: "16px",
// //                   cursor:"pointer",
// //                   "&:hover": { backgroundColor: "#005a9e" },
// //                   "&:disabled": {
// //                     backgroundColor: "#c5c5c5",
// //                     cursor: "not-allowed",
// //                   },
// //                 }}
// //               >
// //                 <ArrowForwardIcon fontSize="small" />
// //               </IconButton>
// //             </Box>
// //           </>
// //         ) : (
// //           <Typography sx={{ padding: "20px" }}>Generating PDF...</Typography>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default PDFPreviewer;
// import React, { useState } from "react";
// import axios from "axios";

// export default function Test() {
//   const [text, setText] = useState("");
//   const [results, setResults] = useState([]);
//   const [correctedText, setCorrectedText] = useState("");

//   const checkGrammar = async () => {
//     try {
//       const response = await axios.post(
//         "https://api.languagetoolplus.com/v2/check",
//         null,
//         {
//           params: {
//             text,
//             language: "en-US",
//           },
//         }
//       );

//       const matches = response.data.matches;

//       // Testly corrections to the original text
//       let updatedText = text;
//       let offsetShift = 0;

//       matches.forEach((match) => {
//         const { offset, length, replacements, rule } = match;

//         // Skip premium-only rules
//         if (rule.isPremium || replacements.length === 0) return;

//         const replacement = replacements[0].value;
//         const start = offset + offsetShift;
//         const end = start + length;

//         updatedText =
//           updatedText.slice(0, start) + replacement + updatedText.slice(end);

//         // Adjust offset shift after replacement
//         offsetShift += replacement.length - length;
//       });

//       setResults(matches);
//       setCorrectedText(updatedText);
//     } catch (error) {
//       console.error("Grammar check failed:", error);
//     }
//   };
//   return (
//     <div style={{ padding: 20 }}>
//       <h3>Grammar Checker</h3>
//       <textarea
//         rows={6}
//         cols={70}
//         placeholder="Type text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <br />
//       <button onClick={checkGrammar} style={{ marginTop: 10 }}>
//         Check Grammar
//       </button>

//       {correctedText && (
//         <div style={{ marginTop: 20 }}>
//           <h4>Corrected Text:</h4>
//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: 10,
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             {correctedText}
//           </div>
//         </div>
//       )}

//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h4>Suggestions:</h4>
//           <ul>
//             {results.map((match, index) => (
//               <li key={index}>
//                 <strong>Issue:</strong> {match.message}
//                 <br />
//                 <strong>Suggestions:</strong>{" "}
//                 {match.replacements.map((r) => r.value).join(", ") || "None"}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// // Set up PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

// function Test() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [resumeData, setResumeData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//     setError(null); // Reset error
//   };

//   // Extract text from the uploaded PDF
//   const extractTextFromPdf = async (file) => {
//     try {
//       const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
//       const totalPages = pdf.numPages;
//       let textContent = "";

//       for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const text = await page.getTextContent();
//         textContent += text.items.map((item) => item.str).join(" ");
//       }

//       return textContent;
//     } catch (error) {
//       console.error("Error extracting text from PDF:", error);
//       setError("There was an issue extracting text from the PDF.");
//       return "";
//     }
//   };

//   // Handle form submission (PDF upload)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!pdfFile) {
//       setError("Please upload a PDF file.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const pdfText = await extractTextFromPdf(pdfFile);
//       const structuredData = extractResumeData(pdfText);
//       setResumeData(structuredData);
//     } catch (err) {
//       setError("Error parsing the PDF.");
//     }
//     setLoading(false);
//   };

//   // Parse the extracted text and structure it into JSON
//   const extractResumeData = (textContent) => {
//     const resumeData = {
//       personaldetails: {},
//       summary: { value: "" },
//       skills: { value: [] },
//       education: { value: [] },
//       experience: { value: [] },
//       certificate: { value: [] },
//     };

//     // Extract Name (Assume it's at the start of the document)
//     const nameRegex = /([A-Z][a-z]+)\s([A-Z][a-z]+)/;
//     const nameMatch = textContent.match(nameRegex);
//     if (nameMatch) {
//       resumeData.personaldetails.firstname = nameMatch[1];
//       resumeData.personaldetails.lastname = nameMatch[2];
//     }

//     // Extract Summary (Assuming it's between "Summary" and "Skills")
//     const summaryRegex = /Summary[\s\S]+?Skills/i;
//     const summaryMatch = textContent.match(summaryRegex);
//     if (summaryMatch) {
//       resumeData.summary.value = summaryMatch[0].replace("Summary", "").trim();
//     }

//     // Extract Skills (Assuming skills come after "Skills" and are comma-separated)
//     const skillsRegex = /Skills[\s\S]+?Experience/i;
//     const skillsMatch = textContent.match(skillsRegex);
//     if (skillsMatch) {
//       resumeData.skills.value = skillsMatch[0]
//         .replace("Skills", "")
//         .split(",")
//         .map((skill) => skill.trim());
//     }

//     // Extract Experience (Assuming it's between "Experience" and "Education")
//     const experienceRegex = /Experience[\s\S]+?(Education|Projects)/i;
//     const experienceMatch = textContent.match(experienceRegex);
//     if (experienceMatch) {
//       const experienceText = experienceMatch[0]
//         .replace("Experience", "")
//         .trim();
//       resumeData.experience.value.push({
//         company: "Sample Company",
//         duration: "02/2017 - Current",
//         location: "Chennai, India",
//         position: "Software Developer",
//         responsibilities: experienceText,
//       });
//     }

//     // Extract Education (Assuming it's between "Education" and "Certificates")
//     const educationRegex = /Education[\s\S]+?Certificates/i;
//     const educationMatch = textContent.match(educationRegex);
//     if (educationMatch) {
//       const educationText = educationMatch[0].replace("Education", "").trim();
//       resumeData.education.value.push({
//         year: "2016",
//         marks: "80%",
//         degree: "Diploma in Financial Accounting",
//         institution: "Oxford Software Institute, New Delhi",
//       });
//     }

//     // Certificates (Sample matching)
//     const certificateRegex = /Certificate[\s\S]+/i;
//     const certificateMatch = textContent.match(certificateRegex);
//     if (certificateMatch) {
//       resumeData.certificate.value.push({
//         name: "Advanced Algorithms and Data Structures",
//         year: "2021",
//       });
//       resumeData.certificate.value.push({
//         name: "React Certification",
//         year: "2024",
//       });
//     }

//     return resumeData;
//   };

//   return (
//     <div className="Test">
//       <h1>PDF Resume Parser</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//         <button type="submit">Upload and Parse PDF</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <p>Loading...</p>}

//       {resumeData && (
//         <div>
//           <h2>Extracted Data</h2>
//           <pre>{JSON.stringify(resumeData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Test;

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const Test = () => {
  // const styles = StyleSheet.create({

  //   resumeContainer: {
  //     fontFamily: "Helvetica",
  //     fontSize: 11,
  //     padding: 20,
  //     backgroundColor: "#fff",
  //     color: "#000",
  //   },
  //   header: {
  //     backgroundColor: "#c4ebe9",
  //     padding: 15,
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //   },
  //   nameSection: {
  //     flexDirection: "column",
  //   },
  //   name: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  //   },
  //   role: {
  //     fontSize: 12,
  //   },
  //   contact: {
  //     fontSize: 10,
  //   },
  //   section: {
  //     flexDirection: "row",
  //     marginTop: 20,
  //   },
  //   left: {
  //     width: "65%",
  //     paddingRight: 10,
  //   },
  //   right: {
  //     width: "35%",
  //     paddingLeft: 10,
  //   },
  //   sectionTitle: {
  //     fontSize: 12,
  //     fontWeight: "bold",
  //     marginVertical: 6,
  //     borderLeft: "3px solid lightgray",
  //     paddingLeft: 6,
  //     textTransform: "uppercase",
  //   },
  //   jobTitle: {
  //     fontWeight: "bold",
  //     fontStyle: "italic",
  //     marginTop: 6,
  //   },
  //   listItem: {
  //     marginLeft: 10,
  //     marginBottom: 4,
  //   },
  //   paragraph: {
  //     marginBottom: 6,
  //     textAlign: "justify",
  //   },
  //   bold: {
  //     fontWeight: "bold",
  //   },
  //   italic: {
  //     fontStyle: "italic",
  //   },
  // });
  // const sectionHeading = {
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   borderLeft: "3px solid lightgray",
  //   paddingLeft: 10,
  //   textTransform: "uppercase",
  //   marginTop: 20,
  //   marginBottom: 10,
  // };

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f8f8",
      padding: "40px",
    },
    resume: {
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: "#fff",
    },
    header: {
      textAlign: "center",
      border: "1px solid #999",
      padding: "15px",
      margin: "0 auto",
      width: "300px",
      backgroundColor: "#fff",
      marginBottom: "20px",
    },
    name: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "bold",
    },
    role: {
      margin: "5px 0 0",
      fontSize: "14px",
      color: "#444",
    },
    main: {
      display: "flex",
      borderRadius: "6px",
      overflow: "hidden",
    },
    left: {
      width: "35%",
      backgroundColor: "#f0f0f0",
      padding: "20px",
      boxSizing: "border-box",
    },
    right: {
      width: "65%",
      padding: "20px",
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottom: "1px solid #ccc",
      paddingBottom: "5px",
      marginBottom: "10px",
    },
    infoItem: {
      fontSize: "14px",
      marginBottom: "8px",
    },
    boldLabel: {
      display: "inline-block",
      width: "70px",
      fontWeight: "bold",
    },
    profileText: {
      fontSize: "14px",
      textAlign: "justify",
      lineHeight: 1.6,
    },
  };
  return (
    <>
      {/* <style>
        {`
          body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
          }

          .container {
            max-width: 900px;
            margin: 30px auto;
            background: #fff;
            padding: 0;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
           p{
           color:black
           }

          .header {
            background-color: #c4ebe9;
            padding: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: bold;
            // color: #064d4d;
          }

          .header h2 {
            margin: 5px 0 0;
            font-size: 16px;
            // color: #333;
            font-weight: normal;
          }

          .contact {
            font-size: 14px;
            line-height: 1.6;
          }

          .section {
            padding: 20px 30px;
            display: flex;
            gap: 30px;
          }

          .left {
            flex: 2;
          }

          .right {
            flex: 1;
          }

          h3 {
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: bold;
            border-left: 3px solid lightgray;
            padding-left: 10px;
            text-transform: uppercase;
            margin-top:20px
          }

          .job-title {
            font-weight: bold;
            font-style: italic;
            // color:black;
          }

          ul {
            padding-left: 20px;
          }

          li {
            margin-bottom: 8px;
            font-size: 14px;
          }

          p {
            font-size: 14px;
            margin-bottom: 10px;
            text-align: justify;
          }

          .edu-title {
            font-weight: bold;
          }

          .subtext {
            font-style: italic;
            margin-top: 5px;
            // padding-top: 5px;
          }
        `}
      </style>
      

      <div className="container">
        <div className="header">
          <div>
            <h1>VIGNESH P</h1>
            <h2>Software Engineer</h2>
          </div>
          <div className="contact">
            <div>
              <strong>Email:</strong> pvignesh358@gmail.com
            </div>
            <div>
              <strong>Phone:</strong> 9566805138
            </div>
            <div>
              <strong>Address:</strong> Chennai, India
            </div>
            <div>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/vignesh-p-65a758208/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black", textDecoration: "underline" }}
              >
                linkedin.com
              </a>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="left">
            <h3>Professional Summary</h3>
            <p>
              Experienced Software Engineer with 3 years of expertise in
              full-stack web development, specializing in React.js, JavaScript,
              HTML, and CSS. Proficient in backend technologies, including
              Node.js and MongoDB, with a strong foundation in creating scalable
              and user-centric web applications. Skilled in UI/UX design using
              tools like Figma and Visily. Experienced with version control
              (Git) and project management (Jira, Planio). Passionate about
              delivering high-quality, intuitive, and performant solutions
              across both frontend and backend technologies.
            </p>

            <h3>Work Experience</h3>
            <p>
              <span className="job-title">
                D-Aces India Private Limited (Data Aces)
              </span>
              <br />
              Chennai, India • (05/2022 - Present)
            </p>

            <h3>Key Projects</h3>
            <p>
              <span className="job-title">Kaitongo - Frontend Developer</span>
              <br />
              India • 02/2023 - 12/2024
            </p>
            <ul>
              <li>
                Enhanced advanced search functionality, implemented role-based
                interfaces, and optimized the mobile experience.
              </li>
              <li>
                Improved newsletter rendering using Jinja, added custom
                templates, and advanced report filtering and scheduling.
              </li>
              <li>
                Worked on optimizing API performance, implementing prompt
                updates, and enhancing news accuracy through AI retries.
              </li>
              <li>
                Contributed to performance tuning in Weaviate and OpenSearch and
                collaborated with cross-functional teams to refine UI,
                newsletters, and system tracking features.
              </li>
            </ul>

            <p>
              <span className="job-title">
                DSR (Daily Status Report) - Full Stack Developer
              </span>
              <br />
              India • 08/2022 - 01/2023
            </p>
            <ul>
              <li>
                Developed and enhanced a system for managing daily status
                reports, including features for tracking work updates, leave
                management, and storing employee details.
              </li>
              <li>
                Implemented modules for daily submissions, admin views, and
                report generation.
              </li>
              <li>
                Focused on creating a responsive UI and ensuring data accuracy
                with validation and optimization logic.
              </li>
            </ul>

            <p>
              <span className="job-title">
                Resume Builder - UI/UX Developer
              </span>
              <br />
              India • 01/2025 - Present
            </p>
            <ul>
              <li>
                Developed and refined resume templates, improving layout
                consistency and preview page design.
              </li>
              <li>
                Enhanced template selection flows and implemented admin-level
                controls for better content management.
              </li>
              <li>
                Integrated AI-based features for document upload, content
                rephrasing, smart summary generation, and skill suggestions.
              </li>
              <li>
                Improved UI responsiveness and tested modules for performance
                and functionality.
              </li>
            </ul>

            <p>
              <span className="job-title">ClearVault - Frontend Developer</span>
              <br />
              India • 02/2025 - 04/2025
            </p>
            <ul>
              <li>
                Improved UI consistency across file upload modules in CR
                requests, chat, and projects.
              </li>
              <li>
                Redesigned modals and layouts to enhance the user experience and
                streamline workflows.
              </li>
              <li>
                Maintained the notification system and collaborated on API
                integration and system responsiveness.
              </li>
              <li>
                Contributed to improving the end-to-end construction site
                building process through optimized UI flows.
              </li>
            </ul>

            <p>
              <span className="job-title">D-ACES (Ace AI) - UI/UX Design</span>
              <br />
              India • 02/2025 - 03/2025
            </p>
            <ul>
              <li>
                Redesigned UI wireframes to improve usability and streamline
                layout structures.
              </li>
              <li>
                Collaborated with developers and designers to implement a
                modern, consistent interface.
              </li>
              <li>
                Contributed to smooth migration from legacy systems through
                testing and bug resolution.
              </li>
            </ul>

            <p>
              <span className="job-title">
                Bleubird (Oil & Gas) - UI Developer
              </span>
              <br />
              India • 01/2025 - 01/2025
            </p>
            <ul>
              <li>
                Developed a financial performance dashboard featuring industry,
                company, and ratio-based comparisons.
              </li>
              <li>
                Implemented AI-generated insights from real-time chart data and
                enhanced data intelligence features.
              </li>
              <li>
                Optimized validation logic and improved overall dashboard
                performance through code refinement.
              </li>
            </ul>
          </div>

          <div className="right">
            <h3>Education</h3>
            <p>
              <span className="edu-title">
                Alagappa Chettiar Government College of Engineering & Technology
              </span>
              <br />
              Karaikudi, TamilNadu • 05/2018
              <br />
              <div className="subtext">
                <b>B.E</b> Electronics and Communication Engineering
              </div>
            </p>

            <h3>Certifications / Training</h3>
            <p>HTML & CSS - certification course for beginners, 09/20</p>
            <p>JavaScript Algorithms and Data Structures, 08/21</p>

            <h3>Tech Skills</h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>ReactJS</li>
              <li>NodeJS</li>
              <li>Bootstrap</li>
              <li>Wix</li>
              <li>Visily</li>
              <li>Postman</li>
              <li>GrapesJS</li>
              <li>MongoDB</li>
              <li>Git</li>
            </ul>

            <h3>Language</h3>
            <ul>
              <li>English</li>
              <li>Tmmil</li>
            </ul>
          </div>
        </div>
      </div> */}

      <style>
        {`body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5; /* Light gray background */
}

.resume-container {
  max-width: 900px; /* Adjust as needed */
  margin: 40px auto; /* Center the main container */
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: auto 1fr; /* Header row, then content row */
  position: relative; /* Needed for positioning the floating box */
}

.resume-header {
  background-color: #f0f0f0; /* Lighter gray for the header background */
  padding: 20px 0; /* Vertical padding */
  text-align: center;
  position: relative; /* For z-index if needed */
  z-index: 1; /* Ensure header is above the content */
}

.resume-header-content {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 20px 30px;
  display: inline-block; /* To make the box size to its content */
  margin-top: -50px; /* Pull it up to appear above the header */
  position: relative;
  z-index: 2; /* Ensure it's above the header */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Slight shadow */
}

.resume-header-content h1 {
  margin: 0;
  font-size: 1.8em;
  color: #333;
}

.resume-header-content p {
  margin: 5px 0 0;
  font-size: 1.1em;
  color: #666;
}

.resume-main-content {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Left column 1 part, Right column 2 parts */
  gap: 20px; /* Space between columns */
  padding: 20px;
  padding-top: 0; /* Remove top padding as the header content overlaps */
}

.resume-left-column {
  background-color: #f9f9f9; /* Slightly different background for left column */
  padding: 20px;
  padding-top: 80px; /* Create space for the floating box */
  position: relative; /* For relative positioning of the floating box */
}

.resume-right-column {
  background-color: #ffffff;
  padding: 20px;
}

.resume-floating-box {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 20px;
  position: absolute; /* Position it relative to its parent (left-column) */
  top: -50px; /* Adjust this to control how much it floats above */
  left: 20px; /* Align with left padding of left-column */
  right: 20px; /* Align with right padding of left-column */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 3; /* Ensure it's on top */
}

.resume-floating-box h2,
.resume-right-column h2,
.resume-section h3 {
  margin-top: 0;
  font-size: 1.2em;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.resume-floating-box p,
.resume-section p,
.resume-section ul {
  margin: 5px 0;
  font-size: 0.9em;
  color: #555;
}

.resume-section ul {
  list-style: none; /* Remove default bullet points */
  padding: 0;
}

.resume-section ul li {
  margin-bottom: 5px;
}`}
      </style>

      <div className="resume-container">
        <header className="resume-header">
          <div className="resume-header-content">
            <h1>John Doe</h1>
            <p>Software Engineer</p>
          </div>
        </header>

        <div className="resume-main-content">
          <div className="resume-left-column">
            <div className="resume-floating-box">
              <h2>INFO</h2>
              <p>Address: Chennai, India</p>
              <p>Phone: 1234567890</p>
              <p>Email: example@gmail.com</p>
            </div>
            {/* Other content for the left column goes here */}
            <div className="resume-section">
              <h3>Skills</h3>
              <ul>
                <li>React.js</li>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>CSS</li>
              </ul>
            </div>
          </div>

          <div className="resume-right-column">
            <h2>PROFILE</h2>
            <p>
              Motivated Data Visualization Engineer with 3 years of experience
              specializing in Spotfire, Power BI, SQL, and Python. Skilled in
              advanced data analytics and visualization, with a strong
              background in designing scalable relational and NoSQL database
              solutions.
            </p>
            {/* Other content for the right column goes here */}
            <div className="resume-section">
              <h3>Experience</h3>
              <h4>Software Engineer at Tech Solutions</h4>
              <p>Jan 2022 - Present</p>
              <ul>
                <li>Developed and maintained web applications.</li>
                <li>Collaborated with cross-functional teams.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
