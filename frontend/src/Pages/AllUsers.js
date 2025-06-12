import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { store } from "./store";
import { useNavigate, useNavigationType } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UserForm from "./UserForm";
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Add } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BiChevronUp, BiChevronDown, BiSort } from "react-icons/bi";
import { RxCaretSort } from "react-icons/rx";
import animationgif from "../Images/animation_loader.gif";
import { useDispatch } from "react-redux";
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "10px",
};

const headerStyles = {
  backgroundColor: "#f4f4f4",
  color: "#333",
  textAlign: "left",
  padding: "12px",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
};

const rowStyles = {
  backgroundColor: "#fff",
  transition: "background-color 0.2s ease",
};

const cellStyles = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const editButtonStyles = {
  backgroundColor: "white",
  //   color: "#fff",
  border: "none",
  // padding: "6px 12px",
  // borderRadius: "4px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteButtonStyles = {
  backgroundColor: "white",
  color: "#fff",
  border: "none",
  // padding: "6px 12px",
  // borderRadius: "4px",
  cursor: "pointer",
};

const scrollableTableWrapperStyles = {
  maxHeight: "500px",
  overflowY: "auto",
  display: "block",
};

export default function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoggedIn = store.getState()?.user?.isLoggedIn;
  const pathname = window.location.pathname;
  const navigationType = useNavigationType();
  const [allUsers, setAllUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserDetails();
  }, []);
  // Edit Handler
  const handleEdit = (rowData) => {
    // alert(`Edit ${rowData.username}`);
    setIsEdit(true);
    rowData.user_id = rowData.id;
    setSelectedUser(rowData);
    // rowData.role = "admin";
    // axiosInstance
    //   .put("api/user-details/", rowData)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  const handleDelete = (rowData) => {
    setSelectedToDelete(rowData);
    setOpenDeleteDialog(true);
  };

  // Delete Handler
  const confirmDelete = async () => {
    try {
      if (selectedToDelete) {
        await axiosInstance.delete(
          `api/user-details/?user_id=${selectedToDelete.id}`
        );
        toast.success(
          `${selectedToDelete.username}'s account deleted successfully!`
        );
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error?.response?.data?.error?.message);
    } finally {
      getUserDetails();
      setOpenDeleteDialog(false);
      setSelectedToDelete(null);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/"); // Redirect to login if not logged in
    }
  }, []);
  const getUserDetails = () => {
    setLoading(true);
    axiosInstance
      .get("api/user-details/")
      .then((res) => {
        console.log(res);
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const actionTemplate = (rowData) => (
    <>
      <div icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
      <div icon="pi pi-trash" onClick={() => handleDelete(rowData)} />
    </>
  );

  const userStatusTemplate = (user) => {
    return user.is_active ? (
      <Tooltip title="Active">
        <ToggleOnIcon style={{ color: "green", fontSize: 28 }} />
      </Tooltip>
    ) : (
      <Tooltip title="Inactive">
        <ToggleOffIcon style={{ color: "gray", fontSize: 28 }} />
      </Tooltip>
    );
  };

  const actionsTemplate = (user, options) => {
    const { rowIndex } = options;
    const isAlternateRow = rowIndex % 2 === 0; // 1, 3, 5...

    const commonStyle = {
      backgroundColor: isAlternateRow ? "white" : "#f8f8fa",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      color: "#555",
    };

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Tooltip title="Edit User">
          <button style={commonStyle} onClick={() => handleEdit(user)}>
            ✏️
          </button>
        </Tooltip>

        <Tooltip title="Delete User">
          <button style={commonStyle} onClick={() => handleDelete(user)}>
            🗑️
          </button>
        </Tooltip>

        <Tooltip title="View Resumes">
          <button
            className="ms-1 mb-1"
            style={{
              ...commonStyle,
              color: "darkblue",
            }}
            onClick={() => {
              navigate(`/usertemplates/home/${user.id}`);
              dispatch({
                type: "SELECTED_USER_NAME",
                username: user?.username, // or just user?.username if needed
              });              
          }}
          >
            <DescriptionIcon
              style={{ fontSize: "20px", backgroundColor: "transparent" }}
            />
          </button>
        </Tooltip>
      </div>
    );
  };
  const customSortIcon = (props) => {
    // Conditional rendering based on the sortOrder value
    if (props.sortOrder === 1) {
      return <BiChevronUp className="ms-2" style={{ fontSize: 20 }} />; // Ascending sort icon
    }
    if (props.sortOrder === -1) {
      return <BiChevronDown className="ms-2" style={{ fontSize: 20 }} />; // Descending sort icon
    }
    return <RxCaretSort className="ms-2" style={{ fontSize: 22 }} />; // Default sort icon (neutral)
  };
  return (
    <div>
      <div className="card" style={{ height: "100vh" }}>
        {/* <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable> */}
        <Navbar />
        {selectedUser === null ? (
          <>
            {loading ? (
              <div
                style={{
                  paddingTop: "10px",
                  margin: "auto",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <img src={animationgif} />
              </div>
            ) : (
              <div className="mx-5" style={{ paddingTop: "100px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {/* Back Button */}
                  <div className="d-flex align-items-center">
                    <IconButton
                      sx={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: "#f9fafb", // Mild light grey background
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        zIndex: 1000,
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#e0e0e0", // Slightly darker grey on hover
                        },
                      }}
                      onClick={() => {
                        navigate("/home");
                      }}
                    >
                      <ArrowBackIcon
                        fontSize="small"
                        style={{ cursor: "pointer", color: "gray" }}
                      />
                    </IconButton>
                    <Typography
                      className="ms-1"
                      sx={{ fontSize: "20px", color: "#333", fontWeight: 600 }}
                    >
                      All Users
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedUser(true);
                      setIsEdit(false);
                    }}
                    style={{ display: "flex", marginLeft: "auto" }}
                    endIcon={<Add />}
                  >
                    Add user
                  </Button>
                </div>
                <div
                  className="card border-0 mt-3"
                  style={{
                    marginTop: "10px",
                    boxShadow: "none",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <DataTable
                    value={data}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    scrollable
                    // scrollHeight="400px"
                    stripedRows
                    responsiveLayout="scroll"
                    className="p-datatable-sm w-100"
                    style={{ borderRadius: "8px", overflow: "hidden" }}
                    sortIcon={customSortIcon}
                    emptyMessage={
                      <div
                        style={{
                          textAlign: "center",
                          color: "#888",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        No users found.
                      </div>
                    }
                    removableSort
                  >
                    <Column
                      field="username"
                      header="Name"
                      sortable
                      style={{ minWidth: "160px" }}
                      headerStyle={{ height: "60px", fontWeight: "bold" }}
                    />
                    <Column
                      field="email"
                      header="Email"
                      sortable
                      style={{ minWidth: "200px" }}
                      headerStyle={{ height: "60px", fontWeight: "bold" }}
                    />
                    <Column
                      field="role"
                      header="Role"
                      sortable
                      style={{ minWidth: "120px" }}
                      headerStyle={{ height: "60px", fontWeight: "bold" }}
                    />
                    <Column
                      header="User Status"
                      body={userStatusTemplate}
                      style={{ minWidth: "140px" }}
                      headerStyle={{ height: "60px", fontWeight: "bold" }}
                    />
                    <Column
                      header="Actions"
                      body={actionsTemplate}
                      style={{ maxWidth: "120px" }}
                      headerStyle={{ height: "60px", fontWeight: "bold" }}
                    />
                  </DataTable>
                </div>
                {/* <div style={scrollableTableWrapperStyles}>
              <table style={tableStyles}>
                <thead>
                  <tr>
                    <th style={headerStyles}>ID</th> 
                    <th style={headerStyles}>Name</th>
                    <th style={headerStyles}>Email</th>
                    <th style={headerStyles}>Role</th>
                    <th style={headerStyles}>User Status</th>
                    <th style={headerStyles}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((user) => (
                    <tr key={user.id} style={rowStyles}>
                       <td style={cellStyles}>{user.id}</td> 
                      <td style={cellStyles}>{user.username || user.email}</td>
                      <td style={cellStyles}>{user.email}</td>
                      <td style={cellStyles}>{user.role}</td>
                      <td style={cellStyles}>
                      {user.is_active ? (
                      <Tooltip title="Active">
                        <ToggleOnIcon style={{ color: 'green', verticalAlign: 'middle', fontSize: 29 }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Inactive">
                        <ToggleOffIcon style={{ color: 'red', verticalAlign: 'middle', fontSize: 29 }} />
                      </Tooltip>
                    )}
                      </td>
                      <td style={{
                        display:"flex",
                        alignItems:"center",
                        ...cellStyles
                        }}>
                      <Tooltip title="Edit User">
                        <button
                          style={editButtonStyles}
                          onClick={() => handleEdit(user)}
                        >
                          ✏️
                        </button>
                      </Tooltip>

                      <Tooltip title="Delete User">
                        <button
                          style={deleteButtonStyles}
                          onClick={() => handleDelete(user)}
                        >
                          🗑️
                        </button>
                      </Tooltip>
                        <Tooltip title="View Resumes">
                      <button
                        className="ms-1 mb-1"
                        style={{
                          color: "darkblue",
                          ...editButtonStyles,
                        }}
                        onClick={() => navigate(`/usertemplates/${user.id}`)}
                      >
                        <DescriptionIcon style={{ fontSize: "20px" }} />
                      </button>
                    </Tooltip>
                      </td>
                      <td style={cellStyles}>
                      </td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>  */}
              </div>
            )}
          </>
        ) : (
          <div className="container" style={{ paddingTop: "100px" }}>
            <UserForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              isEdit={isEdit}
              getUserDetails={getUserDetails}
              setIsEdit={setIsEdit}
            />
          </div>
        )}
      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1.5,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            pb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Account?
          </Typography>
          <IconButton onClick={() => setOpenDeleteDialog(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2, py: 1 }}>
          <Typography variant="body1">
            Are you sure you want to delete <b>{selectedToDelete?.username}</b>
            's account?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              minWidth: 100, // or use width: 100
              color: "#555",
              borderColor: "#ccc",
              backgroundColor: "#f9fafb",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                borderColor: "#bdbdbd",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            sx={{
              minWidth: 100, // match the Cancel button
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
