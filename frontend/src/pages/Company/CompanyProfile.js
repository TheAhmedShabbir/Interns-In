import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function CompanyProfile() {
  const [companyInfo, setCompanyInfo] = useState([]);
  const recruiterCollection = collection(db, "CompanyProfile");

  useEffect(() => {
    // get company information
    const getCompanyInfo = async () => {
      const data = await getDocs(recruiterCollection);
      setCompanyInfo(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getCompanyInfo();
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <CompanyHeader />
      {companyInfo.map((companyinfo) => {
        return (
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
                    height: 700,
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
                      <h2>Company Name</h2>
                      <Button size="small" variant="outlined">
                        Edit
                      </Button>
                    </div>
                    <Typography style={{ marginBottom: "15px" }}>
                      {companyinfo.CompanyName}
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
                      {companyinfo.Password}
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
                    <Typography>{companyinfo.Email}</Typography>
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
                      {companyinfo.Location}
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
                    <Typography style={{ margin: "15px" }}>
                      <div
                        style={{
                          textAlign: "justify",
                          marginLeft: "40px",
                          marginRight: "40px",
                          marginBottom: "40px",
                        }}
                      >
                        <p>{companyinfo.About}</p>
                      </div>
                    </Typography>
                  </div>
                </Paper>
              </Box>
            </div>
          </div>
        );
      })}
    </div>
  );
}
