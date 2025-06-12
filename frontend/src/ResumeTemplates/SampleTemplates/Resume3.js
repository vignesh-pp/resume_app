import React from "react";

export default function Resume3({ selectedTemplate, isPreview = true }) {
  console.log("====================================");
  console.log(selectedTemplate);
  console.log("====================================");
  return (
    <div
      style={{
        borderRadius: "5px",
        border: !isPreview ? "" : "1px solid #eaeff0",
        width: isPreview ? "100%" : "100%",
        margin: isPreview ? "" : "auto",
      }}
      id="resume_container"
      className="resume3"
    >
      <style>
        {`.right-align {
            text-align: right;
        }
        .starting {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .skills{
            display: grid;
            gap: 30px;
            grid-template-columns: repeat(6, 1fr);
        }
        
        .skill:nth-child(6n) {
            border-right: none;
        }
        .navi{
            padding:0px 20%;
        }
        body{
            line-height: 1;
        }
        
        .course{
            margin-top: 10px;
        }
        page[size="A4"] {
            width: 21cm;
            height: 29.7cm;
        }

        page {
            padding:30px 5%;
            background: white;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        }
        `}
      </style>
      <div>
        <page size="A4" id="resume">
          <center>
            <h1
              style={{
                color: "#7c5999",
                fontSize: isPreview ? "15px" : "30px",
              }}
            >
              {selectedTemplate.personaldetails.firstname +
                " " +
                selectedTemplate.personaldetails.lastname}
            </h1>
            <h5 style={{ fontSize: isPreview ? "8px" : "12px" }}>
              {selectedTemplate?.personaldetails?.city},
              {selectedTemplate?.personaldetails?.country} •{" "}
              {selectedTemplate?.personaldetails?.phone} •{" "}
              {selectedTemplate?.personaldetails?.email}
              <br />
              {selectedTemplate?.personaldetails.website}
            </h5>
          </center>
          <hr style={{ color: "#7c5999" }} />

          <h4
            style={{
              color: "#7c5999",
              fontSize: isPreview ? "12px" : "24px",
              marginTop: "10px",
            }}
          >
            SUMMARY
          </h4>
          <p
            style={{ fontSize: isPreview ? "8px" : "12px", marginBottom:'10px' }}
            dangerouslySetInnerHTML={{
              __html: selectedTemplate.summary.value,
            }}
          />
          <hr style={{ color: "#7c5999" }} />

          <h4
            style={{
              color: "#7c5999",
              fontSize: isPreview ? "12px" : "24px",
              marginTop: "10px",
            }}
          >
            WORK EXPERIENCE
          </h4>
          {selectedTemplate?.experience?.value.map((job, index) => (
            <div key={index} style={{ fontSize: isPreview ? "8px" : "12px" }}>
              <div className="starting">
                <div className="starting-left">
                  <b>
                    {job.position}, {job.company}
                  </b>
                </div>
                <div className="starting-right">
                  <b className="right-align">{job.duration}</b>
                </div>
              </div>
              <p>{job.responsibilities}</p>
              {/* {job?.details.map((detail, idx) => (
            <p key={idx} style={{ marginTop: "10px", fontSize: isPreview ? "8px" : "12px" }}>{detail}</p>
          ))} */}
            </div>
          ))}
          <div style={{ marginBottom:'10px'}}></div>
          <hr style={{ color: "#7c5999" }} />

          <h4
            style={{
              color: "#7c5999",
              fontSize: isPreview ? "12px" : "24px",
              marginTop: "10px",
            }}
          >
            EDUCATION
          </h4>
          {selectedTemplate?.education?.value.map((edu, index) => (
            <div key={index} style={{ fontSize: isPreview ? "8px" : "12px" }}>
              <div className="starting">
                <div className="starting-left">
                  <b>{edu.degree}</b>
                </div>
                <div className="starting-right">
                  <b className="right-align">{edu.duration}</b>
                </div>
              </div>
              <p>{edu.institution}</p>
              {/* {edu.details.map((detail, idx) => (
            <p key={idx}>{detail}</p>
          ))} */}
            </div>
          ))}
          <div style={{ marginBottom:'10px'}}></div>
          <hr style={{ color: "#7c5999" }} />

          <h4
            style={{
              color: "#7c5999",
              fontSize: isPreview ? "12px" : "24px",
              marginTop: "10px",
            }}
          >
            ADDITIONAL INFORMATION
          </h4>
          <div style={{ fontSize: isPreview ? "8px" : "10px" }}>
            <p style={{ lineHeight: "0.5rem" }}>
              <b>Technical Skills:</b>{" "}
              {selectedTemplate.skills.value.map((v) => v + ",")}
            </p>
            <p>
              <b>Languages:</b> Tamil, English
            </p>
            <p>
              <b>Certifications:</b> Ai, Machine Learning, Data Science
            </p>
            <p>
              <b>Awards/Activities:</b> class Topper, class President
            </p>
          </div>
        </page>
      </div>
    </div>
  );
}
