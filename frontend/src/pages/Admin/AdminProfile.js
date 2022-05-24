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

export default function AdminProfile() {
  let [adminInfo, setAdminInfo] = useState();
  const [user, setUser] = useState({});
  let [editName, setEditName] = useState();
  let [editPassword, setEditPassword] = useState();
  const [open, setOpen] = useState(false);
  const userProfile = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

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

    setAdminInfo(admin[0]);
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
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <AdminHeader />
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div style={{ zIndex: 1, position: "relative" }}>
            <img
              style={{ borderRadius: "110px" }}
              width="200px"
              height="200px"
              src={img}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
              marginTop: "-110px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 550,
                  height: 300,
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
                      // onClick={() => updateName()}
                    >
                      Edit
                    </Button>
                  </div>
                  <p style={{ marginBottom: "15px" }}>
                    {adminInfo?.FirstName + " " + adminInfo?.LastName}
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
                    <Button
                      size="small"
                      variant="outlined"
                      // onClick={() => updatePassword()}
                    >
                      Edit
                    </Button>
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
                  <Typography>{adminInfo?.Email}</Typography>
                </div>
              </Paper>
            </Box>
          </div>
          {/* <UpdateName
            id={adminInfo.id}
            open={open}
            setOpen={setOpen}
            close={closeModal}
            name={editName}
          />
          <UpdatePassword
            id={adminInfo.id}
            open={open}
            setOpen={setOpen}
            close={closeModal}
            password={editPassword}
          /> */}
        </div>
      </div>
    );
  }
}
