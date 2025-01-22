import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Home() {
  const data = [
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      address: "123 Main St, New York, NY",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit velit vitae tortor euismod, non luctus odio feugiat. Suspendisse potenti. Integer ullamcorper tinciLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit velit vitae tortor euismod, non luctus odio feugiat. Suspendisse potenti. Integer ullamcorper tinciLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit velit vitae tortor euismod, non luctus odio feugiat. Suspendisse potenti. Integer ullamcorper tinciLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit velit vitae tortor euismod, non luctus odio feugiat. Suspendisse potenti. Integer ullamcorper tinciLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit velit vitae tortor euismod, non luctus odio feugiat. Suspendisse potenti. Integer ullamcorper tincidunt magna, nec tempor nisi egestas id. Vestibulum viverra, orci vitae vehicula consequat, metus purus vestibulum eros, ac cursus odio eros eu lectus.",
    },
    {
      name: "Jane Smith",
      age: 25,
      email: "janesmith@example.com",
      address: "456 Elm St, Los Angeles, CA",
      details:
        "Donec fringilla arcu ut felis volutpat viverra. Phasellus ac dolor tristique, aliquam velit in, sodales sapien. Aliquam sit amet ullamcorper elit. Etiam suscipit risus vitae vestibulum sollicitudin. Sed nec orci non metus lobortis facilisis ut in dui.",
    },
    {
      name: "Sarah Lee",
      age: 35,
      email: "sarahlee@example.com",
      address: "789 Oak St, Chicago, IL",
      details:
        "Aenean sed mi ut velit vulputate placerat. Nulla tristique enim non tincidunt venenatis. Aliquam erat volutpat. Cras aliquet condimentum elit, at ullamcorper nisl volutpat vel. Ut eget magna sit amet felis feugiat faucibus.",
    },
  ];

  // Custom row template for scrollable content
  const rowTemplate = (rowData) => {
    return (
      <div className="scrollable-row">
        <div className="row-content">
          <strong>Name:</strong> {rowData.name}
          <br />
          <strong>Details:</strong> {rowData.details}
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="video-container">
        <video autoPlay loop muted className="video">
          <source
            src={`${process.env.PUBLIC_URL}/GreenHome.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Navbar />
        <div className="content-container d-flex justify-content-center align-items-center bg-dark">
          <div
            style={{ marginTop: "10px" }}
            className="text-secondary px-4 py-5 text-center"
          >
            <div className="py-5">
              <h1
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="neon"
              >
                WEB RESUME BUILDER
              </h1>
              <div className="col-lg-6 mx-auto">
                <p className="fs-5 mb-4" style={{ marginTop: "30px" }}>
                  Craft your professional resume with ease using our intuitive
                  builder. Highlight your skills, showcase your achievements,
                  and stand out to potential employers with a polished,
                  user-friendly design. From fresh graduates to seasoned
                  professionals, our tools make the process seamless.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link
                    to="/create"
                    className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                  >
                    Create Resume
                  </Link>
                  <Link
                    to="/create"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    My Resumes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <h2>PrimeReact Table with Scrollable Rows (Fixed Header Alignment)</h2>
    //   <DataTable value={data} className="scrollable-rows-table">
    //     <Column field="name" header="Name" />
    //     <Column field="age" header="Age" />
    //     <Column field="email" header="Email" />
    //     <Column field="address" header="Address" />
    //     <Column
    //       field="details"
    //       header="Details"
    //       body={(rowData) => (
    //         <div className="scrollable-cell">{rowData.details}</div>
    //       )}
    //     />
    //   </DataTable>

    //   {/* CSS Styling */}
    //   <style jsx>{`
    //     /* Maintain table structure for proper alignment */
    //     .scrollable-rows-table .p-datatable-tbody > tr {
    //       max-height: 100px; /* Set row height */
    //       overflow-y: auto; /* Enable vertical scrolling */
    //     }

    //     .scrollable-rows-table .p-datatable-tbody > tr > td {
    //       vertical-align: top; /* Align text at the top */
    //       white-space: normal; /* Wrap text */
    //     }

    //     .scrollable-rows-table .p-datatable-wrapper {
    //       max-height: 500px; /* Set max height for the entire table */
    //       overflow-y: auto; /* Enable vertical scrolling for table rows */
    //     }

    //     /* Header styling remains intact */
    //     .p-datatable-thead > tr > th {
    //       background-color: #f4f4f4;
    //       position: sticky;
    //       top: 0;
    //       z-index: 2;
    //     }
    //   `}</style>
    // </div>
  );
}
