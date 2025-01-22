import React from "react";
import { Box } from "@mui/material";

const Resume1 = ({ selectedTemplate, isPreview = true }) => {
  // Dynamic styles and data
  console.log("*********************", selectedTemplate);

  const textSize = isPreview ? "6pt" : `${selectedTemplate.styles.textSize}pt`;
  const headSize = isPreview ? "8pt" : `${selectedTemplate.styles.headSize}pt`;

  return (
    <div style={{ padding: "5px", background: "white" }} id="resume">
      <style>
        {`ul{
                padding-left: 0.8rem;
            }`}
      </style>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#16365f", fontSize: headSize }}>
            {selectedTemplate.personaldetails.firstname +
              " " +
              selectedTemplate.personaldetails.lastname}
          </div>
          <div style={{ color: "#d4731b", fontSize: textSize }}>
            {selectedTemplate?.personaldetails?.role || "Software Engineer"}
          </div>
        </div>
        <div>
          <div style={{ color: "#999999", fontSize: textSize }}>
            {selectedTemplate?.personaldetails?.phone}
          </div>
          <div style={{ color: "#999999", fontSize: textSize }}>
            {selectedTemplate?.personaldetails?.city}
          </div>
          <div style={{ color: "#999999", fontSize: textSize }}>
            <a
              href={`mailto:${selectedTemplate?.personaldetails?.email}`}
              style={{ fontSize: textSize }}
            >
              {selectedTemplate.personaldetails?.email}
            </a>
          </div>
        </div>
      </div>

      <hr style={{ margin: "0.5rem 0" }} />

      <div style={{ color: "#16365f", fontSize: headSize }}>
        PROFESSIONAL PROFILE
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: selectedTemplate.summary.value,
        }}
        style={{ color: "#999999", fontSize: textSize }}
      />

      <hr style={{ margin: "0.5rem 0" }} />

      <div style={{ color: "#16365f", fontSize: headSize }}>TECH SKILLS</div>
      <div
        style={{
          display: "grid",
          gap: "5px",
          gridTemplateColumns: "repeat(6, 1fr)",
        }}
      >
        {typeof selectedTemplate?.skills?.value === "object" ? (
          <>
            {selectedTemplate?.skills?.value?.map((skill, index) => (
              <div
                key={index}
                style={{
                  color: "#7f7f7f",
                  textAlign: "center",
                  borderRight: index % 6 === 5 ? "none" : "1px solid orange",
                  fontSize: textSize,
                }}
              >
                {skill}
              </div>
            ))}
          </>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: selectedTemplate.skills.value,
            }}
          />
        )}
      </div>

      <hr style={{ margin: "0.5rem 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#16365f", fontSize: headSize }}>EDUCATION</div>
          {selectedTemplate.education?.value.map((edu, index) => (
            <div key={index}>
              <div style={{ color: "#d4731b", fontSize: textSize }}>
                {edu.degree}
              </div>
              <div style={{ color: "#7f7f7f", fontSize: textSize }}>
                <i>{edu.institution}</i>
              </div>
            </div>
          ))}

          <div style={{ color: "#16365f", fontSize: headSize }}>
            WORK EXPERIENCE
          </div>
          {selectedTemplate?.experience?.value.map((job, index) => (
            <div key={index}>
              <div style={{ color: "#16365f", fontSize: textSize }}>
                {job.title}
              </div>
              <div style={{ color: "#d4731b", fontSize: textSize }}>
                {job.company} • {job.location} • ({job.duration})
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#16365f", fontSize: headSize }}>
            CERTIFICATIONS / TRAINING
          </div>
          {selectedTemplate?.certificate?.value.map((cert, index) => (
            <div key={index}>
              <div style={{ color: "#678a50", fontSize: textSize }}>
                {cert.name}
              </div>
              <div style={{ color: "#898989", fontSize: textSize }}>
                {cert.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ margin: "0.5rem 0" }} />

      <div style={{ color: "#16365f", fontSize: headSize }}>KEY PROJECTS</div>
      {selectedTemplate?.projects?.value?.map((project, index) => (
        <div key={index}>
          <div style={{ color: "#d4731b", fontSize: textSize }}>
            {project.name} • {project.location} • {project.duration} •{" "}
            {project.role}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
            style={{ color: "#7f7f7f", fontSize: textSize }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Resume1;
