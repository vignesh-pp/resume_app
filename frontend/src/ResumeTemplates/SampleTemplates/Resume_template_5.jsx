import React from "react";
import dayjs from "dayjs";
import Photo from "../../Images/photo.png";
import Email from "../../Images/email.png";
import Phone from "../../Images/phone.png";
import Globe from "../../Images/globe.png";
import TotalExp from "../../Images/totalexp.png";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr === "Present" ? "Present" : dayjs(dateStr).format("MMM YYYY");
};

const Resume_template_5 = ({ selectedTemplate, fontFamilyProp, isPreview }) => {
  const { personaldetails, summary, experience, education, skills } =
    selectedTemplate;

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
        .resume-container {
            display: flex;
            font-family: Helvetica, sans-serif;
            font-size:  ${isPreview ? "5pt" : "10pt"};
            line-height: 1.5;
            border: 4px solid #e5e3ee;
            background-color: white;
            color: #333;
            }

            .left-column {
            width: 30%;
            background-color: #e3e8fc;
            }

            .right-column {
            width: 70%;
            padding: 20px;
            }

            .profile-image {
             width: 100%;
            object-fit: cover;
            object-position: top;
            margin-bottom: 10px;
            display: block;
            height: ${!isPreview ? "200px" : "120px"};
            }

            .section-title, .section-title-left {
            text-transform: uppercase;
            font-weight: bold;
            font-size: ${isPreview ? "6pt" : "12pt"};
            color: #676fa9;
            margin-top: 10px;
            margin-bottom: 5px;
            }

            .section-title-left {
            color: black;
            }

            .icon {
            width: 14px;
            height: 14px;
            margin-right: 8px;
            margin-top:2px;
            }

            .rowicon {
            display: flex;
            margin-top: 8px;
            }

            .skills-list {
            padding-left: 18px;
            }

            .progress-bar {
            height: 5px;
            background-color: #d9e2e9;
            border-radius: 10px;
            margin: 6px 0 10px 0;
            }
            .progress-bar-left {
            height: 5px;
            background-color: #fff;
            border-radius: 10px;
            margin: 6px 0 10px 0;
            }

            .fill {
            height: 100%;
            background-color: black;
            border-radius: 10px;
            }
            .container{
            display:flex;
            justify-content: center;
            margin-bottom: 1rem;
            }
         .name-box {
        border-left: 2px solid #333;
        border-right: 2px solid #333;
        border-top: 2px solid #333;
        text-align: center;
        margin-bottom: 20px;
        padding-top: 10px;
        padding-bottom: 0;
        position: relative;
        width: 350px;
        }

        .name-box h1 {
        color: #676fa9;
        font-size: 24px;
        margin: 0;
        padding-bottom: 10px;
        }

        .role-line {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -8.5px;
        left: 0;
        width: 100%;
        }

        .role-line div {
        flex: 1;
        border: none;
        height: 1.8px;
        background-color: black !important;
        }

        .role-line span {
        font-size: 12px;
        font-weight: bold;
        padding: 0 10px;
        background: white; /* Or match the background of your container */
        color: #333;
        }

        .entry {
        display: flex;
            }

            .entry .date {
            min-width: 90px;
            width: 90px;
            font-size:  ${isPreview ? "6pt" : "10pt"};
            color: #676fa9;
            }

            .edu-content, .exp-content {
            padding-left: 10px;
            }

            .exp-content p {
            margin: 4px 0;
            }
            .exp-content h4,.edu-content h4 {
            font-size:  ${isPreview ? "6pt" : "10pt"};
            }
            .left-content{
            padding: 20px;
            }
            .otherpersonalrow{
            display: flex;
            justify-content: space-between;
            }
            .timeline {
            display: flex;
            flex-direction: column;
            align-items: center;
            }

            .circle {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            border: 2px solid #424a61;
            background-color: transparent; /* hollow */
            }

            .line {
            width: 2px;
            height: 100%;
            background-color: #424a61;
          }
           .html p {
              margin: 0;
              padding: 0;
              margin-top: 1px;
            }

           .html ul {
              margin: 0;
              padding-left: 10px;
            }

           .html li {
              margin-top: 1px;
              margin-bottom: 0;
            }
           .html ol {
              margin-top: 1px;
              margin-bottom: 0;
            }
        `}
      </style>
      <div className="resume-container">
        <div className="left-column">
          <img
            src={selectedTemplate?.personaldetails?.photo || Photo}
            alt="Profile"
            className="profile-image"
          />

          <div className="left-content">
            <h3 className="section-title-left">Personal Information</h3>
            <div className="progress-bar-left">
              <div className="fill" style={{ width: "25%" }} />
            </div>

            <div className="rowicon">
              <img src={Email} className="icon" alt="email" />
              <div>
                <strong>Email</strong>
                <a
                  href={`mailto:${personaldetails?.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block text-decoration-none"
                  style={{ color: "#333",wordBreak: 'break-word' ,   
                    flexShrink: 1,
                    flexWrap: 'wrap',}}
                >
                  {personaldetails?.email}
                </a>
              </div>
            </div>

            <div className="rowicon">
              <img src={Phone} className="icon" alt="phone" />
              <div>
                <strong>Phone</strong>
                <div>{personaldetails?.phone}</div>
              </div>
            </div>

            {personaldetails?.totalexp && (
              <div className="rowicon">
                <img src={TotalExp} className="icon" alt="total experience" />
                <div>
                  <strong>Total work experience</strong>
                  <div>{personaldetails?.totalexp}</div>
                </div>
              </div>
            )}

            {personaldetails?.sociallink && (
              <div className="rowicon">
                <img src={Globe} className="icon" alt="sociallink" />
                <div>
                  <strong>Social Link</strong>
                  <a
                    href={personaldetails?.sociallink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-block text-decoration-none"
                    style={{ color: "#333",wordBreak: 'break-word',    
                      flexShrink: 1,
                      flexWrap: 'wrap', }}
                  >
                    {personaldetails?.sociallink}
                  </a>
                </div>
              </div>
            )}

            <h3 className="section-title-left">Key Skills</h3>
            <div className="progress-bar-left">
              <div className="fill" style={{ width: "25%" }} />
            </div>
            <ul className="skills-list">
              {skills?.value?.map((skill, i) => (
                <li key={i} style={{wordBreak: 'break-word',    
                  flexShrink: 1,
                  flexWrap: 'wrap',}}>{skill}</li>
              ))}
            </ul>

            <h3 className="section-title-left">Other Personal Details</h3>
            <div className="progress-bar-left">
              <div className="fill" style={{ width: "25%" }} />
            </div>
            <div className="otherpersonalrow">
              <strong>City</strong> <div>{personaldetails?.city}</div>
            </div>
            <div className="otherpersonalrow">
              <strong>Country</strong> <div>{personaldetails?.country}</div>
            </div>
            <section>
            <h3 className="section-title-left">Education</h3>
            <div className="progress-bar-left">
              <div className="fill" style={{ width: "15%" }} />
            </div>{console.log(selectedTemplate,'selfoewjoj')
            }
            {education?.value?.map((edu, i) => (
              <div key={i} className="entry">
                <span style={{color:"#676fa9"}}>{edu?.year}</span>
                <div className="edu-content">
                    <strong>{edu?.degree}</strong>
                  <h4 className="mb-1">{edu?.institution}</h4>
                </div>
              </div>
            ))}
          </section>
            {personaldetails?.languages?.length > 0 && (
              <>
                <h3 className="section-title-left">Languages</h3>
                <div className="progress-bar-left">
                  <div className="fill" style={{ width: "25%" }} />
                </div>
                <ul>
                  {personaldetails?.languages?.map((lang, i) => (
                    <li key={i}>• {lang}</li>
                  ))}
                </ul>
              </>
            )}

          </div>
        </div>

        <div className="right-column">
          <div className="container">
            <div className="name-box">
              <h1>
                {personaldetails?.firstname} {personaldetails?.lastname}
              </h1>
              <div className="role-line">
                <div />
                <span>{personaldetails?.role}</span>
                <div />
              </div>
            </div>
          </div>

          <section>
            <h3 className="section-title">Profile Summary</h3>
            <div className="progress-bar">
              <div className="fill" style={{ width: "15%" }} />
            </div>
            <p className="html" style={{textAlign:"justify"}} dangerouslySetInnerHTML={{ __html: summary?.value }} />
          </section>

          {/* <section>
            <h3 className="section-title">Education</h3>
            <div className="progress-bar">
              <div className="fill" style={{ width: "15%" }} />
            </div>
            {education?.value?.map((edu, i) => (
              <div key={i} className="entry">
                <span className="date">{edu?.year}</span>
                <div class="timeline">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>
                <div className="edu-content">
                  <h4>{edu?.degree}</h4>
                  <p>
                    <strong>{edu?.institution}</strong>
                  </p>
                </div>
              </div>
            ))}
          </section> */}

          <section>
            <h3 className="section-title">Work Experience</h3>
            <div className="progress-bar">
              <div className="fill" style={{ width: "15%" }} />
            </div>
            {experience?.value?.map((exp, i) => (
              <div key={i} className="entry">
                <span className="date">
                  {formatDate(exp?.startDate)} - {formatDate(exp?.endDate)}
                </span>
                <div class="timeline">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>
                <div className="exp-content" style={{marginBottom: i!== experience?.value?.length-1 ? '8px' : 0}}>
                  <h4 className="m-0">{exp?.position}</h4>
                  <p className="m-0" style={{color:"#333"}}>
                    <strong>
                      {exp?.company} {exp?.location}
                    </strong>
                  </p>
                  {exp?.responsibilities?.split("\n")?.map((line, idx) => (
                    <p key={idx} className="html" dangerouslySetInnerHTML={{ __html: line.replace(/<br\s*\/?>/gi, "") }} />
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section>
            {selectedTemplate.projects.value.length > 0 && (
              <div>
                <div className="section-title">PROJECTS</div>
                <div className="progress-bar">
                  <div className="fill" style={{ width: "15%" }} />
                </div>
              </div>
            )}
            {selectedTemplate?.projects?.value.map((pro, index) => (
               <div key={index} className="entry" style={{marginBottom: index!== selectedTemplate?.projects?.value?.length -1 ? '8px' : 0}}>
               <span className="date">
                 {formatDate(pro?.startDate)} - {formatDate(pro?.endDate)}
               </span>
               <div class="timeline">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>
                <div className="exp-content">
                <div
                  className="editor-preview"
                  style={{
                    marginTop: pro?.client_name?.trim() !== "" ? "4px" : "0px",
                  }}
                >
                  {pro.role}
                </div>

                <div>
                  <div>
                    <div
                       className="exp-content p-0 m-0"
                      style={{
                        margin: "4px 0px",
                        fontWeight:"bold"
                      }}
                    >
                      {pro?.client_name?.trim() ? pro.client_name : ""}
                      {pro.name
                        ? `${pro?.client_name?.trim() ? " • " : ""}  ${
                            pro.name
                          }`
                        : ""}
                      {pro.location ? ` • ${pro.location}` : ""}
                      {pro.startDate && dayjs(pro.startDate).isValid()
                        ? pro.endDate === "Present" ||
                          !pro.endDate ||
                          dayjs(pro.endDate).isValid()
                          ? ` • (${dayjs(pro.startDate).format("MMM YYYY")} - ${
                              pro.endDate === "Present" || !pro.endDate
                                ? "Present"
                                : dayjs(pro.endDate).format("MMM YYYY")
                            })`
                          : ""
                        : ""}
                    </div>
                    <div style={{ color: "#676fa9" }}>
                      {/* <span style={{  color: "#676fa9"}}>
                        {pro?.technology && "Technology/Tools - "}
                      </span> */}
                      {pro?.technology?.split(",").filter(Boolean).join(" • ")}
                    </div>
                  </div>
                  <div
                    className="html"
                    style={{
                      // paddingBottom:"10px",
                      marginBottom: "10px",
                      color: "rgb(127, 127, 127)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${pro.description}`,
                    }}
                  ></div>
                </div>
              </div>
              </div>
            ))}
          </section>
          {selectedTemplate?.custom?.map((section, index) => {
            const isEmpty = section.value?.trim() === "<p><br></p>";

            return !isEmpty ? (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div
                  className="heading editor-preview"
                  style={{
                    color: "#16365f",
                    // paddingTop: "10px",
                    // borderTop: "1px solid #d4731b",
                  }}
                >
                  {section.label?.toUpperCase()}
                </div>

                <div
                  className="editor-preview custom-body html"
                  dangerouslySetInnerHTML={{ __html: section?.value }}
                  style={{
                    color: "rgb(127, 127, 127)",
                    margin: "4px 0",
                    textAlign: "justify",
                  }}
                ></div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Resume_template_5;
