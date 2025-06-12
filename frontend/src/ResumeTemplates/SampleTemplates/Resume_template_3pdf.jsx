import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import Html from "react-pdf-html";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#444",
    padding: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    lineHeight: "14pt",
  },
  leftColumn: {
    width: "35%",
    paddingRight: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  rightColumn: {
    width: "65%",
    paddingLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    border: "2px solid #999",
    marginBottom: 10,
  },
  headerBox: {
    border: "1pt solid #999",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    width: "80%",
    marginLeft: -60,
    marginTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 8,
    color: "#555",
  },
  subtitle: {
    fontSize: 9,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#555",
    marginBottom: 8,
    borderBottom: "1.2px solid #999",
    paddingBottom: 2,
    width: "100%",
  },
  subtitle2: {
    fontSize: 9,
    color: "#666",
  },
  dotRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#444",
    marginRight: 2,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 550,
    color: "#222",
  },
  jobDate: {
    fontSize: 9,
    fontWeight: 500,
    color: "#444",
  },
  jobDesc: {
    marginBottom: 0,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5, // Add spacing between each info row
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "left", // Left align the label
  },
  value: {
    fontSize: 9,
    textAlign: "right", // Right align the value
  },
});

const Resume_template_3pdf = ({ selectedTemplate }) => {
  const {
    personaldetails,
    summary,
    experience,
    education,
    skills,
    hobbies,
    languages,
    achievements,
    custom,
  } = selectedTemplate;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr === "Present"
      ? "Present"
      : dayjs(dateStr).format("MMM YYYY");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* LEFT COLUMN */}
        {/* <View style={styles.row}>
                <View style={styles.leftInfo}></View>

                <View style={styles.centerContainer}>
                <View style={styles.box}>
                    <Text style={styles.title}>
                    {personaldetails.firstname} {personaldetails.lastname}
                    </Text>
                    <Text style={styles.subtitle}>{personaldetails.role}</Text>
                </View>
                </View>
            </View> */}
        <View style={styles.leftColumn}>
          {/* <Image
            src={
              personaldetails?.image ||
              "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
            }
            style={styles.profileImage}
          /> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 90,
            }}
          >
            <Text style={styles.sectionTitle}>INFO</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              {personaldetails.city}
              {personaldetails.country ? `, ${personaldetails.country}` : ""}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{personaldetails.phone}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{personaldetails.email}</Text>
          </View>

          {skills?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              {skills.value.map((skill, i) => (
                <Text key={i} style={styles.subtitle2}>
                  • {skill}
                </Text>
              ))}
            </>
          )}

          {languages?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              {languages.value.map((lang, i) => (
                <View key={i}>
                  <Text style={styles.subtitle2}>{lang.name}</Text>
                  <View style={styles.dotRow}>
                    {[...Array(lang.level)].map((_, j) => (
                      <View key={j} style={styles.dot} />
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}

          {hobbies?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>HOBBIES</Text>
              <Text style={styles.subtitle2}>{hobbies.value.join(", ")}</Text>
            </>
          )}
        </View>

        {/* RIGHT COLUMN */}
        <View style={{ ...styles.rightColumn, marginTop: 10 }}>
          <View style={styles.headerBox}>
            <Text style={styles.title}>
              {personaldetails.firstname} {personaldetails.lastname}
            </Text>
            <Text style={styles.subtitle}>{personaldetails.role}</Text>
          </View>

          {summary?.value && (
            <>
              <Text style={{ ...styles.sectionTitle, marginTop: 20 }}>
                PROFILE
              </Text>
              <Html
                style={{
                  fontSize: 9,
                }}
              >
                {summary?.value}
              </Html>
            </>
          )}

          {experience?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {experience.value.map((exp, i) => (
                <View key={i} style={styles.jobDesc}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>
                      {exp.position}, {exp.company}
                    </Text>
                    <Text style={styles.jobDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={{ ...styles.subtitle2, marginBottom: -10 }}>
                    {exp.location}
                  </Text>
                  <Html
                    style={{
                      fontSize: 9,
                      margin: 0, // Removes any default margin
                      padding: 0,
                    }}
                  >
                    {exp.responsibilities}
                  </Html>
                </View>
              ))}
            </>
          )}

          {education?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {education.value.map((edu, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.subtitle2}>
                    {edu.institution} | {edu.marks}%
                  </Text>
                  <Text style={styles.subtitle2}>{formatDate(edu.year)}</Text>
                </View>
              ))}
            </>
          )}

          {achievements?.value?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
              {achievements.value.map((ach, i) => (
                <View key={i}>
                  <Text style={styles.jobTitle}>{ach.name}</Text>
                  <Text style={styles.subtitle2}>{ach.description}</Text>
                </View>
              ))}
            </>
          )}

          {custom?.map((section, i) => {
            if (!section.value || section.value.trim() === "<p><br></p>")
              return null;
            return (
              <View key={i}>
                <Text style={styles.sectionTitle}>
                  {section.label.toUpperCase()}
                </Text>
                <Text style={styles.subtitle2}>{section.value}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Resume_template_3pdf;
