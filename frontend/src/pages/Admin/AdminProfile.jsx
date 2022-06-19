import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AdminHeader from "../../Components/Admin/Adminheader";
import img from "../../assets/images/Userpfp.jpg";
import { collection, getDocs } from "firebase/firestore";
import UpdateName from "../../Components/Admin/UpdateName";
import UpdatePassword from "../../Components/Admin/UpdatePassword";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import AdminProfEdit from "../../Components/Admin/AdminProfileEdit";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";

export default function AdminProfile() {
  const [adminInfo, setAdminInfo] = useState();
  const [user, setUser] = useState({});

  const userProfile = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let [Edit, setEdit] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateAdminProf = async (id) => {
    setEdit(adminInfo[id]);
    handleOpen();
  };

  // const closeModal = () => setOpen(false);

  // const openModal = () => {
  //   setOpen(true);
  // };

  // const updateName = async () => {
  //   setEditName(adminInfo.name);
  //   openModal();
  // };

  // const updatePassword = async () => {
  //   setEditPassword(adminInfo.Password);
  //   openModal();
  // };

  const getAdminInfo = async () => {
    const data = await getDocs(userProfile);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const admin = profiles.filter((i) => i.Role == "Admin");
    setAdminInfo(admin);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get admin information
      getAdminInfo();
    } else {
      navigate("/SignIn");
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "40%",
            zIndex: "1000",
            height: "35px",
            width: "35px",
          }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "#fafafa" }}>
        <AdminHeader />

        <div style={{ minHeight: "100vh" }}>
          {adminInfo.map((item, key) => {
            return (
              <div
                style={{
                  marginTop: "15vh",
                }}
                key={key}
              >
                <div style={{ zIndex: 1, position: "relative" }}>
                  <img
                    style={{
                      borderRadius: "110px",
                      backgroundColor: "white",
                      boxShadow: "0 0 10px #ccc",
                    }}
                    width="160px"
                    height="160px"
                    src={img}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-90px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        width: 470,
                        boxShadow: "0 0 10px #ccc",
                      },
                    }}
                  >
                    <Paper
                      elevation={2}
                      style={{
                        paddingTop: "90px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRadius: "10px",
                        paddingBottom: "30px",
                        marginBottom: "30px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            alignContent: "center",
                            paddingLeft: "50px",
                            paddingRight: "70px",
                          }}
                        >
                          <h2>Name</h2>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => updateAdminProf(key)}
                          >
                            Edit
                          </Button>
                        </div>
                        <p style={{ marginBottom: "15px" }}>
                          {item?.FirstName + " " + item?.LastName}
                        </p>
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            alignContent: "center",
                            paddingLeft: "50px",
                            paddingRight: "70px",
                          }}
                        >
                          <h2>Password</h2>
                        </div>
                        <Typography style={{ marginBottom: "15px" }}>
                          {"*******"}
                        </Typography>
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            alignContent: "center",
                            paddingLeft: "50px",
                            paddingRight: "70px",
                          }}
                        >
                          <h2>Email</h2>
                        </div>
                        <Typography>{item?.Email}</Typography>
                      </div>
                    </Paper>
                  </Box>
                </div>
                <AdminProfEdit
                  id={Edit.id}
                  open={open}
                  name={Edit.FirstName}
                  email={Edit.Email}
                  setOpen={handleOpen}
                  close={handleClose}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
