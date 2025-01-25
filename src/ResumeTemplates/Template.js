import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, duration } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TemplatePreview from "./TemplatePreview";
import "./Template.css";
import SelectedTemplate from "./SelectedTemplate";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import axios from "axios";
import Template1Img from "../Images/Template1.jpg";
import Template2Img from "../Images/Template2.png";
import Template3Img from "../Images/Template3.png";
import Template4Img from "../Images/Template4.png";
import Test from "./Test";
// import Cookies from "js-cookie";

// const csrfToken = Cookies.get("csrftoken");
// console.log("====================================");
// console.log("csrfToken", csrfToken);
// console.log("====================================");
// // axios.defaults.withCredentials = true;

export default function Template() {
  const [te, setTe] = useState(null);
  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/login/",
        {
          username: "Rohith P",
          password: "0987",
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Custom headers can go here if needed
          },
        }
      )
      .then((res) => {
        document.cookie = `csrftoken=${res.data.data[1].csrftoken}`;
        setTe(`csrftoken=${res.data.data[1].csrftoken}`);
        console.log("====================================");
        console.log(document.cookie);
        console.log("====================================");
        const username = "Rohith P";
        const password = "0987";
        const basicAuth = "Basic " + btoa(`${username}:${password}`);
        console.log("====================================");
        console.log("res", res.data);
        console.log("====================================");

        setTimeout(() => {
          const username = "Rohith P";
          const password = "0987";
          const basicAuth = "Basic " + btoa(`${username}:${password}`);

          axios
            .get("http://localhost:8000/api/resume-template/", {
              headers: {
                // "X-CSRFToken": csrfToken, // Django expects this header
                // "Content-Type": "application/json",
                Authorization: basicAuth,
              },
            })
            .then((res) => {
              console.log("res", res.data);
              // setAllTemplates(res.data);
            })
            .catch((err) => {});
        }, 2000);
      })
      .catch((err) => {
        console.log("err", err);
      });

    // axios
    //   .get("http://localhost:8000/api/resume-template/")
    //   .then((res) => {
    //     console.log("res", res.data);
    //     // setAllTemplates(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  }, [1 === 1]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/user-details/")
  //     .then((res) => {
  //       console.log("res", res.data);
  //       // setAllTemplates(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, []);
  const [allTemplates, setAllTemplates] = useState([
    // {
    //   personaldetails: {
    //     firstname: "VIGNESH",
    //     lastname: "P",
    //     email: "pvignesh358@gmail.com",
    //     phone: "9566805138",
    //     city: "TENKASI",
    //     country: "India",
    //     pincode: "627818",
    //     photo: null,
    //   },
    //   summary: {
    //     label: "summary",
    //     value: `<div>Software engineering is a computer science field that involves designing, developing, testing, and maintaining software applications</div>`,
    //   },
    //   skills: {
    //     label: "skills",
    //     value: `
    //     <ul>
    //       <li>JavaScript</li>
    //       <li>React</li>
    //       <li>CSS</li>
    //     </ul>
    //   `,
    //   },
    //   experience: {
    //     label: "experience",
    //     value: [
    //       {
    //         title: "Retail Sales Associate",
    //         company: "ZARA",
    //         location: "New Delhi, India",
    //         duration: "02/2017 - Current",
    //         responsibilities: [
    //           "Increased monthly sales 10% by upselling products.",
    //         ],
    //       },
    //     ],
    //   },
    //   education: {
    //     label: "education",
    //     value: [
    //       {
    //         institute: "Oxford Software Institute, New Delhi",
    //         degree: "Diploma in Financial Accounting",
    //         year: "2016",
    //       },
    //     ],
    //   },
    //   certificate: {
    //     label: "certificate",
    //     value: [
    //       {
    //         name: "Advanced Algorithms and Data Structures",
    //         year: "2021",
    //         link: "",
    //       },
    //       {
    //         name: "React Certification",
    //         link: "",
    //         year: "2024",
    //       },
    //     ],
    //   },
    //   template_id: 1,
    //   template_name: "Template1",
    //   template_image: null,
    //   template_styles: {
    //     bgcolor: "#00a8ee",
    //     color: "red",
    //     textSize: 10,
    //     fontFamily: "Arial",
    //     headingSize: 12,
    //     sectionSpacing: 2,
    //     lineSpacing: 1,
    //     topbottomMargin: 1,
    //     sideMargin: 1,
    //     paragraphIndent: 1,
    //   },
    //   sections: {
    //     has_personaldetails: true,
    //     has_experience: true,
    //     has_education: true,
    //     has_certificates: true,
    //     has_skills: true,
    //     has_summary: true,
    //   },
    //   steps: [
    //     { label: "Home", icon: <HomeIcon /> },
    //     { label: "Personal Details", icon: <PersonIcon /> },
    //     { label: "Summary", icon: <PersonIcon /> },
    //     { label: "Skills", icon: <BuildIcon /> },
    //     { label: "Education", icon: <SchoolIcon /> },
    //     { label: "Certificate", icon: <SchoolIcon /> },
    //   ],
    //   // steps: [
    //   //   { label: "Home", icon: "home" },
    //   //   { label: "Personal Details", icon: "person" },
    //   //   { label: "Summary", icon: "person" },
    //   //   { label: "Skills", icon: "build" },
    //   //   { label: "Education", icon: "school" },
    //   //   { label: "Certificate", icon: "school" },
    //   // ],
    // },
    {
      personaldetails: {
        firstname: "VIGNESH",
        lastname: "P",
        email: "pvignesh358@gmail.com",
        phone: "9566805138",
        city: "Tenkasi",
        country: "India",
        pincode: "627818",
        photo: null,
        role: "Software Engineer",
      },
      summary: {
        label: "summary",
        value:
          "Motivated Data Visualization Engineer with 3 years of experience specializing in Spotfire, Power BI, SQL, and Python. Skilled in advanced data analytics and visualization, with a strong background in designing scalable relational and NoSQL database solutions. Proficient in data migration and integration, complex data structures, and transaction management. Adept at solving technical challenges in dynamic environments, with a commitment to continuous learning and improvement. Experienced in working with various databases including MySQL, Postgres, Oracle, Hive, and YugabyteDB.",
      },
      skills: {
        label: "skills",
        value: [
          "Power BI",
          "Spotfire",
          "Snowflake",
          "SSRS",
          "Excel",
          "Oracle",
          "DSE Graph",
          "MySQL",
          "CQL",
          "Linux",
          "Playwright",
          "Golang",
          "Python",
          "Django",
          "SQL",
          "PLSQL",
          "MLflow",
          "git",
        ],
      },
      experience: {
        label: "experience",
        value: [
          {
            position: "Retail Sales Associate",
            company: "ZARA",
            location: "New Delhi, India",
            duration: "02/2017 - Current",
            responsibilities:
              "Increased monthly sales 10% by upselling products.",
          },
          {
            position: "Retail Sales Associate",
            company: "ZARA",
            location: "New Delhi, India",
            duration: "02/2017 - Current",
            responsibilities:
              "Increased monthly sales 10% by upselling products.",
          },
        ],
        has_position: true,
        has_company: true,
        has_location: true,
        has_duration: true,
        has_responsibilities: true,
      },
      education: {
        label: "education",
        value: [
          {
            institution: "Oxford Software Institute, New Delhi",
            degree: "Diploma in Financial Accounting",
            year: "2016",
            duration: "2 years",
            location: "New Delhi",
            marks: "80%",
          },
        ],
        has_institution: true,
        has_degree: true,
        has_location: true,
        has_duration: true,
        has_mark: true,
      },
      certificate: {
        label: "certificate",
        value: [
          {
            name: "Advanced Algorithms and Data Structures",
            year: "2021",
            link: "",
            organization: "",
          },
          {
            name: "React Certification",
            link: "",
            year: "2024",
            organization: "",
          },
        ],
        has_link: true,
        has_name: true,
        has_year: true,
        has_organization: true,
      },
      projects: {
        label: "projects",
        value: [
          {
            name: "Demo",
            role: "developer",
            description: "working on demo project",
            location: "India",
            duration: "2 years",
          },
        ],
        has_name: true,
        has_role: true,
        has_location: true,
        has_duration: true,
        has_description: true,
      },
      template_id: 1,
      template_name: "Template1",
      template_image: null,
      template_styles: {
        bgcolor: "#00a8ee",
        color: "red",
        textSize: 10,
        fontFamily: "Arial",
        headingSize: 12,
        sectionSpacing: 2,
        lineSpacing: 1,
        topbottomMargin: 1,
        sideMargin: 1,
        paragraphIndent: 1,
      },
      sections: {
        has_personaldetails: true,
        has_experience: true,
        has_education: true,
        has_certificates: true,
        has_skills: true,
        has_summary: true,
        has_additional: false,
      },
      steps: [
        { label: "Home", icon: <HomeIcon /> },
        { label: "Personal Details", icon: <PersonIcon /> },
        { label: "Summary", icon: <PersonIcon /> },
        { label: "Skills", icon: <BuildIcon /> },
        { label: "Education", icon: <SchoolIcon /> },
        { label: "Certificate", icon: <SchoolIcon /> },
        { label: "Experience", icon: <SchoolIcon /> },
        { label: "Projects", icon: <SchoolIcon /> },
      ],
    },
    // {
    //   personaldetails: {
    //     firstname: "VIGNESH",
    //     lastname: "P",
    //     email: "pvignesh358@gmail.com",
    //     phone: "9566805138",
    //     city: "Tenkasi",
    //     country: "India",
    //     pincode: "627818",
    //     photo: null,
    //     role: "Software Engineer",
    //   },
    //   summary: {
    //     label: "summary",
    //     value:
    //       "Motivated Data Visualization Engineer with 3 years of experience specializing in Spotfire, Power BI, SQL, and Python. Skilled in advanced data analytics and visualization, with a strong background in designing scalable relational and NoSQL database solutions. Proficient in data migration and integration, complex data structures, and transaction management. Adept at solving technical challenges in dynamic environments, with a commitment to continuous learning and improvement. Experienced in working with various databases including MySQL, Postgres, Oracle, Hive, and YugabyteDB.",
    //   },
    //   skills: {
    //     label: "skills",
    //     value: [
    //       "Power BI",
    //       "Spotfire",
    //       "Snowflake",
    //       "SSRS",
    //       "Excel",
    //       "Oracle",
    //       "DSE Graph",
    //       "MySQL",
    //       "CQL",
    //       "Linux",
    //       "Playwright",
    //       "Golang",
    //       "Python",
    //       "Django",
    //       "SQL",
    //       "PLSQL",
    //       "MLflow",
    //       "git",
    //     ],
    //   },
    //   experience: {
    //     label: "experience",
    //     value: [
    //       {
    //         position: "Retail Sales Associate",
    //         company: "ZARA",
    //         location: "New Delhi, India",
    //         duration: "02/2017 - Current",
    //         responsibilities: [
    //           "Increased monthly sales 10% by upselling products.",
    //         ],
    //       },
    //     ],
    //     has_position: true,
    //     has_company: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_responsibilities: true,
    //   },
    //   education: {
    //     label: "education",
    //     value: [
    //       {
    //         institution: "Oxford Software Institute, New Delhi",
    //         degree: "Diploma in Financial Accounting",
    //         year: "2016",
    //         duration: "2 years",
    //         location: "New Delhi",
    //         marks: "80%",
    //       },
    //     ],
    //     has_institution: true,
    //     has_degree: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_mark: true,
    //   },
    //   certificate: {
    //     label: "certificate",
    //     value: [
    //       {
    //         name: "Advanced Algorithms and Data Structures",
    //         year: "2021",
    //         link: "",
    //         organization: "",
    //       },
    //       {
    //         name: "React Certification",
    //         link: "",
    //         year: "2024",
    //         organization: "",
    //       },
    //     ],
    //     has_link: true,
    //     has_name: true,
    //     has_year: true,
    //     has_organization: true,
    //   },
    //   projects: {
    //     label: "projects",
    //     value: [
    //       {
    //         name: "Demo",
    //         role: "developer",
    //         description: "working on demo project",
    //         location: "India",
    //         duration: "2 years",
    //       },
    //     ],
    //     has_name: true,
    //     has_role: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_description: true,
    //   },
    //   template_id: 1,
    //   template_name: "Template2",
    //   template_image: null,
    //   template_styles: {
    //     bgcolor: "#00a8ee",
    //     color: "red",
    //     textSize: 10,
    //     fontFamily: "Arial",
    //     headingSize: 12,
    //     sectionSpacing: 2,
    //     lineSpacing: 1,
    //     topbottomMargin: 1,
    //     sideMargin: 1,
    //     paragraphIndent: 1,
    //   },
    //   sections: {
    //     has_personaldetails: true,
    //     has_experience: true,
    //     has_education: true,
    //     has_certificates: true,
    //     has_skills: true,
    //     has_summary: true,
    //     has_additional: false,
    //   },
    //   steps: [
    //     { label: "Home", icon: <HomeIcon /> },
    //     { label: "Personal Details", icon: <PersonIcon /> },
    //     { label: "Summary", icon: <PersonIcon /> },
    //     { label: "Skills", icon: <BuildIcon /> },
    //     { label: "Education", icon: <SchoolIcon /> },
    //     { label: "Certificate", icon: <SchoolIcon /> },
    //     { label: "Projects", icon: <SchoolIcon /> },
    //   ],
    // },
    // {
    //   personaldetails: {
    //     firstname: "VIGNESH",
    //     lastname: "P",
    //     email: "pvignesh358@gmail.com",
    //     phone: "9566805138",
    //     city: "Tenkasi",
    //     country: "India",
    //     pincode: "627818",
    //     photo: null,
    //     role: "Software Engineer",
    //   },
    //   summary: {
    //     label: "summary",
    //     value:
    //       "Motivated Data Visualization Engineer with 3 years of experience specializing in Spotfire, Power BI, SQL, and Python. Skilled in advanced data analytics and visualization, with a strong background in designing scalable relational and NoSQL database solutions. Proficient in data migration and integration, complex data structures, and transaction management. Adept at solving technical challenges in dynamic environments, with a commitment to continuous learning and improvement. Experienced in working with various databases including MySQL, Postgres, Oracle, Hive, and YugabyteDB.",
    //   },
    //   skills: {
    //     label: "skills",
    //     value: [
    //       "Power BI",
    //       "Spotfire",
    //       "Snowflake",
    //       "SSRS",
    //       "Excel",
    //       "Oracle",
    //       "DSE Graph",
    //       "MySQL",
    //       "CQL",
    //       "Linux",
    //       "Playwright",
    //       "Golang",
    //       "Python",
    //       "Django",
    //       "SQL",
    //       "PLSQL",
    //       "MLflow",
    //       "git",
    //     ],
    //   },
    //   experience: {
    //     label: "experience",
    //     value: [
    //       {
    //         position: "Retail Sales Associate",
    //         company: "ZARA",
    //         location: "New Delhi, India",
    //         duration: "02/2017 - Current",
    //         responsibilities:
    //           "Increased monthly sales 10% by upselling products.",
    //       },
    //     ],
    //     has_position: true,
    //     has_company: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_responsibilities: true,
    //   },
    //   education: {
    //     label: "education",
    //     value: [
    //       {
    //         institution: "Oxford Software Institute, New Delhi",
    //         degree: "Diploma in Financial Accounting",
    //         year: "2016",
    //         duration: "2 years",
    //         location: "New Delhi",
    //         marks: "80%",
    //       },
    //     ],
    //     has_institution: true,
    //     has_degree: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_mark: true,
    //   },
    //   certificate: {
    //     label: "certificate",
    //     value: [
    //       {
    //         name: "Advanced Algorithms and Data Structures",
    //         year: "2021",
    //         link: "",
    //         organization: "",
    //       },
    //       {
    //         name: "React Certification",
    //         link: "",
    //         year: "2024",
    //         organization: "",
    //       },
    //     ],
    //     has_link: true,
    //     has_name: true,
    //     has_year: true,
    //     has_organization: true,
    //   },
    //   projects: {
    //     label: "projects",
    //     value: [
    //       {
    //         name: "Demo",
    //         role: "developer",
    //         description: "working on demo project",
    //         location: "India",
    //         duration: "2 years",
    //       },
    //     ],
    //     has_name: true,
    //     has_role: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_description: true,
    //   },
    //   template_id: 1,
    //   template_name: "Template3",
    //   template_image: null,
    //   template_styles: {
    //     bgcolor: "#00a8ee",
    //     color: "red",
    //     textSize: 10,
    //     fontFamily: "Arial",
    //     headingSize: 12,
    //     sectionSpacing: 2,
    //     lineSpacing: 1,
    //     topbottomMargin: 1,
    //     sideMargin: 1,
    //     paragraphIndent: 1,
    //   },
    //   sections: {
    //     has_personaldetails: true,
    //     has_experience: true,
    //     has_education: true,
    //     has_certificates: true,
    //     has_skills: true,
    //     has_summary: true,
    //     has_additional: false,
    //   },
    //   steps: [
    //     { label: "Home", icon: <HomeIcon /> },
    //     { label: "Personal Details", icon: <PersonIcon /> },
    //     { label: "Summary", icon: <PersonIcon /> },
    //     { label: "Skills", icon: <BuildIcon /> },
    //     { label: "Education", icon: <SchoolIcon /> },
    //     { label: "Certificate", icon: <SchoolIcon /> },
    //     { label: "Projects", icon: <SchoolIcon /> },
    //   ],
    // },
    // {
    //   personaldetails: {
    //     firstname: "VIGNESH",
    //     lastname: "P",
    //     email: "pvignesh358@gmail.com",
    //     phone: "9566805138",
    //     city: "Tenkasi",
    //     country: "India",
    //     pincode: "627818",
    //     photo: null,
    //     role: "Software Engineer",
    //   },
    //   summary: {
    //     label: "summary",
    //     value:
    //       "Motivated Data Visualization Engineer with 3 years of experience specializing in Spotfire, Power BI, SQL, and Python. Skilled in advanced data analytics and visualization, with a strong background in designing scalable relational and NoSQL database solutions. Proficient in data migration and integration, complex data structures, and transaction management. Adept at solving technical challenges in dynamic environments, with a commitment to continuous learning and improvement. Experienced in working with various databases including MySQL, Postgres, Oracle, Hive, and YugabyteDB.",
    //   },
    //   skills: {
    //     label: "skills",
    //     value: [
    //       "Power BI",
    //       "Spotfire",
    //       "Snowflake",
    //       "SSRS",
    //       "Excel",
    //       "Oracle",
    //       "DSE Graph",
    //       "MySQL",
    //       "CQL",
    //       "Linux",
    //       "Playwright",
    //       "Golang",
    //       "Python",
    //       "Django",
    //       "SQL",
    //       "PLSQL",
    //       "MLflow",
    //       "git",
    //     ],
    //   },
    //   experience: {
    //     label: "experience",
    //     value: [
    //       {
    //         position: "Retail Sales Associate",
    //         company: "ZARA",
    //         location: "New Delhi, India",
    //         duration: "02/2017 - Current",
    //         responsibilities:
    //           "Increased monthly sales 10% by upselling products.",
    //       },
    //     ],
    //     has_position: true,
    //     has_company: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_responsibilities: true,
    //   },
    //   education: {
    //     label: "education",
    //     value: [
    //       {
    //         institution: "Oxford Software Institute, New Delhi",
    //         degree: "Diploma in Financial Accounting",
    //         year: "2016",
    //         duration: "2 years",
    //         location: "New Delhi",
    //         marks: "80%",
    //       },
    //     ],
    //     has_institution: true,
    //     has_degree: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_mark: true,
    //   },
    //   certificate: {
    //     label: "certificate",
    //     value: [
    //       {
    //         name: "Advanced Algorithms and Data Structures",
    //         year: "2021",
    //         link: "",
    //         organization: "",
    //       },
    //       {
    //         name: "React Certification",
    //         link: "",
    //         year: "2024",
    //         organization: "",
    //       },
    //     ],
    //     has_link: true,
    //     has_name: true,
    //     has_year: true,
    //     has_organization: true,
    //   },
    //   projects: {
    //     label: "projects",
    //     value: [
    //       {
    //         name: "Demo",
    //         role: "developer",
    //         description: "working on demo project",
    //         location: "India",
    //         duration: "2 years",
    //       },
    //     ],
    //     has_name: true,
    //     has_role: true,
    //     has_location: true,
    //     has_duration: true,
    //     has_description: true,
    //   },
    //   template_id: 1,
    //   template_name: "Template4",
    //   template_image: null,
    //   template_styles: {
    //     bgcolor: "#00a8ee",
    //     color: "red",
    //     textSize: 10,
    //     fontFamily: "Arial",
    //     headingSize: 12,
    //     sectionSpacing: 2,
    //     lineSpacing: 1,
    //     topbottomMargin: 1,
    //     sideMargin: 1,
    //     paragraphIndent: 1,
    //   },
    //   sections: {
    //     has_personaldetails: true,
    //     has_experience: true,
    //     has_education: true,
    //     has_certificates: true,
    //     has_skills: true,
    //     has_summary: true,
    //     has_additional: false,
    //   },
    //   steps: [
    //     { label: "Home", icon: <HomeIcon /> },
    //     { label: "Personal Details", icon: <PersonIcon /> },
    //     { label: "Summary", icon: <PersonIcon /> },
    //     { label: "Skills", icon: <BuildIcon /> },
    //     { label: "Education", icon: <SchoolIcon /> },
    //     { label: "Certificate", icon: <SchoolIcon /> },
    //     { label: "Projects", icon: <SchoolIcon /> },
    //   ],
    // },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const Clicks = () => {
    console.log("====================================");
    console.log("te", te);
    console.log("====================================");
    const cookies = te.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});
    console.log("====================================");
    console.log(cookies);
    console.log("====================================");
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.csrftoken,
    };
    axios
      .get("http://localhost:8000/api/user-details/", { headers })
      .then((res1) => {
        console.log("res", res1.data);
        // setAllTemplates(res.data);
      })
      .catch((err1) => {
        console.log("err", err1);
      });
  };

  // Calculate the number of items that can fit in the first row
  const itemsPerRow = Math.floor(window.innerWidth / 320); // Assuming each item has width 300px + margin

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSelect = (template) => {
    console.log("seletem", template);
    setActiveTab(1);

    setSelectedTemplate(template);
  };
  return (
    <div
      style={{
        // background: "linear-gradient(180deg, #fff 0%, #ceeeff 100%)",
        height: "100vh",
      }}
    >
      {activeTab === 0 && (
        <>
          <Navbar />
          {/* <Button onClick={Clicks} variant="contained" color="primary">
            csdn
          </Button> */}
          {/* <Test/> */}
          <Box sx={{ padding: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Align items on both sides
                alignItems: "center", // Vertically center the items
                marginBottom: 2, // Space below the Box
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, marginLeft: 2 }}
                >
                  Resume Builder
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block", color: "lightgray" },
                    marginLeft: 2,
                    fontSize: "12px",
                  }}
                >
                  Select from the following templates
                </Typography>
              </div>

              {/* Show/Hide button */}
              {allTemplates.length > itemsPerRow && (
                <Button
                  onClick={handleToggleShowAll}
                  endIcon={<ArrowForwardIcon />}
                  style={{ textTransform: "none" }}
                >
                  {showAll ? "See Less" : "See All"}
                </Button>
              )}
            </Box>

            {/* Other content */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                padding: 2,
              }}
            >
              {(showAll
                ? allTemplates
                : allTemplates.slice(0, itemsPerRow)
              ).map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: 300,
                    height: 350,
                    backgroundColor: value.template_styles.bgcolor,
                    padding: "25px",
                    borderRadius: "5px",
                    opacity: 0.6,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleSelect(value);
                  }}
                >
                  {console.log("Templarete", value)}
                  {/* Your content here */}
                  <img
                    src={
                      [Template1Img, Template2Img, Template3Img, Template4Img][
                        index
                      ]
                    }
                    alt={value.template_name}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </Box>
          </Box>
        </>
      )}
      {activeTab === 1 && (
        <Box>
          {selectedTemplate !== null && (
            <TemplatePreview
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setActiveTab={setActiveTab}
            />
          )}
        </Box>
      )}
    </div>
  );
}
