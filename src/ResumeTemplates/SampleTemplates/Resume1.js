import React from "react";
import { Box } from "@mui/material";

const Resume1 = ({ selectedTemplate, isPreview = true }) => {
  // Dynamic styles and data
  console.log("*********************", selectedTemplate);

  const textSize = isPreview ? "6pt" : `${selectedTemplate.template_styles.textSize}pt`;
  const headSize = isPreview ? "8pt" : `${selectedTemplate.template_styles.headSize}pt`;

  return (
    <div style={{ padding: "5px", background: "white" }} id="resume">
      <style>
        {`
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

        page {
            padding: 30px 5%;
            background: white;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        }

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
            border-top: 2px solid #d4731b;
            margin: 20px 0;
        }`}
      </style>
      <div >
        <page size="A4">
          <div className="starting">
            <div className="starting-left">
              <h1 style={{ color: "#16365f" }}>
                {selectedTemplate.personaldetails.firstname +
                  " " +
                  selectedTemplate.personaldetails.lastname}
              </h1>
              <h4 style={{ color: "#d4731b" }}>
                {selectedTemplate?.personaldetails?.role || "Software Engineer"}
              </h4>
            </div>
            <div className="starting-right">
              <div className="right-align" style={{ color: "#999999" }}>
                {selectedTemplate?.personaldetails?.phone}
              </div>
              <div className="right-align" style={{ color: "#999999" }}>
                {selectedTemplate?.personaldetails?.city},
                {selectedTemplate?.personaldetails?.country}
              </div>
              <div className="right-align">
                <a href={`mailto:${selectedTemplate?.personaldetails?.email}`}>
                  {selectedTemplate.personaldetails?.email}
                </a>
              </div>
            </div>
          </div>
          <hr />
          <h5 style={{ color: "#16365f" }}>PROFESSIONAL PROFILE</h5>
          <p
            dangerouslySetInnerHTML={{
              __html: selectedTemplate.summary.value,
            }}
            style={{ color: "#999999" }}
          />
          <hr />
          <h5 style={{ color: "#16365f" }}>TECH SKILLS</h5>
          <div className="skills">
            {selectedTemplate?.skills?.value?.map((skill, index) => (
              <p className="skill">{skill}</p>
            ))}
          </div>
          <hr />
          <div className="starting">
            <div className="starting-left">
              <h5 style={{ color: "#16365f" }}>EDUCATION</h5>

              {selectedTemplate.education?.value.map((edu, index) => (
                <div key={index}>
                  <div style={{ color: "#d4731b" }}>{edu.degree}</div>
                  <div style={{ color: "#7f7f7f" }}>
                    <i>{edu.institution}</i>
                  </div>
                </div>
              ))}
              <h5 style={{ color: "#16365f" }}>WORK EXPERIENCE</h5>
              {selectedTemplate?.experience?.value.map((job, index) => (
                <div key={index}>
                  <div style={{ color: "#16365f" }}>{job.title}</div>
                  <div style={{ color: "#d4731b" }}>
                    {job.company} • {job.location} • ({job.duration})
                  </div>
                </div>
              ))}
            </div>
            <div className="starting-right">
              <h5 className="right-align" style={{ color: "#16365f" }}>
                CERTIFICATIONS / TRAINING
              </h5>
              {selectedTemplate?.certificate?.value.map((cert, index) => (
                <div key={index}>
                  <div className="right-align" style={{ color: "#678a50" }}>
                    {cert.name}
                  </div>
                  <div className="right-align" style={{ color: "#898989" }}>
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </page>
      </div>
    </div>
  );
};

export default Resume1;
