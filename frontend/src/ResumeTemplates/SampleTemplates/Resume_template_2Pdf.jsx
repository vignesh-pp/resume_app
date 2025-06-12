import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import dayjs from "dayjs";
const Resume_template_2Pdf = ({ isPreview = false, selectedTemplate }) => {
  const { personaldetails, summary, experience, education, achievements } =
    selectedTemplate;

  const formatDateToUI = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const date = new Date(`${year}-${month}-01`);
    return isNaN(date)
      ? dateStr
      : date.toLocaleString("default", { month: "short", year: "numeric" });
  };
  const processHtml = (html) => {
    // Wrap <u>, <em>, and <strong> tags (even if they have attributes) with <span>
    const wrappedHtml = html
      .replace(/(<u\b[^>]*>[\s\S]*?<\/u>)/gi, "<span>$1</span>")
      .replace(/(<em\b[^>]*>[\s\S]*?<\/em>)/gi, "<span>$1</span>")
      .replace(/(<strong\b[^>]*>[\s\S]*?<\/strong>)/gi, "<span>$1</span>");

    // Add spacing between adjacent spans
    return wrappedHtml.replace(/<\/span>\s*<span/g, "</span> <span");
  };
  const styles = StyleSheet.create({
    resumeContainer: {
      borderRadius: 5,
      border: "1px solid #eaeff0",
      width: "100%",
      padding: 55,
      backgroundColor: "#fff",
      fontSize: isPreview ? "8pt" : "11pt",
      color: "#444",
      lineHeight:'16pt',
    },
    body: {
      fontSize: isPreview ? "8pt" : "11pt",
    },
    title: {
      fontSize: isPreview ? "14px" : "20pt",
      fontWeight: "bold",
      color: "#444",
      marginBottom:7,
    },
    subtitle1: {
      fontSize: isPreview ? "9pt" : "13pt",
      color: "#555",
      marginBottom:3,
    },
    subtitle2: {
      fontSize: isPreview ? "8pt" : "11pt",
      color: "#555",
      marginBottom:3,
    },
    sectionTitle: {
      fontSize: isPreview ? "9pt" : "12pt",
      fontWeight: 600,
      marginTop: 0,
      marginBottom: 0,
      color: "#666",
      borderBottom: "1px solid #ccc",
      paddingBottom: 4,
    },
    jobTitle: {
      fontSize: isPreview ? "9pt" : "12pt",
      fontWeight: 550,
      color: "#222",
    },
    jobDate: {
      fontSize: isPreview ? "6pt" : "9pt",
      textAlign: "right",
      color: "#444",
      whiteSpace: "nowrap",
    },
    companyName: {
      fontSize: isPreview ? "8pt" : "11pt",
      color: "#2286d9",
      fontWeight: 500,
    },
    eduDegree: {
      color: "#222",
      fontWeight: 600,
      marginTop: 6,
    },
    eduinsti: {
      color: "#444",
    },
    keyBlue: {
      color: "#2286d9",
      fontWeight: 600,
      marginTop: 10,
    },
  });

  return (
    <Document>
      <Page style={styles?.resumeContainer}>
        <View>
          <Text style={styles.title}>
            {personaldetails?.firstname} {personaldetails?.lastname}
          </Text>
          <Text style={styles.subtitle1}>
            {personaldetails?.role
              .split(",")
              ?.map((role, index, array) => {
                const trimmedRole = role.trim();
                return index === array.length - 1
                  ? trimmedRole
                  : trimmedRole + " | ";
              })
              .join("")}
          </Text>
          <Text style={styles.subtitle2}>
            {personaldetails?.phone} {personaldetails?.email}{" "}
            {personaldetails?.city}, {personaldetails?.country}
          </Text>
        </View>
        {summary?.value?.trim() && (
          <View style={[styles?.sectionTitle, { marginTop: 4 }]}>
            <Text>SUMMARY</Text>
          </View>
        )}
        <Html
          style={{
            fontSize: isPreview ? 8 : 11,
          }}
        >
          {summary?.value}
        </Html>
        {experience?.value?.length > 0 && (
          <View style={styles.sectionTitle}>
            <Text>EXPERIENCE</Text>
          </View>
        )}
        {experience?.value?.map((exp, index) => (
          <View style={{ marginTop: 5 }}>
            <View key={index} style={{ flexDirection: "row" }}>
              {/* Left Side: Position and Company */}
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.jobTitle}>{exp?.position}</Text>
                <Text style={styles.companyName}>{exp?.company}</Text>
              </View>

              {/* Right Side: Location and Duration */}
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.jobDate}>{exp?.location}</Text>
                <Text style={styles.jobDate}>
                  {exp.startDate && dayjs(exp?.startDate).isValid()
                    ? exp?.endDate === "Present" ||
                      !exp?.endDate ||
                      dayjs(exp?.endDate).isValid()
                      ? ` ${dayjs(exp?.startDate).format("MMM YYYY")} - ${
                          exp?.endDate === "Present" || !exp?.endDate
                            ? "Present"
                            : dayjs(exp?.endDate).format("MMM YYYY")
                        }`
                      : ""
                    : ""}
                </Text>
              </View>
            </View>
            <View>
              <Html
                style={{
                  fontSize: isPreview ? 8 : 11,
                }}
              >
                {exp?.responsibilities}
              </Html>
            </View>
          </View>
        ))}
        {education?.value?.length > 0 && (
          <View style={styles.sectionTitle}>
            <Text>EDUCATION</Text>
          </View>
        )}
        {education?.value?.map((edu, index) => (
          <View key={index} style={{ flexDirection: "row",marginBottom:7 }}>
            <View style={{ width: "50%", paddingRight: 10 }}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              {"\n"}
              <Text style={styles.eduinsti}>{edu.institution}</Text>
            </View>
            <View style={{ width: "50%", paddingRight: 10,marginTop:3 }}>
              <Text style={styles.jobDate}>
                {edu.marks}%{"\n"}
                {formatDateToUI(edu.year)}
              </Text>
            </View>
          </View>
        ))}
        {achievements?.value?.length > 0 && (
          <View style={styles.sectionTitle}>
            <Text>KEY ACHIEVEMENTS</Text>
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", paddingRight: 10 }}>
            {achievements?.value
              ?.slice(0, Math.ceil(achievements.value.length / 2))
              ?.map((achievement, index) => (
                <View key={index}>
                  <Text style={styles.keyBlue}>{achievement?.name} </Text>
                  <Html
                    style={{
                      fontSize: isPreview ? 8 : 11,
                    }}
                  >
                    {achievement?.description}
                  </Html>
                </View>
              ))}
          </View>
          <View style={{ width: "50%" }}>
            {achievements?.value
              ?.slice(Math.ceil(achievements.value.length / 2))
              ?.map((achievement, index) => (
                <View key={index}>
                  <Text style={styles.keyBlue}>{achievement?.name}</Text>
                  <Html
                    style={{
                      fontSize: isPreview ? 8 : 11,
                    }}
                  >
                    {achievement?.description}
                  </Html>
                </View>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Resume_template_2Pdf;
