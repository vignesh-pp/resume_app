import React from "react";

export default function Resume2(props) {
  return (
    <div
      id="resume"
      className="resume2"
      style={{ padding: "5px", background: "white" }}
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
        .starting-skills {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            // margin-left: -60px;
        }
        .skills{
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(6, 1fr);
        }
        
        .skill:nth-child(1n) {
            border-right: none;
        }
        h4{
            margin:0px 0px;
        }
        .last{
            margin-top: -15px;
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
          <div className="container">
            <h1 style={{ color: "#1e5ebe" }}>ESTELLE DARCY</h1>
            <h2 style={{ marginTop: 5 }}>UX DESIGNER</h2>
            <p style={{ color: "#3e3e3e", marginTop:  5}}>
              123 Anywhere St, Any City | hello@reallygreatsite.com |
              www.reallygreatsite.com
            </p>
            <hr style={{ color: "#1e5ebe" }} />
            <h4 style={{ color: "#1e5ebe" }}>SUMMARY</h4>
            <hr style={{ color: "#1e5ebe" }} />
            <p>
              UX Designer with a focus on delivering impactful results, eager to
              tackle dynamic challenges and apply creativity to craft intuitive
              user experiences. Demonstrated proficiency in project management,
              user-centric problem-solving, and seamless collaboration across
              teams. Skilled in leveraging state-of-the-art tools and
              methodologies to streamline processes and elevate user
              satisfaction.
            </p>

            <hr style={{ color: "#1e5ebe" }} />
            <h4 style={{ color: "#1e5ebe" }}>TECHNICAL SKILLS</h4>
            <hr style={{ color: "#1e5ebe" }} />
            <div className="starting-skills">
              <div className="starting-left">
                <p>Prototyping Tools</p>
                <p>User Research</p>
                <p>Information Architecture</p>
              </div>
              <div className="starting-center">
                <p className="center-align">Interaction Design</p>
                <p className="center-align">Visual Design</p>
                <p className="center-align">Usability Heuristics</p>
              </div>
              <div className="starting-right">
                <p className="right-align">Accessibility</p>
                <p className="right-align">Responsive Design</p>
                <p className="right-align">User Testing Tools</p>
              </div>
            </div>
            <hr style={{ color: "#1e5ebe" }} />
            <h4 style={{ color: "#1e5ebe" }}>PROFESSIONAL EXPERIENCE</h4>
            <hr style={{ color: "#1e5ebe" }} />
            <div className="starting">
              <div className="starting-left">
                <b>Instant Chartz App, Morcelle Program</b>
              </div>
              <div className="starting-right">
                <b className="right-align">Jan 2023-Present</b>
              </div>
            </div>
            <p style={{ marginTop: 5 }}>
              • Led development of an advanced automation system, achieving a
              15% increase in operational efficiency.
            </p>
            <p>
              • Streamlined manufacturing processes, reducing production costs
              by 10%.
            </p>
            <p>
              • Implemented preventive maintenance strategies, resulting in a
              20% decrease in equipment downtime.
            </p>
            <div className="starting">
              <div className="starting-left">
                <b>System UX Engineering, XarrowAI Industries</b>
              </div>
              <div className="starting-right">
                <b className="right-align">Feb 2021-Dec 2022</b>
              </div>
            </div>
            <p style={{ marginTop: 5 }}>
              • Designed and optimised a robotic control system, realizing a 12%
              performance improvement.
            </p>
            <p>
              • Coordinated testing and validation, ensuring compliance with
              industry standards.
            </p>
            <p>
              • Provided technical expertise, contributing to a 15% reduction in
              system failures.
            </p>
            <br />
            <hr className="last" style={{ color: "#1e5ebe" }} />
            <h4 style={{ color: "#1e5ebe" }}>EDUCATION</h4>
            <hr style={{ color: "#1e5ebe" }} />
            <div className="starting">
              <div className="starting-left">
                <b>UX Industrial Basic and General Application</b>
              </div>
              <div className="starting-right">
                <b className="right-align">Aug 2016-Oct 2019</b>
              </div>
            </div>
            <p style={{ marginTop: 1 }}>University of Engineering UX Cohort</p>
            <p>• Major in Automotive Technology.</p>
            <p>
              • Thesis on "Technological Advancements within the current
              Mechatronics Industry".
            </p>
            <br />
            <div className="starting">
              <div className="starting-left">
                <b style={{ marginTop: -19 }}>
                  Bachelor of Design in Process Engineering
                </b>
              </div>
              <div className="starting-right">
                <b className="right-align">May 2014-May 2016</b>
              </div>
            </div>
            <p style={{ marginTop: 5 }}>Engineering University</p>
            <p style={{ marginTop: 5 }}>
              • Relevant coursework in Structural Design and Project Management.
            </p>
            <br />
            <hr className="last" style={{ color: "#1e5ebe" }} />
            <h4 style={{ color: "#1e5ebe" }}>ADDITIONAL INFORMATION</h4>
            <hr style={{ color: "#1e5ebe" }} />
            <p style={{ marginTop: 3 }}>
              • <b>Languages:</b> English, French, Mandarin.
            </p>
            <p style={{ marginTop: -14 }}>
              • <b>Certifications:</b> Professional Design Engineer (PDE)
              License, Project Management Tech (PMT).
            </p>
            <p style={{ marginTop: -14 }}>
              • <b>Awards/Activities:</b> Most Innovative Employer of the Year
              (2021), Overall Best Employee Division Two (2024), Onboarding
              Project Lead (2023)
            </p>
          </div>
        </page>
      </div>
    </div>
  );
}
