// Resume_template_4pdf.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#666",
    flexDirection: "row",
    backgroundColor: "#fff",
    lineHeight: '14pt',
  },
  sideImage: {
    width: 35, // or any desired thickness
    height: "100%",
},
content: {
    flex: 1,
    padding: 30,
},
profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
},
name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "1pt solid #ccc",
    letterSpacing: 5,
    marginBottom: 10,
    paddingBottom: 30,
    color:"#333"
  },
  section: {
    paddingTop: 10,
    borderTop: "1pt solid #ccc",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    paddingBottom: 3,
    color:"#333"
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 10,
  },
  subtitle: {
    fontSize: 9,
    color: "#555",
  },
  bullet: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 2,
  },
    rightsection: {
        width:"60%",
        paddingRight: 10,
    },
    leftsection: {
        width:"40%",
        paddingLeft: 10,
    },
});
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr === "Present"
      ? "Present"
      : dayjs(dateStr).format("MMM YYYY");
  };
const Resume_template_4pdf = ({ selectedTemplate }) => {
    const { personaldetails, summary, experience, education, skills, contact } =
      selectedTemplate;
  
    return (
      <Document>
        <Page style={styles.page}>
          {/* Left-side decorative image */}
          <View>
          <Image
            src="https://configservicestoragetest.blob.core.windows.net/livecareerrepository/Images/leafbackground.png"
            style={styles.sideImage}
          />
          </View>
  
          {/* Main content area */}
          <View style={styles.content}>
            {/* Name Header */}
            <Text style={styles.name}>
              {personaldetails.firstname} {personaldetails.lastname}
            </Text>
  
            {/* Two-column layout */}
            <View style={{ flexDirection: "row", gap: 20 }}>
              {/* Left Section */}
              <View style={styles.rightsection}>
                <View style={{...styles.section,borderTop: "none",}}>
                  <Text style={styles.sectionTitle}>SUMMARY</Text>
                  <Html style={{...styles.text,marginBottom:-2,marginTop:-9}}>{summary.value}</Html>
                </View>
  
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                  {experience.value.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 5 }}>
                        <View>
                        <Text style={styles.subtitle}>
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </Text>
                        </View>
                      <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{exp.position}</Text>
                      </View>
                      <Text style={styles.subtitle}>
                        {exp.company}, {exp.location}
                      </Text>
                      <Html style={{...styles.bullet,marginTop:-4,marginBottom:-9}}>{exp.responsibilities}</Html>
                    </View>
                  ))}
                </View>
  
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>EDUCATION</Text>
                  {education.value.map((edu, i) => (
                    <Text key={i} style={styles.text}>
                      {edu.degree} - {edu.institution} ({edu.year})
                    </Text>
                  ))}
                </View>
              </View>
  
              {/* Right Section */}
              <View style={styles.leftsection}>
                <View style={{...styles.section,borderTop: "none",}}>
                  <Text style={styles.sectionTitle}>CONTACT</Text>
                  <Text style={styles.text}>{personaldetails.email}</Text>
                  <Text style={styles.text}>{personaldetails.phone}</Text>
                  <Text style={styles.text}>
                    {personaldetails.city}, {personaldetails.country}
                  </Text>
                </View>
  
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>SKILLS</Text>
                  {skills.value.map((skill, i) => (
                    <Text key={i} style={styles.text}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };
  

export default Resume_template_4pdf;
