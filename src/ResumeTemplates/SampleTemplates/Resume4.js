import React from "react";

export default function Resume4() {
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
            gap: 30px;
            grid-template-columns: repeat(6, 1fr);
        }

        
        .skill:nth-child(6n) {
            border-right: none;
        }

        h5 {
            margin-left: 1px;
        }
        .starting-left {
            width: 200px;
            
        }
        .starting-right{
            display: flex;
            flex-direction: column;
        }
        .starting-right-p{
            display: flex;
            flex-direction: column;
        }
        // p.pr{
        //     line-height: 0.1;
        //     margin-bottom: 3px;
            
        // }
        .starting-right h5{
            margin: 0;
        }
        .starting-left p{
            margin: 0;
        }
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
                MARESLINA
                <br />
                ZALIYANTI
              </h1>
              <h3 style={{ color: "#858585" }}>Accountant</h3>
            </div>
            <div className="starting-right-p">
              <p className="pr" style={{ color: "#858585" }}>
                +123-456-7890
              </p>
              <p className="pr" style={{ color: "#858585" }}>
                hello@reallygreatsite.com
              </p>
              <p className="pr" style={{ color: "#858585" }}>
                123 Anywhere St. Any City
              </p>
              <p className="pr" style={{ color: "#858585" }}>
                www.reallygreatsite.com
              </p>
            </div>
          </div>

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            PROFESSIONAL SUMMARY
          </h2>

          <p style={{ color: "#858585" }}>
            Results-oriented Engineering Executive with a proven track record of
            optimizing project outcomes. Skilled in strategic project management
            and team leadership. Seeking a challenging executive role to
            leverage technical expertise and drive engineering excellence.
          </p>

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            WORK EXPERIENCE
          </h2>

          <div className="starting">
            <div className="starting-left">
              <p style={{ color: "#858585" }}>
                Ingoude Company
                <br />
                2019 - present
              </p>
            </div>
            <div className="starting-right">
              <h5 style={{ color: "#333333" }}>Senior Accountant</h5>
              <p style={{ color: "#858585" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="starting">
            <div className="starting-left">
              <p style={{ color: "#858585" }}>
                Ingoude Company
                <br />
                2019 - present
              </p>
            </div>
            <div className="starting-right">
              <h5 style={{ color: "#333333" }}>Accountant</h5>
              <p style={{ color: "#858585" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="starting">
            <div className="starting-left">
              <p style={{ color: "#858585" }}>
                Ingoude Company
                <br />
                2019 - present
              </p>
            </div>
            <div className="starting-right">
              <h5 style={{ color: "#333333" }}>Junior Accountant</h5>
              <p style={{ color: "#858585" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <h2 style={{ backgroundColor: "#efefef", color: "#333333" }}>
            EDUCATION
          </h2>

          <div className="starting">
            <div className="starting-left">
              <p style={{ color: "#858585" }}>
                Rimberio University
                <br />
                2010-2014
              </p>
            </div>
            <div className="starting-right">
              <h5 style={{ color: "#333333" }}>
                Master of Business Administration Accounting
              </h5>
              <p style={{ color: "#858585" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
          </div>

          <div className="starting">
            <div className="starting-left">
              <p style={{ color: "#858585" }}>
                Borpelle University
                <br />
                2008-2011
              </p>
            </div>
            <div className="starting-right">
              <h5 style={{ color: "#333333" }}>Bachelor of Arts Accounting</h5>
              <p style={{ color: "#858585" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
          </div>

          <div className="starting">
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
            <div className="skills-left">
              <h4>Personal</h4>
              <p style={{ color: "#858585" }}>Management skills</p>
              <p style={{ color: "#858585" }}>Time management</p>
              <p style={{ color: "#858585" }}>Negotiation</p>
              <p style={{ color: "#858585" }}>Critical Thinking</p>
              <p style={{ color: "#858585" }}>Communication Skills</p>
              <p style={{ color: "#858585" }}>Leadership</p>
            </div>
            <div className="skills-right">
              <h4>Professional</h4>
              <p style={{ color: "#858585" }}>Financial Accounting</p>
              <p style={{ color: "#858585" }}>Managerial Accounting</p>
              <p style={{ color: "#858585" }}>Financial Reporting</p>
              <p style={{ color: "#858585" }}>Auditing</p>
              <p style={{ color: "#858585" }}>Expense Reporting</p>
              <p style={{ color: "#858585" }}>Accounts Payable</p>
              <p style={{ color: "#858585" }}>Accounts Receivable</p>
            </div>
          </div>
        </page>
      </div>
    </div>
  );
}
