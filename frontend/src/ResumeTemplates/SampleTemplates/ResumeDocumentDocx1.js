import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";

const ResumeDocumentDocx1 = ({
  selectedTemplate,
  isPreview = false,
  isDownload = false,
  fontFamilyProp,
  fontSizeProp,
  lineHeightProp,
}) => {
  // Dynamic styles and data
  console.log("*********************", selectedTemplate);

  const textSize = isPreview
    ? "6pt"
    : `${selectedTemplate.template_styles.textSize}pt`;
  const headSize = isPreview
    ? "8pt"
    : `${selectedTemplate.template_styles.headSize}pt`;

  return (
    <div
      style={{
        borderRadius: "5px",
        // border: !isPreview ? "" : "1px solid #eaeff0",
        width: isPreview ? "100%" : "100%",
        margin: isPreview ? "" : isDownload ? "0px" : "auto",
        backgroundColor: "#fff",
      }}
      id="resume_container"
    >
      <meta charset="UTF-8"></meta>
      <style>
        {`
        .editor-preview h1,
        .editor-preview h2,
        .editor-preview h3,
        .editor-preview h4,
        .editor-preview h5,
        .editor-preview h6 {
          font-family: ${fontFamilyProp};
          font-size: 14pt;
        }

        .editor-preview .heading {
          font-size: 12pt;
        }

        .editor-preview p,
        .editor-preview a,
        .editor-preview div {
          font-family: ${fontFamilyProp};
          font-size: 10pt;
          line-height: 15pt;
        }
        .custom-body p{
          margin:0px;
        }


        .right-align {
            text-align: right;
        }

        .starting {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .skills {
            display: grid;
            // gap: 30px;
            grid-template-columns: repeat(6, 1fr);
        }

        .skill {
            border-right: 1px solid orange;
            text-align: center;
        }

        .skill:nth-child(6n) {
            border-right: none;
        }

        page[size="A4"] {
            width: 21cm;
            height: 29.7cm;
        }

        // page {
        //     padding: 30px 5%;
        //     background: white;
        //     display: block;
        //     margin: 0 auto;
        //     // margin-bottom: 0.5cm;
        //     // box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        //     border: 1px solid #eaeff0;
        // }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 5px 0;
        }

        p {
            margin: 10px 0;
            color: #7f7f7f;
        }

        a {
            color: #678a50;
            text-decoration: none;
        }

        hr {
            border: none;
        }`}
      </style>
      <div className="editor-preview">
        <div
          className="editor-preview"
          style={{
            // border: isDownload ? "none" : "1px solid #eaeff0",
            padding: isDownload ? "0px" : "10px 5%",
          }}
        >
          <div
            className="editor-preview"
            size="A4"
            id="resume"
            style={{ padding: isDownload ? "0px" : "20px 5%" }}
          >
            <table
              className="editor-preview"
              style={{
                width: "100%",
                borderCollapse: "collapse", // Prevents gaps between cells
                margin: "0",
                padding: "0",
                border: "none",
              }}
              border={"none"}
            >
              <tr className="editor-preview">
                {/* Left Side */}
                <td
                  className="editor-preview"
                  style={{
                    textAlign: "left",
                    verticalAlign: "top",
                    padding: "0",
                    margin: "0",
                    width: "50%", // Adjust width as needed
                    lineHeight: "normal !important",
                  }}
                >
                  <div
                    className="editor-preview"
                    style={{
                      color: "#16365f",
                      fontSize: isPreview ? "11.25pt" : "16.5pt",
                      margin: "0",
                      lineHeight: "normal !important",
                    }}
                  >
                    {selectedTemplate.personaldetails.firstname +
                      " " +
                      selectedTemplate.personaldetails.lastname}
                  </div>
                  <div
                    className="mt-3 editor-preview"
                    style={{
                      color: "#d4731b",
                      fontSize: isPreview ? "9pt" : "14pt",
                      margin: "4px 0",
                      lineHeight: "normal !important",
                    }}
                  >
                    {selectedTemplate?.personaldetails?.role || ""}
                  </div>
                </td>

                {/* Right Side */}
                <td
                  className="editor-preview"
                  style={{
                    textAlign: "right",
                    verticalAlign: "top",
                    padding: "0",
                    margin: "0",
                    width: "50%", // Adjust width as needed
                  }}
                >
                  <p
                    className="editor-preview"
                    style={{ color: "#999999", margin: "2px 0" }}
                  >
                    {selectedTemplate?.personaldetails?.phone}
                  </p>
                  <p
                    className="editor-preview"
                    style={{ color: "#999999", margin: "2px 0" }}
                  >
                    {selectedTemplate?.personaldetails?.city}
                    {selectedTemplate?.personaldetails?.city && selectedTemplate?.personaldetails?.country ? ', ' : ''}
                    {selectedTemplate?.personaldetails?.country}
                  </p>
                  <p className="editor-preview" style={{ margin: "2px 0" }}>
                    <a
                      className="editor-preview"
                      href={`mailto:${selectedTemplate?.personaldetails?.email}`}
                      style={{ color: "#678a50", textDecoration: "none" }}
                    >
                      {selectedTemplate.personaldetails?.email}
                    </a>
                  </p>
                </td>
              </tr>
            </table>

            {selectedTemplate?.summary?.value?.trim() !== "<p><br></p>" && (
              <div
                className="heading editor-preview"
                style={{
                  color: "#16365f",
                  paddingTop:
                    selectedTemplate?.summary?.value?.trim() === "<p><br></p>"
                      ? "10px"
                      : isPreview
                      ? "10px"
                      : "20px",
                  margin: "4px 0",
                  marginTop:
                    selectedTemplate?.summary?.value?.trim() === "<p><br></p>"
                      ? "10px"
                      : isPreview
                      ? "10px"
                      : "15px",
                  borderTop: "1px solid #d4731b",
                }}
              >
                PROFESSIONAL PROFILE
              </div>
            )}
            <div
              className="editor-preview"
              dangerouslySetInnerHTML={{
                __html: selectedTemplate.summary.value,
              }}
              style={{
                color:'rgb(127, 127, 127)',
                margin: "4px 0",
                marginBottom: "10px",
                display:
                  selectedTemplate?.summary?.value?.trim() === "<p><br></p>"
                    ? "none"
                    : "block",
                textAlign: "justify",
              }}
            ></div>

            {selectedTemplate?.skills?.value?.length > 0 && (
              <div
                className="heading editor-preview"
                style={{
                  paddingTop:
                    selectedTemplate?.summary?.value?.trim() === "<p><br></p>"
                      ? "0px"
                      : isPreview
                      ? "10px"
                      : "20px",
                  borderTop:
                    selectedTemplate?.summary?.value?.trim() !== "<p><br></p>"
                      ? "1px solid rgb(195, 200, 199)"
                      : "none",
                  color: "#16365f",
                }}
              >
                TECH SKILLS
              </div>
            )}
            <table
              className="editor-preview"
              style={{
                width: "100%",
                marginBottom: "12px",
                margin: "10px 0 24px",
              }}
            >
              <tbody className="editor-preview">
                {selectedTemplate?.skills?.value
                  ?.reduce((rows, skill, index) => {
                    // Create a new row every 6 skills
                    if (index % 6 === 0) rows.push([]);
                    rows[rows.length - 1].push(skill);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <tr className="editor-preview" key={rowIndex}>
                      {row.map((skill, cellIndex) => (
                        <td
                          className="editor-preview"
                          key={cellIndex}
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            // height:"7pt"
                            // borderRight: cellIndex === row.length - 1 ? "none" : "1px solid orange",
                          }}
                        >
                          <p
                            className="editor-preview"
                            style={{
                              height: "20px", // or whatever fixed height you want
                              lineHeight: "20px", // optional, for vertical alignment
                              // display: "inline-block",
                              fontSize: "10pt",
                              fontFamily: fontFamilyProp,
                              margin: 0,
                              borderRight:
                                cellIndex === row.length - 1
                                  ? "none"
                                  : "1px solid orange",
                            }}
                          >
                            {" "}
                            {skill}
                          </p>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <table
              className="editor-preview"
              style={{
                borderCollapse: "collapse",
                borderTop:
                  selectedTemplate?.skills?.value?.length > 0
                    ? "1px solid rgb(195, 200, 199)"
                    : "",
                width: "100%",
                borderCollapse: "collapse", // Prevents unwanted borders
                margin: "0",
                padding: "0",
              }}
            >
              <tr className="editor-preview">
                {/* Left Side - Education */}
               { (selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) &&
                <td
                  className="editor-preview"
                  style={{
                    textAlign: "left",
                    verticalAlign: "top",
                    padding: "0",
                    paddingTop:
                      selectedTemplate?.skills?.value?.length <= 0
                        ? "0px"
                        : isPreview
                        ? "10px"
                        : "20px",
                    margin: "0",
                    paddingRight:'7px',
                    width: "50%", // Adjust width as needed
                  }}
                >
                  {selectedTemplate.education?.value?.length > 0 && (
                    <div
                      className="heading editor-preview"
                      style={{
                        color: "#16365f",

                        margin: "4px 0",
                      }}
                    >
                      EDUCATION
                    </div>
                  )}

                  {selectedTemplate.education?.value.map((edu, index) => (
                    <div
                      className="editor-preview"
                      key={index}
                      style={{
                        margin: "4px 0",
                      }}
                    >
                      <div
                        className="editor-preview"
                        style={{
                          color: "#d4731b",
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div
                        className="editor-preview"
                        style={{ color: "#7f7f7f" }}
                      >
                        <i>
                          {edu.institution}
                          {edu.year && dayjs(edu.year, "YYYY").isValid()
                            ? (dayjs(edu.year, "YYYY").isAfter(dayjs())
                                ? ", Expected in "
                                : ", ") +
                              dayjs(edu.year, "YYYY").format("MMM YYYY")
                            : edu?.year}
                        </i>
                      </div>
                    </div>
                  ))}
                    {selectedTemplate?.experience?.value.length > 0 && (
                <div
                  className="heading editor-preview"
                  style={{
                    color: "#16365f",

                    marginTop:
                      selectedTemplate.education?.value?.length <= 0
                        ? "0px"
                        : isPreview
                        ? "10px"
                        : "20px",
                    // margin: "4px 0px",
                  }}
                >
                  WORK EXPERIENCE
                </div>
              )}
              {selectedTemplate?.experience?.value.map((job, index) => (
                <div
                  className="editor-preview"
                  key={index}
                  style={{
                    marginTop: index === 0 ? "0px" : "6px",
                    // lineHeight:'1.5',
                  }}
                >
                  <div
                    className="editor-preview"
                    style={{ color: "black", margin: "0px" }}
                  >
                    {job.position}
                  </div>
                  <div
                    className="editor-preview"
                    style={{ color: "#d4731b", marginTop: "4px" }}
                  >
                    <i className="editor-preview">
                      {job.company ? job.company : ""}
                      {job.location ? ` • ${job.location}` : ""}
                      {job.startDate && dayjs(job.startDate).isValid()
                        ? job.endDate === "Present" ||
                          !job.endDate ||
                          dayjs(job.endDate).isValid()
                          ? ` • (${dayjs(job.startDate).format("MMM YYYY")} - ${
                              job.endDate === "Present" || !job.endDate
                                ? "Present"
                                : dayjs(job.endDate).format("MMM YYYY")
                            })`
                          : ""
                        : ""}
                    </i>
                  </div>
                </div>
              ))}
                </td>
                }
                {/* Right Side - Certifications / Training */}
                <td
                  className="editor-preview"
                  style={{
                    textAlign: (selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) ? "right" : "",
                    verticalAlign: "top",
                    padding: "0",
                    paddingTop:
                      selectedTemplate?.skills?.value?.length <= 0
                        ? "0px"
                        : isPreview
                        ? "10px"
                        : "20px",
                    paddingLeft:(selectedTemplate.education?.value?.length > 0 || selectedTemplate?.experience?.value.length > 0) ? '7px' : '',
                    margin: "0",
                    width: "50%", // Adjust width as needed
                  }}
                >
                  {selectedTemplate?.certificate?.value.length > 0 && (
                    <div
                      className="heading editor-preview"
                      style={{
                        color: "#16365f",

                        margin: "4px 0",
                      }}
                    >
                      CERTIFICATIONS / TRAINING
                    </div>
                  )}

                  {selectedTemplate?.certificate?.value.map((cert, index) => (
                    <div
                      className="editor-preview"
                      key={index}
                      style={{
                        margin: "4px 0",
                      }}
                    >
                      <div
                        className="editor-preview"
                        style={{ color: "#678a50" }}
                      >
                        {cert.name}
                      </div>
                      <div
                        className="editor-preview"
                        style={{ color: "#898989" }}
                      >
                        {dayjs(cert?.year, "YYYY").isValid()
                          ? dayjs(cert?.year, "YYYY").format("MMM YYYY")
                          : cert?.year}
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            </table>

            <div className="editor-preview">
            
              {selectedTemplate.projects.value.length > 0 && (
                <div
                  className="heading editor-preview"
                  style={{
                    color: "#16365f",

                    marginTop: isPreview ? "10px" : "20px",
                    marginBottom: "0px",
                  }}
                >
                  KEY PROJECTS
                </div>
              )}
              {selectedTemplate?.projects?.value.map((pro, index) => (
                <div
                  className="heading editor-preview"
                  key={index}
                  style={{
                    marginTop: index === 0 ? "0px" : "0px",
                    textAlign: "justify",
                    fontSize: "10pt",
                  }}
                >
                  <div
                    className="editor-preview"
                    style={{
                      color: "black",
                      margin: "0px",
                      marginTop:
                        pro?.client_name?.trim() !== "" ? "4px" : "0px",
                    }}
                  >
                    {pro.role}
                  </div>

                  <div className="editor-preview" style={{ marginTop: "4px" }}>
                    <div className="editor-preview">
                      <div
                        className="editor-preview"
                        style={{
                          color: "#d4731b",
                          margin: "4px 0px",
                          fontStyle: "italic",
                        }}
                      >
                        {pro?.client_name?.trim() ? pro.client_name : ""}
                        {pro.name ?`${pro?.client_name?.trim() ? ' • ':''}  ${pro.name}` : ""}
                        {pro.location ? ` • ${pro.location}` : ""}
                        {pro.startDate && dayjs(pro.startDate).isValid()
                          ? pro.endDate === "Present" ||
                            !pro.endDate ||
                            dayjs(pro.endDate).isValid()
                            ? ` • (${dayjs(pro.startDate).format(
                                "MMM YYYY"
                              )} - ${
                                pro.endDate === "Present" || !pro.endDate
                                  ? "Present"
                                  : dayjs(pro.endDate).format("MMM YYYY")
                              })`
                            : ""
                          : ""}
                      </div>
                       <div style={{ color: "#678a50" }}>
                        <span style={{color:'#222222'}}>{pro?.technology && "Technology/Tools - "}</span>
                        {pro?.technology?.split(",").filter(Boolean).join(" • ")}
                       </div>
                    </div>
                    <div
                      className="editor-preview"
                      style={{
                        // paddingBottom:"10px",
                        marginBottom: "10px",
                        color: "rgb(127, 127, 127)",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${pro.description}`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {selectedTemplate?.custom?.map((section, index) => {
              const isEmpty = section.value?.trim() === "<p><br></p>";

              return !isEmpty ? (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div
                    className="heading editor-preview"
                    style={{
                      color: "#16365f",
                      // paddingTop: "10px",
                      // borderTop: "1px solid #d4731b",
                    }}
                  >
                    {section.label?.toUpperCase()}
                  </div>

                  <div
                    className="editor-preview custom-body"
                    dangerouslySetInnerHTML={{ __html: section?.value }}
                    style={{
                     color:'rgb(127, 127, 127)',
                      margin: "4px 0",
                      textAlign: "justify",
                    }}
                  ></div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDocumentDocx1;
