import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);

  const UserCollection = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));

    const userData = profiles.filter((i) => i.Email == user?.email);

    setUserInfo(userData[0]);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get company information
      getUserInfo();
    } else {
      navigate("/CompanySignIn");
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <CompanyHeader />
        <div
          style={{
            marginTop: "40px",
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
                  height: 600,
                },
              }}
            >
              <Paper
                elevation={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "20px",
                  marginBottom: "30px",
                  paddingTop: "30px",
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
                    <h2>Company Name</h2>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography style={{ marginBottom: "15px" }}>
                    {UserInfo?.CompanyName}
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
                    <h2>Password</h2>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography style={{ marginBottom: "15px" }}>
                    {UserInfo?.Password}
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
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography> {user?.email}</Typography>
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
                    <h2>Location</h2>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography style={{ marginBottom: "15px" }}>
                    {UserInfo?.Location}
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
                    <h2>About </h2>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography> {UserInfo?.About}</Typography>
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
