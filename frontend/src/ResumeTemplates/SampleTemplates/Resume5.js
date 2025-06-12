import React from "react";

const Resume5 = ({ selectedTemplate, isPreview }) => {
  const containerStyle = {
    // width: "800px",
    margin: isPreview ? "" : "20px auto",
    display: "flex",
    background: "#fff",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    // fontFamily: "cursive",
  };

  const leftSectionStyle = {
    width: isPreview ? "33%" : "30%",
    background: "#eaeaea",
    padding: isPreview ? "10px" : "20px",
    // marginTop:isPreview?'0px':'10px'
  };

  const rightSectionStyle = {
    width: isPreview ? "67%" : "70%",
    padding: "20px",
    position: "relative",
  };

  const quoteStyle = {
    color: "#0077b6",
    fontSize: isPreview ? "140px" : "250px",
    fontWeight: "bold",
    lineHeight: "1",
    position: "absolute",
    top: isPreview ? "-15px" : "-20px",
    right: "10px",
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    marginTop: isPreview ? "10px" : "20px",
    fontSize: isPreview ? "10px" : "16px",
    textTransform: "uppercase",
    borderBottom: "2px solid lightgray",
    paddingBottom: "5px",
    marginBottom: "0.5rem",
  };

  const jobTitleStyle = {
    fontWeight: "bold",
    fontSize: isPreview ? "10px" : "16px",
    marginTop: "15px",
  };

  const jobDurationStyle = {
    fontSize: isPreview ? "7px" : "12px",
    color: "#777",
  };

  const jobDescStyle = {
    fontSize: isPreview ? "8px" : "14px",
    marginTop: "5px",
  };

  return (
    <div
      style={{
        borderRadius: "5px",
        border: !isPreview ? "" : "1px solid #eaeff0",
        // width: isPreview ? "100%" : "100%",
        // margin: isPreview ? "" : "auto",
      }}
      id="resume_container"
    >
      <page size="A4" id="resume">
        <div style={containerStyle}>
          {/* Left Section */}
          <div style={leftSectionStyle}>
            <h1 style={{ fontSize: isPreview ? "16px" : "2.5rem" }}>
              {selectedTemplate.personaldetails.firstname} <br />
              {selectedTemplate.personaldetails.lastname}
            </h1>

            <div style={{ fontSize: isPreview ? "8px" : "14px" }}>
              <p style={sectionTitleStyle}>Contact</p>
              <div style={{ color: "#6b7280" }}>
                <div className="mt-1">
                  📧 {selectedTemplate.personaldetails.email}
                </div>
                <div className="mt-1">
                  📞 {selectedTemplate.personaldetails.phone}
                </div>
                <div className="mt-1">
                  📍 {selectedTemplate?.personaldetails?.city},
                  {selectedTemplate?.personaldetails?.country}
                </div>
              </div>
            </div>

            <div style={{ fontSize: isPreview ? "8px" : "14px" }}>
              <p style={sectionTitleStyle}>Education</p>
              {selectedTemplate.education?.value.map((edu, index) => (
                <div style={{ color: "#6b7280" }}>
                  <div>{edu.year}</div>
                  <div>
                    <strong>{edu.degree}</strong>
                  </div>
                  <div>{edu.institution}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: isPreview ? "8px" : "14px" }}>
              <p style={sectionTitleStyle}>Skills</p>
              <ul style={{ listStyle: "none", padding: 0, color: "#6b7280" }}>
                {selectedTemplate?.skills?.value?.map((skill, index) => (
                  <li>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div style={rightSectionStyle}>
            <p style={quoteStyle}>”</p>
            <p
              style={{
                ...sectionTitleStyle,
                marginTop: isPreview ? "47.8px" : "115px",
              }}
            >
              Professional Summary
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: selectedTemplate.summary.value,
              }}
              style={{ color: "#999999", fontSize: isPreview ? "8px" : "14px" }}
            />

            <p style={sectionTitleStyle}>Work Experience</p>
            {selectedTemplate?.experience?.value.map((job, index) => (
              <div>
                <div style={jobTitleStyle}>{job.position}</div>
                <div style={jobDurationStyle}>
                  {job.company} | {job.location} ({job.duration})
                </div>
                <div style={jobDescStyle}>{job.responsibilities}</div>
              </div>
            ))}

            <p style={sectionTitleStyle}>projects</p>
            {selectedTemplate?.projects?.value.map((job, index) => (
              <div>
                <div style={jobTitleStyle}>{job.role}</div>
                <div style={jobDurationStyle}>
                  {job.name} | {job.location} ({job.duration})
                </div>
                <div
                  style={jobDescStyle}
                  dangerouslySetInnerHTML={{
                    __html: job.description,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </page>
    </div>
  );
};

export default Resume5;
