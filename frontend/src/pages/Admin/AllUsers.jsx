import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AdminHeader from "../../Components/Admin/Adminheader";
import img from "../../assets/images/Userpfp.jpg";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AllUsers() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [warningOpen, setWarningOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleWarningClick = () => {
    setWarningOpen(true);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  const userCollection = collection(db, "UserProfile");

  const getUsers = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const x = profiles.filter((i) => i.Role == "User");

    setUserData(x);

    setLoading(false);
  };

  const getUserInfo = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    setUserInfo(userData[0]);

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getUserInfo();
        getUsers();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user, userInfo?.id]);

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
      <div
        style={{
          backgroundColor: "#fafafa",
          fontFamily: "ubuntu, arial,sans-serif",
        }}
      >
        <AdminHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "900px",
            maxWidth: "1400px",
            minHeight: "100vh",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h1 style={{ marginTop: "80px" }}>Users</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {userData?.map((u, key) => {
              if (userData?.length == 0) {
                <div></div>;
              } else {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "10px",
                      flexWrap: "wrap",
                    }}
                    key={key}
                  >
                    <div style={{ margin: "10px" }}>
                      <div
                        style={{
                          zIndex: 1,
                          position: "relative",
                        }}
                      >
                        {u?.Pfp ? (
                          <img
                            style={{
                              borderRadius: "110px",
                              boxShadow: "0 0 10px #ccc",
                            }}
                            width="140px"
                            height="140px"
                            src={u?.Pfp}
                          />
                        ) : (
                          <img
                            style={{
                              borderRadius: "110px",
                              boxShadow: "0 0 10px #ccc",
                            }}
                            width="140px"
                            height="140px"
                            src={img}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "-80px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                              m: 1,
                              width: 300,
                              minHeight: "30vh",
                            },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "8px",
                              backgroundColor: "#fff",
                              boxShadow: "0 0 10px #ccc",
                            }}
                          >
                            <div style={{ marginTop: "80px", padding: "10px" }}>
                              <h3>
                                <b>{u?.FirstName + " " + u?.LastName}</b>
                              </h3>
                              <p>{u?.bio}</p>
                              <Button
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
                                size="small"
                                variant="outlined"
                                onClick={() => navigate(`/user/${u?.id}`)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
