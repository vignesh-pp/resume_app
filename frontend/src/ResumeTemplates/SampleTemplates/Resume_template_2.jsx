import dayjs from "dayjs";
import React, { useEffect } from "react";

const Resume_template_2 = ({
  isPreview,
  selectedTemplate,
  fontFamilyProp,
  isDownload = false,
}) => {
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
  return (
    <div
      style={{
        borderRadius: "5px",
        // border: isDownload ? "none" : "1px solid #eaeff0",
        width: isPreview ? "100%" : "100%",
        padding: "6%",
        backgroundColor: "#fff",
      }}
       size="A4" id="resume"
    >
      <meta charset="UTF-8"></meta>
      <style>
        {`
          @page { size: A4; margin: 40px 70px; }
    .page-break { page-break-before: always; break-before: page; }
          .page {
            font-size: ${isPreview ? "8pt" : "11pt"};
            font-family: ${fontFamilyProp || "Arial"};
            background: #fff;
            color: #444;
          }
            .page, 
            .page p, 
            .page div, 
            .page span, 
            .page h1, 
            .page h2, 
            .page h3, 
            .page h4, 
            .page h5, 
            .page h6, 
            .page ul, 
            .page ol, 
            .page li, 
            .page table, 
            .page tr, 
            .page td, 
            .page th, 
            .page a, 
            .page strong, 
            .page em {
              font-family:  ${fontFamilyProp || "Arial"};
                   color: #444;
            }

          .page p,
          .page dl,
          .page ol,
          .page ul {
            margin-bottom: 0px;
          }
          .title {
            font-size: ${isPreview ? "14pt" : "20pt"};
            font-weight: bold;
            color: #444;
           font-family: ${fontFamilyProp || "Arial"};
          }
          .subtitle1 {
            font-size: ${isPreview ? "9pt" : "13pt"};
            color: #555;
                 font-family: ${fontFamilyProp || "Arial"};
          }
          .subtitle2 {
            font-size: ${isPreview ? "8pt" : "11pt"};
            color: #555;
                 font-family: ${fontFamilyProp || "Arial"};
          }
          .section-title {
            font-size: ${isPreview ? "9pt" : "12pt"};
            font-weight: 600;
            margin-top: 10px;
            margin-bottom: 10px;
            color: #666;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
                 font-family: ${fontFamilyProp || "Arial"};
          }
          .job-title {
            font-size: ${isPreview ? "9pt" : "12pt"};
            font-weight: 550;
            color: #222;
                 font-family: ${fontFamilyProp || "Arial"};
          }
          .job-date {
            font-size: ${isPreview ? "6pt" : "10pt"};
            text-align: right;
            color: #444;
            white-space: nowrap;
                 font-family: ${fontFamilyProp || "Arial"};
          }
          .company-name {
            font-size: ${isPreview ? "8pt" : "11pt"};
            color: #2286d9 !important;
            font-weight: 500;
                 font-family: ${fontFamilyProp || "Arial"};
          }
           .edu-degree{
            color:#222;
            font-weight: 600;
                 font-family: ${fontFamilyProp || "Arial"};
            }
          .key-blue {
            color: #2286d9 !important;
            font-weight: 600;
            margin-top: 10px;
                 font-family: ${fontFamilyProp || "Arial"};
          }
        `}
      </style>

      <body className="page" id="resume" size="A4">
        <table width="100%">
          <tr>
            <td className="title">
              {personaldetails.firstname} {personaldetails.lastname}
            </td>
          </tr>
          <tr>
            <td>
              <div className="subtitle1">
                {personaldetails.role
                  .split(",")
                  .map((role, index, array) => {
                    const trimmedRole = role.trim();
                    return index === array.length - 1
                      ? trimmedRole
                      : trimmedRole + " | ";
                  })
                  .join("")}{" "}
                <br />
              </div>
              <div className="subtitle2">
                {personaldetails.phone} {personaldetails.email}{" "}
                {personaldetails.city}, {personaldetails.country}
              </div>
            </td>
          </tr>
        </table>
        {summary?.value?.trim() && <div className="section-title">SUMMARY</div>}
        <div
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: summary.value }}
        >
          {}
        </div>
        {experience?.value?.length > 0 && (
          <div className="section-title">EXPERIENCE</div>
        )}
        <table width="100%" cellSpacing="0" cellPadding="4">
          {experience.value.map((exp, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="job-title">
                  <div>{exp.position}</div>
                  <div className="company-name">{exp.company}</div>
                </td>
                <td className="job-date">
                  {exp.location}
                  <br />
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
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div
                    dangerouslySetInnerHTML={{ __html: exp.responsibilities }}
                  ></div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </table>
        {education?.value?.length > 0 && (
          <div className="section-title">EDUCATION</div>
        )}
        <table width="100%" cellSpacing="0" cellPadding="4">
          {education.value.map((edu, index) => (
            <tr key={index}>
              <td>
                <span className="edu-degree">{edu.degree}</span>
                <br />
                {edu.institution}
              </td>
              <td className="job-date">
                {edu.marks}%
                <br />
                {formatDateToUI(edu.year)}
              </td>
            </tr>
          ))}
        </table>
        {achievements?.value?.length > 0 && (
          <div className="section-title mb-0">KEY ACHIEVEMENTS</div>
        )}
        <table width="100%" cellSpacing="10">
          <tr>
            <td valign="top" width="50%">
              {achievements.value
                .slice(0, Math.ceil(achievements.value.length / 2))
                .map((achievement, index) => (
                  <div key={index}>
                    <div className="key-blue">{achievement.name}</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: achievement.description,
                      }}
                    ></div>
                  </div>
                ))}
            </td>
            <td valign="top" width="50%">
              {achievements.value
                .slice(Math.ceil(achievements.value.length / 2))
                .map((achievement, index) => (
                  <div key={index}>
                    <div className="key-blue">{achievement.name}</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: achievement.description,
                      }}
                    ></div>
                  </div>
                ))}
            </td>
          </tr>
        </table>
        {selectedTemplate?.custom?.map((section, index) => {
          const isEmpty = section.value?.trim() === "<p><br></p>";

          return !isEmpty ? (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div className="section-title">
                {section.label?.toUpperCase()}
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: section?.value }}
                style={{
                  margin: "4px 0",
                  textAlign: "justify",
                }}
              ></div>
            </div>
          ) : null;
        })}
      </body>
    </div>
  );
};

export default Resume_template_2;
