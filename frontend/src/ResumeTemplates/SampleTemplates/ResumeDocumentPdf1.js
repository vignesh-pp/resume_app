import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, Link, Font } from "@react-pdf/renderer";
import dayjs from "dayjs";
import Html from 'react-pdf-html';
// Styles for PDF
Font.registerHyphenationCallback((word) => [word]); 
// Resume PDF Component
const ResumeDocumentPdf1 = ({selectedTemplate}) => {
  const processHtml = (html) => {
    // Wrap <u>, <em>, and <strong> tags (even if they have attributes) with <span>
    const wrappedHtml = html
      .replace(/(<u\b[^>]*>[\s\S]*?<\/u>)/gi, '<span>$1</span>')
      .replace(/(<em\b[^>]*>[\s\S]*?<\/em>)/gi, '<span>$1</span>')
      .replace(/(<strong\b[^>]*>[\s\S]*?<\/strong>)/gi, '<span>$1</span>');
    
    // Add spacing between adjacent spans
    return wrappedHtml.replace(/<\/span>\s*<span/g, '</span> <span');
  };
  
    const styles = StyleSheet.create({
      page: {
        padding: 55,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#333",
        // lineHeight:1.2
      },
      section: {
        marginBottom: 15,
        paddingBottom: 15,
        // lineHeight:1.2
      },
      heading: {
        fontSize: 13,
        color: "#16365f",
        // fontWeight: "bold",
        marginBottom: 7,
        // lineHeight:1.2
      },
      subHeading: {
        fontSize: 12,
        color: "#d4731b",
        // lineHeight:1.2
      },
      text: {
        fontSize: 11,
        color: "#7f7f7f",
        lineHeight:1.2
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        lineHeight:1.2
      },
      skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between", // Evenly distribute items
        lineHeight:1.2
      },
      skill: {
        fontSize: 10,
        textAlign: "center",
        width: "16.6%", // 100% / 6 columns
        borderRight: "1px solid orange",
        marginBottom: 5,
        lineHeight:1.2
      },
      lastSkill: {
        borderRight: "none", // Removes border for the last item in each row
        lineHeight:1.2
      },
      starting: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        alignTtems: "center",
        lineHeight:1.2
    },
      column: {
        flexDirection: "column",
        lineHeight:1.2
        // justifyContent: "space-between",
        // alignTtems: "center",
    },
    sectionContainer: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 13,
      color: "#16365f",
      // fontWeight: "bold",
      marginBottom: 7,
    },
    sectionBody: {
      color: '#999999',
      fontSize: 10,
      textAlign: 'justify',
    },
    });
    
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    console.log(selectedTemplate,'selectedtemplate');
    
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Details */}
      <View style={[styles.section, { display:"flex",justifyContent:"space-between",flexDirection:"row",

        borderBottomWidth: 1,
        borderBottomColor: "#d4731b",
        borderBottomStyle: "solid",

         }]}>
      <View style={{ flexDirection: "column" }}> 
        <Text style={[styles.heading,{fontSize:"18px"}]}>
          {capitalizeFirstLetter(selectedTemplate.personaldetails.firstname)} {capitalizeFirstLetter(selectedTemplate.personaldetails.lastname)}
        </Text>
        <Text style={[styles.subHeading,{fontSize:"16px"}]}>
          {selectedTemplate.personaldetails.role}
        </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-end",}}> 
          <Text style={[styles.text, { textAlign: "right" }]}>
            {selectedTemplate.personaldetails.phone}
          </Text>
          <Text style={[styles.text, { textAlign: "right" }]}>
          {selectedTemplate?.personaldetails?.city}
          {selectedTemplate?.personaldetails?.city && selectedTemplate?.personaldetails?.country ? ', ' : ''}
          {selectedTemplate?.personaldetails?.country}
          </Text>
          <Link src={`mailto:${selectedTemplate?.personaldetails?.email}`} style={[styles.text, 
            { textAlign: "right",
            textDecoration:'none',
            color:"#678a50" }]}>
            {selectedTemplate?.personaldetails?.email}
          </Link>
        </View>
      </View>

      {/* Summary */}
      <View style={[styles.section,{   
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        borderBottomStyle: "solid",
        display: selectedTemplate?.summary?.value?.trim() === "<p><br></p>" ? "none" : "block",
        }]}>
        {selectedTemplate?.summary?.value?.trim() !== "<p><br></p>" && 
        <Text style={styles.heading}>PROFESSIONAL PROFILE</Text>
          }
         <Html style={[styles.text,{textAlign:"justify",lineHeight:1.2,fontSize: 11,color:'rgb(127, 127, 127)'}]}>
              { processHtml(selectedTemplate.summary.value)}
            </Html>
      </View>

      {/* Skills */}
      <View style={[styles.section,{   
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        borderBottomStyle: "solid",
        display: selectedTemplate?.skills?.value?.length <= 0 ? 'none' : 'block',
        }]}>
        {selectedTemplate?.skills?.value?.length > 0 && 
        <Text style={styles.heading}>TECH SKILLS</Text>
        }
        <View style={styles.skillsContainer}>
          {selectedTemplate.skills.value.map((skill, index) => (
            <Text
              key={index}
              style={[
                styles.skill,
                (index + 1) % 6 === 0 ? styles.lastSkill : {}, // Remove border for every 6th element
                {color:"#7f7f7f",padding:"3px"}
              ]}
            >
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Education */}
      <View style={[styles.section, { flexDirection: "row", justifyContent: "space-between" ,marginBottom:7,paddingBottom:7 }]}>
        {/* Education Section (Left) */}
      {(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) &&
          <View style={{ flex: 1 }}>
        {selectedTemplate?.education?.value?.length > 0 && 
         <Text style={styles.heading}>EDUCATION</Text>
        }
          {selectedTemplate?.education?.value?.map((edu, index) => (
            <View key={index} style={{lineHeight:0.9,}}>
              <Text style={styles.subHeading}>{edu.degree}</Text>
              <Text style={[styles.text,{fontStyle:"italic",}]}>
              {edu.institution}
              {edu.year && dayjs(edu.year, "YYYY").isValid()
                ? (dayjs(edu.year, "YYYY").isAfter(dayjs()) 
                  ? ", Expected in " 
                  : ", ") + dayjs(edu.year, "YYYY").format("MMM YYYY")
                : edu?.year}
                </Text>
            </View>
          ))}
      {/* Work Experience */}
      <View >
      {selectedTemplate?.experience?.value.length > 0 &&
      <Text style={{...styles.heading, marginTop: selectedTemplate?.education?.value?.length > 0 ? "10px" : "0px"}}>WORK EXPERIENCE</Text>
        }
        {selectedTemplate.experience.value.map((job, index) => (
          <View key={index} style={{lineHeight:0.8,marginBottom:4}}>
            <Text style={[styles.subHeading,{color: "black"}]}>{job.position}</Text>
            <Text style={[{fontStyle:"italic",color:'#d4731b',fontSize: 11}]}>
            {job.company ? job.company : ""} 
                      {job.location ? ` • ${job.location}` : ""} 
                      {job.startDate && dayjs(job.startDate).isValid() 
                    ? (job.endDate === "Present" || !job.endDate || dayjs(job.endDate).isValid() 
                        ? ` • (${dayjs(job.startDate).format("MMM YYYY")} - ${job.endDate === "Present" || !job.endDate ? "Present" : dayjs(job.endDate).format("MMM YYYY")})` 
                        : "")
                    : ""}
              </Text>
            {/* <Text style={styles.text}>{job.responsibilities}</Text> */}
          </View>
        ))}
      </View>
        </View>}

        {/* Certifications Section (Right) */}
        <View style={{ flex: 1, alignItems:(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) ? "flex-end" : '',maxWidth: "40%",textAlign:(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0)  ? 'right' : '',wrap: false, }} >  
        { selectedTemplate?.certificate?.value?.length > 0 &&
        <Text style={styles.heading}>CERTIFICATIONS / TRAINING</Text>
          }
          {selectedTemplate?.certificate?.value?.map((cert, index) => (
            <View key={index} style={{  alignItems:(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0)  ? "flex-end" : '',wrap: false, }}>
              <Text  style={ {fontSize: 11, color: "#678a50", textAlign:(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) ? "right" : '',wordBreak: 'normal',wrap: false,}}>
                {cert?.name}</Text>
              <Text style={{...styles.text,marginTop:"3px",marginBottom: (index == selectedTemplate?.certificate?.value.length-1) ? '0px' : "6px"}}>
                {dayjs(cert?.year, "YYYY").isValid() ? dayjs(cert?.year, "YYYY").format("MMM YYYY") : cert?.year}
              </Text>
            </View>
          ))}
        </View>
      </View>


      {/* Projects */}
      <View style={[styles.section,{borderBottomColor:"none",marginBottom:3,paddingBottom:0}]}>
        {selectedTemplate.projects.value.length > 0 &&
        <Text style={[styles.heading,{marginBottom: 5}]}>KEY PROJECTS</Text>}
        {selectedTemplate.projects.value.map((project, index) => (
          <View key={index} style={{marginBottom:5,lineHeight:0.8}}>
            <Text style={[styles.subHeading,{color:"black"}]}>{project.role}</Text>
            <Text style={[{color: "#d4731b",fontStyle:"italic",marginBottom:5}]}>
            {project?.client_name?.trim() ? project.client_name : ""}
            {project.name ?`${project?.client_name?.trim()?' • ':''} ${project.name}` : ""}
            {project?.location ? ` • ${project?.location}` : ""}
            {project.startDate && dayjs(project.startDate).isValid() 
                    ? (project.endDate === "Present" || !project.endDate || dayjs(project.endDate).isValid() 
                        ? ` • (${dayjs(project.startDate).format("MMM YYYY")} - ${project.endDate === "Present" || !project.endDate ? "Present" : dayjs(project.endDate).format("MMM YYYY")})` 
                        : "")
                    : ""}
              </Text>
              <Text
  style={{
    color: "#678a50",
    marginBottom: 5,
    flexWrap: "nowrap",
    flexShrink: 1,
  }}
  numberOfLines={2} // Optional: Limit lines if needed
>
  <Text style={{ color: "#222222" }}>
    {project?.technology && "Technology/Tools - "}
  </Text>
  <Text>
    {project?.technology?.split(",").filter(Boolean).join(" • ")}
  </Text>
</Text>

            {/* <Text style={[styles.text,{textAlign:'justify'}]}> */}
            <Html style={  {
              fontSize: 11, color:'rgb(127, 127, 127)'}}>
              { processHtml(project.description)}
            </Html>
              {/* </Text> */}
          </View>
        ))}
      </View>
      {selectedTemplate?.custom?.map((section, index) => {
        const isEmpty = !section.value || section.value.trim() === "<p><br></p>";

        return !isEmpty ? (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.label?.toUpperCase()}</Text>
            <Text style={styles.sectionBody}>
            <Html style={{
              fontSize: 11,color:'rgb(127, 127, 127)'}}>
              { processHtml(section.value)}
            </Html>
            </Text>
          </View>
        ) : null;
      })}
      {/* Certifications */}
   
    </Page>
  </Document>
  );
};

export default ResumeDocumentPdf1;
