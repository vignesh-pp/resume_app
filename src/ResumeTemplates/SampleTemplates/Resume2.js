import React from "react";

export default function Resume2({ selectedTemplate, isPreview = true }) {
  return (
    <div
      style={{ padding: "5px", background: "white" }}
      id="resume"
      className="resume4"
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

        .skills {
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, 1fr);
        }

        
        .skill:nth-child(6n) {
            border-right: none;
        }

        h5 {
            margin-left: 1px;
        }
        .starting {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        // .starting-left {
        //     width: 200px;
            
        // }
        // .starting-right{
        //     display: flex;
        //     flex-direction: column;
        // }
        // .starting-right-p{
        //     display: flex;
        //     flex-direction: column;
        // }
        // p.pr{
        //     line-height: 0.1;
        //     margin-bottom: 3px;
            
        // }
        // .starting-right h5{
        //     margin: 0;
        // }
        // .starting-left p{
        //     margin: 0;
        // }
        .skill-head {
            width: 200px;
        }
        .skills-left, .skills-right{
            width: 300px;
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
        }`}
      </style>
      <div>
        <page size="A4">
          <div className="starting">
            <div className="starting-left">
              <h1 style={{ color: "#333333" }}>
                {selectedTemplate.personaldetails.firstname}
                <br />
                {selectedTemplate.personaldetails.lastname}
              </h1>
              <h3 style={{ color: "#858585" }}>
                {selectedTemplate?.personaldetails?.role || "Software Engineer"}
              </h3>
            </div>
            <div className="starting-right-p">
              <p className="pr" style={{ color: "#858585" }}>
                {selectedTemplate?.personaldetails?.phone}
              </p>
              <p className="pr" style={{ color: "#858585" }}>
                {selectedTemplate.personaldetails?.email}{" "}
              </p>
              <p className="pr" style={{ color: "#858585" }}>
                {selectedTemplate?.personaldetails?.city},
                {selectedTemplate?.personaldetails?.country}
              </p>
              {/* <p className="pr" style={{ color: "#858585" }}>
                www.reallygreatsite.com
              </p> */}
            </div>
          </div>

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            PROFESSIONAL SUMMARY
          </h2>

          <p
            style={{ color: "#858585" }}
            dangerouslySetInnerHTML={{
              __html: selectedTemplate.summary.value,
            }}
          />

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            WORK EXPERIENCE
          </h2>

          <div className="starting">
            {selectedTemplate?.experience?.value.map((job, index) => (
              <div key={index}>
                <div className="starting-left">
                  <p style={{ color: "#858585" }}>
                    {job.company}
                    <br />
                    {job.duration}
                  </p>
                </div>
                <div className="starting-right">
                  <h5 style={{ color: "#333333" }}>{job.title}</h5>
                  <p style={{ color: "#858585" }}>
                    {job?.resposibilities?.map((res, index) => (
                      <p key={index}>{res}</p>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            EDUCATION
          </h2>

          <div>
            {selectedTemplate.education?.value.map((edu, index) => (
              <div className="starting" key={index}>
                <div className="starting-left">
                  <p style={{ color: "#858585" }}>
                    {edu.institution}
                    <br />
                    {edu.duration}
                  </p>
                </div>
                <div className="starting-right">
                  <h5 style={{ color: "#333333" }}>{edu.degree} </h5>
                  <p style={{ color: "#858585" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="starting"
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <h2
              className="skill-head"
              style={{
                backgroundColor: "#efefef",
                color: "#333333",
                height: "max-content",
              }}
            >
              SKILL
            </h2>
            <div className="skills">
              {selectedTemplate?.skills?.value?.map((skill, index) => (
                <p className="skill">{skill}</p>
              ))}
            </div>
          </div>
        </page>
      </div>
    </div>
  );
}
