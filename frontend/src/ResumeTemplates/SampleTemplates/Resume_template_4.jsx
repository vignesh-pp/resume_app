import React from "react";
import dayjs from "dayjs";
import sideImage from "../../Images/sideleaf.png";

const Resume_template_4 = ({ selectedTemplate, fontFamilyProp, isPreview }) => {
  const { personaldetails, summary, experience, education, skills } = selectedTemplate;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr === "Present" ? "Present" : dayjs(dateStr).format("MMM YYYY");
  };

  return (
    <div
      style={{
        fontFamily: fontFamilyProp || "Helvetica",
        backgroundColor: "#fff",
        color: "#666",
        lineHeight: 1.4,
        padding: "0px 0px",
      }}
      size="A4"
      id="resume"
    >
      <style>
        {`
          @page { size: A4; margin: 40px 0px; }
          .page-break { page-break-before: always; break-before: page; }
          .container {
            display: flex;
            flex-direction: row;
          }
          .side-image {
            width: ${isPreview ? "25px" : "35px"};
            height: ${isPreview ? "100vh" : "100%"};
          }
          .content {
            flex: 1;
            padding-left: 20px;
          }
          .profile-header {
            text-align: center;
            border-bottom: 1px solid #ccc;
            padding-bottom: 30px;
            margin-bottom: 30px;
          }
          .profile-header h1 {
            font-size: ${isPreview ? "16pt" : "22pt"};
            font-weight: bold;
            letter-spacing: 5px;
            color: #333;
            margin: 0;
          }
          .section {
            margin-bottom: 20px;
            padding-top: 10px;
            border-top: 1px solid #ccc;
          }
          .section-title {
            font-size: ${isPreview ? "9pt" : "12pt"};
            font-weight: bold;
            margin-bottom: 3px;
            padding-bottom: 3px;
            color: #333;
          }
          .text {
            font-size: ${isPreview ? "8pt" : "10pt"};
            margin-bottom: 4px;
          }
          .job-header {
            display: flex;
            justify-content: space-between;
          }
          .job-title {
            font-weight: bold;
            font-size: ${isPreview ? "8.5pt" : "10pt"};
            margin-bottom: 2px;
          }
          .subtitle {
            font-size: ${isPreview ? "8pt" : "9pt"};
            color: #555;
            margin-bottom: 4px;
          }
          .bullet {
            font-size: ${isPreview ? "8pt" : "9pt"};
            margin-left: 10px;
            margin-bottom: 6px;
          }
          .column-left {
            width: 60%;
            padding-right: 10px;
          }
          .column-right {
            width: 40%;
            padding-left: 10px;
          }
        `}
      </style>

      <div className="d-flex gap-2">
        <img src={"https://configservicestoragetest.blob.core.windows.net/livecareerrepository/Images/leafbackground.png"} alt="Decorative side leaf" className="side-image" />
        <div className="content p-3">
          {/* Profile Header */}
          <header className="profile-header">
            <h1>
              {personaldetails.firstname} {personaldetails.lastname}
            </h1>
          </header>

          <div className="container p-0">
            {/* Left Column */}
            <section className="column-left">
              {/* Summary */}
              {summary?.value && (
                <section className="" aria-label="Summary">
                  <h2 className="section-title">SUMMARY</h2>
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: summary.value }}
                  />
                </section>
              )}

              {/* Experience */}
              {experience?.value?.length > 0 && (
                <section className="section" aria-label="Experience">
                  <h2 className="section-title">EXPERIENCE</h2>
                  {experience?.value?.map((exp, i) => (
                    <article key={i} style={{ marginBottom: 10 }}>
                      <div className="subtitle">
                        {formatDate(exp?.startDate)} - {formatDate(exp?.endDate)}
                      </div>
                      <div className="job-header">
                        <div className="job-title">{exp?.position}</div>
                      </div>
                      <div className="subtitle">
                        {exp?.company}, {exp?.location}
                      </div>
                      <div
                        className="bullet"
                        dangerouslySetInnerHTML={{ __html: exp?.responsibilities }}
                      />
                    </article>
                  ))}
                </section>
              )}

              {/* Education */}
              {education?.value?.length > 0 && (
                <section className="section" aria-label="Education">
                  <h2 className="section-title">EDUCATION</h2>
                  {education.value.map((edu, i) => (
                    <div key={i} className="text">
                      {edu?.degree} - {edu?.institution} ({edu?.year})
                    </div>
                  ))}
                </section>
              )}
            </section>

            {/* Right Column */}
            <aside className="column-right" aria-label="Contact and Skills">
              {/* Contact */}
              <section className="mb-2" aria-label="Contact Information">
                <h2 className="section-title">CONTACT</h2>
                <div className="text">{personaldetails.email}</div>
                <div className="text">{personaldetails.phone}</div>
                <div className="text">
                  {personaldetails.city}, {personaldetails.country}
                </div>
              </section>

              {/* Skills */}
              {skills?.value?.length > 0 && (
                <section className="section" aria-label="Skills">
                  <h2 className="section-title">SKILLS</h2>
                  {skills.value.map((skill, i) => (
                    <div key={i} className="text">
                      • {skill}
                    </div>
                  ))}
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume_template_4;
