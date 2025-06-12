import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import dayjs from "dayjs";
import Photo from "../../Images/photo.png";
import Email from "../../Images/email.png";
import phone from "../../Images/phone.png";
import globe from "../../Images/globe.png";
import totalexp from "../../Images/totalexp.png";
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    flexDirection: "row",
    backgroundColor: "#fff",
    border: "4px solid #e5e3ee",
    lineHeight: 1.2,
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#e3e8fc",
    // alignItems: "center",
  },
  leftSideContent: {
    padding: 15,
    paddingTop: 0,
  },
  profileImage: {
    width: "100%",
    height: 150,
    // borderRadius: 50,
    marginBottom: 10,
    objectPosition: "top",
    objectFit: "cover",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
    textTransform: "uppercase",
    color: "#676fa9",
  },
  sectionTitleLeft: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
    textTransform: "uppercase",
    color: "#000",
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    color: "#6b7280",
  },
  date: {
    fontSize: 10,
    marginBottom: 3,
    color: "#676fa9",
    width: 55,
  },
  rightColumn: {
    width: "70%",
    padding: 20,
  },
  containerBox: {
    justifyContent: "center", // vertically centers if height is enough
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "black",
    // padding: 16,
    width: 250,
    // justifyContent: "center",  // vertically centers if height is enough
    // alignItems: "center",
  },
  boxContent: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center", // center the text horizontally
    width: "100%",
    color: "#676fa9",
    fontWeight: 550,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLine: {
    marginTop: 11,
    flex: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: "black",
  },
  bottomText: {
    fontWeight: "bold",
    backgroundColor: "white", // mask behind text if needed
    paddingHorizontal: 18,
    marginBottom: -10,
    fontWeight: 500,
    fontSize: 9,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#d9e2e9",
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
  },
  progressBarFill: {
    height: 4,
    borderRadius: 10,
    backgroundColor: "black",
  },
  rowCenter: {
    flexDirection: "row",
    marginTop: 4,
    // alignItems: 'center',
  },
  icon: {
    width: 12, // or whatever size you want
    height: 12,
    marginRight: 6,
    marginBottom: 0,
  },
  fieldContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
  },
  otherpersonaldetailsrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginBottom: 20,
  },
  timeline: {
    width: 20,
    alignItems: "center",
    flexDirection: "column",
    // height:'auto'
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#424a61",
    backgroundColor: "#fff", // 👈 Makes it hollow
    // marginBottom: 2,
  },

  line: {
    width: 1.5,
    flex: 1,
    minHeight: "100%", // ✅ Fixed height for visibility
    // height: '-webkit-fill-available',  // ✅ Fixed height for visibility
    backgroundColor: "#424a61",
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  boldText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  bullet: {
    fontSize: 10,
    marginTop: 4,
  },
});

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr === "Present" ? "Present" : dayjs(dateStr).format("MMM YYYY");
};

const Resume_template_5pdf = ({ selectedTemplate }) => {
  const { personaldetails, summary, experience, education, skills } =
    selectedTemplate;
  const progressBorderRight = 15;
  const progressBorderLeft = 25;
  const breakLongWords = (text, maxWordLength = 27) => {
    return text
      .match(new RegExp(`.{1,${maxWordLength}}`, 'g')) // chunk into fixed-length words
      .join(' '); // space between each
  };
  ;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.leftColumn}>
          {!personaldetails.image && (
            <Image
              src={selectedTemplate?.personaldetails?.photo || Photo}
              style={styles.profileImage}
            />
          )}
          {/* Personal Info */}
          <View style={styles.leftSideContent}>
            <Text style={styles.sectionTitleLeft}>Personal Information</Text>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: "#fff" },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderLeft}%` },
                ]}
              />
            </View>
            <View style={styles.rowCenter}>
              <Image src={Email} style={styles.icon} />
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email</Text>
                <Link
                  src={`mailto:${personaldetails?.email}`}
                  style={{
                    ...styles?.text,
                    fontSize: 9,
                    flexShrink: 1,   // allows the text to shrink and wrap
                    flexWrap: 'wrap',
                    wordBreak: 'break-word', // ensures long text wraps
                    textDecoration:"none",
                  }}
                >
                  {breakLongWords(personaldetails?.email)}
                </Link>
              </View>
            </View>
            <View style={styles.rowCenter}>
              <Image src={phone} style={styles.icon} />
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.text}> {personaldetails?.phone}</Text>
              </View>
            </View>
            {personaldetails?.totalexp && (
              <View style={styles.rowCenter}>
                <Image src={totalexp} style={styles.icon} />
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Total work experience</Text>
                  <Text style={styles.text}>{personaldetails?.totalexp}</Text>
                </View>
              </View>
            )}
            {personaldetails?.sociallink && (
              <View style={styles.rowCenter}>
                <Image src={globe} style={styles.icon} />
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Social Link</Text>
                  <Link
                    src={`${personaldetails?.sociallink}`}
                    style={{...styles.text,textDecoration:'none'}}
                  >
                    {breakLongWords(personaldetails?.sociallink)}
                  </Link>
                </View>
              </View>
            )}

            {/* Skills */}
            <Text style={styles.sectionTitleLeft}>Key Skills</Text>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: "#fff" },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderLeft}%` },
                ]}
              />
            </View>
            {skills.value.map((skill, i) => (
              <View key={i} style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 }}>
              <Text style={{ marginRight: 4 }}>•</Text>
              <Text style={{ ...styles.text, flex: 1 }}>
                {breakLongWords(skill)}
              </Text>
            </View>
            ))}

            {/* Other Details */}
            <Text style={styles.sectionTitleLeft}>Other Personal Details</Text>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: "#fff" },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderLeft}%` },
                ]}
              />
            </View>
            <View style={styles.otherpersonaldetailsrow}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.text}>
                {personaldetails?.city + ","} {personaldetails?.country}
              </Text>
            </View>
            {/* <View style={styles.otherpersonaldetailsrow}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.text}></Text>
            </View> */}

            {/* Languages */}
            {personaldetails?.languages &&
              personaldetails?.languages?.length > 0 && (
                <>
                  <Text style={styles.sectionTitleLeft}>Languages</Text>
                  <View
                    style={[
                      styles.progressBarBackground,
                      { backgroundColor: "#fff" },
                    ]}
                  >
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progressBorderLeft}%` },
                      ]}
                    />
                  </View>
                  {personaldetails?.languages?.map((lang, i) => (
                    <Text key={i} style={styles.text}>
                      • {lang}
                    </Text>
                  ))}
                </>
              )}

            {/* Education */}
            <Text style={{ ...styles.sectionTitleLeft, marginTop: 0 }}>
              Education
            </Text>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: "#fff" },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderLeft}%` },
                ]}
              />
            </View>
            {education.value.map((edu, i) => (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#676fa9",fontSize:10 }}>
                  {edu?.year && dayjs(edu?.year, "YYYY").isValid()
                    ? (dayjs(edu?.year, "YYYY").isAfter(dayjs())
                        ? ", Expected in "
                        : "") + dayjs(edu?.year, "YYYY").format("MMM YYYY")
                    : edu?.year}
                </Text>
                <View style={styles.content}>
                  <Text style={{ ...styles?.boldText, fontSize: 9 }}>
                    {edu?.degree}
                  </Text>
                  <Text style={{...styles?.subtitle,fontSize: 9}}>{edu?.institution}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Right Main Content */}
        <View style={styles.rightColumn}>
          {/* Name Header */}
          <View style={styles.containerBox}>
            <View style={styles.container}>
              <Text style={styles.boxContent}>
                {personaldetails?.firstname} {personaldetails?.lastname}
              </Text>

              <View style={styles.bottomRow}>
                <View style={styles.bottomLine} />
                <Text style={styles.bottomText}>{personaldetails?.role}</Text>
                <View style={styles.bottomLine} />
              </View>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Summary</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderRight}%` },
                ]}
              />
            </View>
            <Html
              style={{...styles.text,textAlign:"justify"}}
              stylesheet={{
                p: { margin: 0, padding: 0 ,marginTop: 1},
                ul: { margin: 0, paddingLeft: 10 },
                li: { marginBottom: 0 ,marginTop: 1 },
                ol: { marginBottom: 0 ,marginTop: 1 },
              }}
            >
              {(summary?.value|| "").replace(/<br\s*\/?>/gi, "")}
            </Html>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBorderRight}%` },
                ]}
              />
            </View>
            {experience?.value?.map((exp, i) => (
              <View style={{...styles.entryContainer,marginBottom: i !== experience?.value?.length -1 ? 3 : 0}}>
                {/* Timeline */}
                <Text style={styles.date}>
                  {formatDate(exp?.startDate)} - {formatDate(exp?.endDate)}
                </Text>
                <View style={styles.timeline}>
                  <View style={styles.circle} />
                  {i !== experience?.value?.length && (
                    <View style={styles.line} />
                  )}
                </View>

                {/* Content */}
                <View style={styles.content}>
                  <Text style={styles.subtitle}>{exp?.position}</Text>
                  <Text style={{...styles.boldText, marginBottom: 2}}>
                    {exp?.company} {exp?.location}
                  </Text>
                  {exp?.responsibilities?.split("\n")?.map((item, idx) => (
                    <Html
                      key={idx}
                      style={styles.text}
                      stylesheet={{
                        p: { margin: 0, padding: 0 ,marginTop: 1 },
                        ul: { margin: 0, paddingLeft: 10 },
                        li: { marginBottom: 0 ,marginTop: 1 },
                        ol: { marginBottom: 0 ,marginTop: 1 }, 
                      }}
                    >
                      {(item || "").replace(/<br\s*\/?>/gi, "")}
                    </Html>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View
            style={[
              styles.section,
              { borderBottomColor: "none", marginBottom: 3, paddingBottom: 0 },
            ]}
          >
            {selectedTemplate.projects.value.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressBorderRight}%` },
                    ]}
                  />
                </View>
              </View>
            )}
            {selectedTemplate?.projects?.value.map((project, index) => (
              <View key={index} style={{...styles.entryContainer,marginBottom: index!== selectedTemplate?.projects?.value?.length -1 ? 3 : 0}}>
                <Text style={styles.date}>
                  {formatDate(project?.startDate)} -{" "}
                  {formatDate(project?.endDate)}
                </Text>
                <View style={styles.timeline}>
                  <View style={styles.circle} />
                  {index !== experience?.value?.length && (
                    <View style={styles.line} />
                  )}
                </View>
                <View>
                  <Text style={[styles.subHeading, { color: "black" }]}>
                    {project.role}
                  </Text>
                  <Text style={styles.boldText}>
                    {project?.client_name?.trim() ? project.client_name : ""}
                    {project.name
                      ? `${project?.client_name?.trim() ? " • " : ""} ${
                          project.name
                        }`
                      : ""}
                    {project?.location ? ` • ${project?.location}` : ""}
                    {project.startDate && dayjs(project.startDate).isValid()
                      ? project.endDate === "Present" ||
                        !project.endDate ||
                        dayjs(project.endDate).isValid()
                        ? ` • (${dayjs(project.startDate).format(
                            "MMM YYYY"
                          )} - ${
                            project.endDate === "Present" || !project.endDate
                              ? "Present"
                              : dayjs(project.endDate).format("MMM YYYY")
                          })`
                        : ""
                      : ""}
                  </Text>
                  <Text
                    style={{
                      color: "#676fa9",
                      marginBottom: 2,
                      flexWrap: "nowrap",
                      flexShrink: 1,
                    }}
                    numberOfLines={2} // Optional: Limit lines if needed
                  >
                    <Text>
                      {project?.technology
                        ?.split(",")
                        .filter(Boolean)
                        .join(" • ")}
                    </Text>
                  </Text>

                  {/* <Text style={[styles.text,{textAlign:'justify'}]}> */}
                  <Html
                   key={index}
                   style={styles.text}
                    stylesheet={{
                      p: { margin: 0, padding: 0 ,marginTop: 1},
                      ul: { margin: 0, paddingLeft: 10 },
                      li: { marginBottom: 0 ,marginTop: 1 },
                      ol: { marginBottom: 0 ,marginTop: 1 },
                    }}
                  >
                    {(project.description || "").replace(/<br\s*\/?>/gi, "")}
                  </Html>
                  {/* </Text> */}
                </View>
              </View>
            ))}
          </View>
          {selectedTemplate?.custom?.map((section, index) => {
            const isEmpty =
              !section.value || section.value.trim() === "<p><br></p>";

            return !isEmpty ? (
              <View key={index} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {section.label?.toUpperCase()}
                </Text>
                <Text style={styles.sectionBody}>
                  <Html
                    stylesheet={{
                      p: { margin: 0, padding: 0 ,marginTop: 1 },
                      ul: { margin: 0, paddingLeft: 10 },
                      li: { marginBottom: 0 ,marginTop: 1},
                    }}
                  >
                    {(section.value || "").replace(/<br\s*\/?>/gi, "")}
                  </Html>
                </Text>
              </View>
            ) : null;
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Resume_template_5pdf;
