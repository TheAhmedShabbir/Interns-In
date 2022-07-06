import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AdminHeader from "../../Components/Admin/Adminheader";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Employees() {
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState([]);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);
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

  const getCompanies = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const x = profiles.filter((i) => i.Role == "Company");

    setCompanyData(x);
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
        getCompanies();
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
          <h1 style={{ marginTop: "80px" }}>Companies</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {companyData?.map((c, key) => {
              if (companyData?.length == 0) {
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
                        <img
                          style={{
                            borderRadius: "110px",
                            boxShadow: "0 0 10px #ccc",
                          }}
                          width="140px"
                          height="140px"
                          src={c?.Pfp}
                        />
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
                              minHeight: "40vh",
                              maxHeight: "40vh",
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
                                <b>{c?.CompanyName}</b>
                              </h3>
                              <p>{c?.bio}</p>
                              <Button
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
                                size="small"
                                variant="outlined"
                                onClick={() => navigate(`/company/${c?.id}`)}
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
