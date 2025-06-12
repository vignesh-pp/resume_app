import React from "react";
import dayjs from "dayjs";

const ResumeTemplateWithSidebar = ({
  isPreview,
  selectedTemplate,
  fontFamilyProp,
  isDownload = false,
}) => {
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

  const formatDateToUI = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const date = new Date(`${year}-${month}-01`);
    return isNaN(date)
      ? dateStr
      : date.toLocaleString("default", { month: "short", year: "numeric" });
  };
  const sampleBase64Image =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAODQ4SERATGBYUGBgaGBgaIB8dHR0fICQiIiIiIiIjJCYjJycnJycnJycnJycnJycnJycnJycnJ//2wBDAQ8PDhIREhMjIiMjIycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJ//wAARCAAZABkDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAHxABAQEBAQEAAgMBAAAAAAAAAAERAhIhEzFBImFx/9oADAMBAAIQAxAAAAHNV7dYyJm81cKO/5v3Qpq5vq6dn7lU5G0qkGVzPHD1aEkVnkVDYH//Z";

  return (
    <div
      style={{
        borderRadius: "5px",
        // border: isDownload ? "none" : "1px solid #eaeff0",
        width: "100%",
        padding: "5%",
        backgroundColor: "#fff",
      }}
      size="A4" id="resume"    >
      <style>{`
        @page { size: A4; margin: 40px 70px; }
    .page-break { page-break-before: always; break-before: page; }
        .page {
          font-size: ${isPreview ? "8pt" : "11pt"};
          font-family: ${fontFamilyProp || "Arial"};
          color: #444;
        }
                .page, 
            .page p, 
            .page div, 
            .page span, 
            .page ul, 
            .page ol, 
            .page li, 
            .page td, 
            .page em {
              font-family:  ${fontFamilyProp || "Arial"};
                   color: #6b7280;
            }
        .title {
          font-size: ${isPreview ? "14pt" : "20pt"};
          font-weight: bold;
          color: #555 !important;
        }
        .subtitle1 {
          font-size: ${isPreview ? "9pt" : "10pt"};
          color: #555;
        }
        .subtitle2 {
          font-size: ${isPreview ? "8pt" : "11pt"};
          color: #666;
        }
        .subtitle2Key {
          font-size: ${isPreview ? "8pt" : "11pt"};
          color: #666;
          font-weight: 600;
        }
        .section-title {
          font-size: ${isPreview ? "9pt" : "12pt"};
          font-weight: 600;
          margin: 10px 0 6px;
          color: #555 !important;
          border-bottom: 2px solid #999;
        }
        .job-title {
          font-size: ${isPreview ? "9pt" : "12pt"};
          font-weight: 550;
          color: #222;
        }
        .job-location {
          font-size: ${isPreview ? "6pt" : "10pt"};
          text-align: right;
          color: #444;
          white-space: nowrap;
        }
        .job-date {
          font-size: ${isPreview ? "8pt" : "11pt"};
          font-weight: 500;
        }
        .left-info {
          background-color: #f0f0f0;
          padding: 10px;
        }
          .profile-image {
          border-radius: 50%;
          object-fit: cover;
          display: block;
          margin: auto;
          border: 2px solid #999;
        }
        .border-table {
      border: 1px solid #eaeaea;
      width: 100%; /* Optional, if you want the table to span the width */
      border-collapse: collapse; /* Ensures the borders don't double */
    }
        .dot {
          height: 5px;
          width: 5px;
          background-color: #444;
          border-radius: 50%;
          display: inline-block;
          margin-right: 2px;
        }
      `}</style>
      <meta charset="UTF-8"></meta>
      <div className="page">
        <table width="100%" cellPadding="10">
          <tbody>
            {/* Top Header Row Spanning Both Sides */}
            <tr>
              <td
                width="35%"
                className="left-info"
                valign="middle"
                style={{ borderTopLeftRadius: "5px" }}
              >
                {/* Optional: You can keep this blank or add a photo or initials here */}
                {/* <img
                  src={'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740'}
                  alt="Profile"
                  width="100"
                  height="100"
                  className="profile-image"
                /> */}

              </td>
              <td width="50%" valign="middle">
                <div
                  style={{
                    border: "2px solid #999",
                    // borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    marginBottom: "15px",
                    marginLeft: "-30%",
                    width: "100%",
                    backgroundColor: "#fff",
                    position: "relative",
                  }}
                >
                  <div className="title">
                    {personaldetails.firstname} {personaldetails.lastname}
                  </div>
                  <div className="subtitle1">{personaldetails.role}</div>
                </div>
              </td>
            </tr>

            <tr>
              {/* Left Side */}
              <td width="30%" className="left-info" valign="top">
                <div className="section-title">INFO</div>
                <table className="border-table"></table>
                <table width="100%" cellPadding="4">
                  <tbody>
                    <tr>
                      <td width="30%" className="subtitle2Key">
                        Address
                      </td>
                      <td className="subtitle2">
                        {personaldetails.city}
                        {personaldetails?.country
                          ? ", " + personaldetails?.country
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td width="30%" className="subtitle2Key">
                        Phone
                      </td>
                      <td className="subtitle2">{personaldetails.phone}</td>
                    </tr>
                    <tr>
                      <td width="30%" className="subtitle2Key">
                        Email
                      </td>
                      <td className="subtitle2">{personaldetails.email}</td>
                    </tr>
                  </tbody>
                </table>

                {skills?.value?.length > 0 && (
                  <>
                    <div className="section-title">SKILLS</div>
                    {skills.value.map((skill, i) => (
                      <div key={i} className="subtitle2">
                        • {skill}
                        <div>
                          {/* {[...Array(skill.level)].map((_, j) => (
                            <span key={j} className="dot" />
                          ))} */}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {languages?.value?.length > 0 && (
                  <>
                    <div className="section-title">LANGUAGES</div>
                    {languages.value.map((lang, i) => (
                      <div key={i} className="subtitle2">
                        {lang.name}
                        <div>
                          {[...Array(lang.level)].map((_, j) => (
                            <span key={j} className="dot" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {hobbies?.value?.length > 0 && (
                  <>
                    <div className="section-title">HOBBIES</div>
                    <div className="subtitle2">{hobbies.value.join(", ")}</div>
                  </>
                )}
              </td>

              {/* Right Side */}
              <td width="70%" valign="top">
                {summary?.value?.trim() && (
                  <>
                    <div className="section-title">PROFILE</div>
                    <div
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{ __html: summary.value }}
                    ></div>
                  </>
                )}

                {experience?.value?.length > 0 && (
                  <>
                    <div className="section-title">EXPERIENCE</div>
                    <table width="100%" cellPadding="4">
                      <tbody>
                        {experience.value.map((exp, i) => (
                          <React.Fragment key={i}>
                            <tr>
                              <td className="job-title">
                                <div>
                                  {exp.position}, {exp.company}
                                </div>
                                <div className="job-date">
                                  {dayjs(exp.startDate).format("MMM YYYY")} -
                                  {exp.endDate === "Present"
                                    ? " Present"
                                    : ` ${dayjs(exp.endDate).format(
                                        "MMM YYYY"
                                      )}`}
                                </div>
                              </td>
                              <td className="job-location" width="30%">
                                {exp.location}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: exp.responsibilities,
                                  }}
                                ></div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {education?.value?.length > 0 && (
                  <>
                    <div className="section-title">EDUCATION</div>
                    <table width="100%" cellPadding="4">
                      <tbody>
                        {education.value.map((edu, i) => (
                          <tr key={i}>
                            <td>
                              <strong>{edu.degree}</strong>
                              <br />
                              {edu.institution}
                            </td>
                            <td className="job-location" align="right">
                              {edu.marks}%
                              <br />
                              {formatDateToUI(edu.year)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {achievements?.value?.length > 0 && (
                  <>
                    <div className="section-title">ACHIEVEMENTS</div>
                    {achievements.value.map((ach, i) => (
                      <div key={i}>
                        <strong>{ach.name}</strong>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ach.description,
                          }}
                        ></div>
                      </div>
                    ))}
                  </>
                )}

                {custom?.map((section, i) => {
                  if (!section.value || section.value.trim() === "<p><br></p>")
                    return null;
                  return (
                    <div key={i} style={{ marginBottom: "10px" }}>
                      <div className="section-title">
                        {section.label.toUpperCase()}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: section.value }}
                        style={{ textAlign: "justify" }}
                      ></div>
                    </div>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumeTemplateWithSidebar;
