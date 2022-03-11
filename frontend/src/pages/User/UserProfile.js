import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const UserCollection = collection(db, "UserProfile");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("token", user.accessToken);
  });

  useEffect(() => {
    // get User information
    const getUserInfo = async () => {
      const data = await getDocs(UserCollection);
      setUserInfo(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getUserInfo();
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <UserHeader />
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
              },
            }}
          >
            <Paper
              elevation={2}
              style={{
                paddingTop: "130px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "20px",
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
                  <h2>Username</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ marginBottom: "15px" }}>
                  {/* {userinfo.Username} */}
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
                  {/* {userinfo.Password} */}
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
                <Typography>{user?.email}</Typography>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
}
