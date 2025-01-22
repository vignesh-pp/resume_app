import React from "react";

export default function Resume3(props) {
  return (
    <div
      style={{ padding: "5px", background: "white" }}
      id="resume"
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
        h5{
            margin-bottom: -5px;
        }
        .course{
            margin-top: 20px;
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
          <center>
            <h1 style={{ color: "#7c5999" }}>JACQUELINE THOMPSON</h1>
            <h5>
              123 Anywhere St, Any City • 123-456-7890 •
              hello@reallygreatsite.com
              <br />
              www.reallygreatsite.com
            </h5>
          </center>
          <hr style={{ color: "#7c5999" }} />
          <b>
            <h4 style={{ color: "#7c5999" }}>SUMMARY</h4>
          </b>
          <p>
            Results-oriented Engineering Executive with a proven track record of
            optimizing project outcomes. Skilled in strategic project management
            and team leadership. Seeking a challenging executive role to
            leverage technical expertise and drive engineering excellence.
          </p>
          <hr style={{ color: "#7c5999" }} />
          <b>
            <h4 style={{ color: "#7c5999" }}>WORK EXPERIENCE</h4>
          </b>

          <div className="starting">
            <div className="starting-left">
              <b>Engineering Executive, Borcelle Technologies</b>
            </div>
            <div className="starting-right">
              <b className="right-align">Jan 2023 - Present</b>
            </div>
          </div>
          <div className="course">
            <p>
              • Implemented cost-effective solutions, resulting in a 20%
              reduction in project expenses.
            </p>
            <p>
              • Streamlined project workflows, enhancing overall efficiency by
              25%.
            </p>
            <p>
              • Led a team in successfully delivering a complex engineering
              project on time and within allocated budget.
            </p>
          </div>

          <div className="starting">
            <div className="starting-left">
              <b>
                <p style={{ marginTop: 10 }}>Project Engineer, Salford & Co</p>
              </b>
            </div>
            <div className="starting-right">
              <b className="right-align">Mar 2021 - Dec 2022</b>
            </div>
          </div>
          <p style={{ marginTop: 0 }}>
            • Managed project timelines, reducing delivery times by 30%.
          </p>
          <p>
            • Spearheaded the adoption of cutting-edge engineering software,
            improving project accuracy by 15%.
          </p>
          <p>
            • Collaborated with cross-functional teams, enhancing project
            success rates by 10%.
          </p>

          <div className="starting">
            <div className="starting-left">
              <b>
                <p style={{ marginTop: 10 }}>
                  Graduate Engineer, Arowwai Industries
                </p>
              </b>
            </div>
            <div className="starting-right">
              <b className="right-align">Feb 2020 - Jan 2021</b>
            </div>
          </div>
          <p>
            • Coordinated project tasks, ensuring adherence to engineering
            standards and regulations.
          </p>
          <p>
            • Conducted comprehensive project analyses, identifying and
            rectifying discrepancies in engineering designs.
          </p>

          <hr style={{ color: "#7c5999" }} />
          <b>
            <h4 style={{ color: "#7c5999" }}>EDUCATION</h4>
          </b>

          <div className="starting">
            <div className="starting-left">
              <b>
                <p>Master of Science in Mechanical Engineering</p>
              </b>
            </div>
            <div className="starting-right">
              <b className="right-align">Sep 2019 - Oct 2020</b>
            </div>
          </div>
          <p>University of Engineering and Technology</p>
          <p>• Specialization in Advanced Manufacturing.</p>
          <p>• Thesis on "Innovations in Sustainable Engineering Practices".</p>

          <div className="starting">
            <div className="starting-left">
              <b>
                <p>Bachelor of Science in Civil Engineering</p>
              </b>
            </div>
            <div className="starting-right">
              <b className="right-align">Aug 2015 - Aug 2019</b>
            </div>
          </div>
          <p s>City College of Engineering</p>
          <p>
            • Relevant coursework in Structural Design and Project Management.
          </p>

          <hr style={{ color: "#7c5999" }} />
          <b>
            <h4 style={{ color: "#7c5999" }}>ADDITIONAL INFORMATION</h4>
          </b>
          <p>
            <b>• Technical Skills: </b>Project Management, Structural Analysis,
            Robotics and Automation, CAD
          </p>
          <p>
            <b>• Languages:</b> English, Malay, German
          </p>
          <p>
            <b>• Certifications:</b> Professional Engineer (PE) License, Project
            Management Professional (PMP)
          </p>
          <p>
            <b>• Awards/Activities:</b> Received the "Engineering Excellence"
            Award for outstanding contributions to project innovation, Borcelle
            Technologies
          </p>
        </page>
      </div>
    </div>
  );
}
