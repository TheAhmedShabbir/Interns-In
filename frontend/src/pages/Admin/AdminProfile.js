import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AdminHeader from "../../Components/Admin/Adminheader";
import img from "../../assets/images/Userpfp.jpg";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function AdminProfile() {
  let [adminInfo, setAdminInfo] = useState();
  const userProfile = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

  const getAdminInfo = async () => {
    const data = await getDocs(userProfile);

    const profiles = data.docs.map((doc) => ({ ...doc.data() }));

    const admin = profiles.filter((i) => i.Role == "Admin");
    setAdminInfo(admin[0]);
    setLoading(false);
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

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
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <p style={{ marginBottom: "15px" }}>{adminInfo?.Role}</p>
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
                    {adminInfo?.Password}
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
                  <Typography>{adminInfo?.Email}</Typography>
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
