import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AdminHeader from "../../Components/Admin/Adminheader";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Employees() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const [jobs, setJobs] = useState([]);

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
  const jobCollection = collection(db, "Job");

  const getUserInfo = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    setUserInfo(userData[0]);

    setLoading(false);
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const job = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setJobs(job);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getUserInfo();
        getJobs();
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
          <h1 style={{ marginTop: "80px" }}>Jobs</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {jobs?.map((job, key) => {
              if (jobs?.length == 0) {
                <div></div>;
              } else {
                return (
                  <div
                    style={{
                      maxWidth: "700px",
                      minWidth: "700px",
                      backgroundColor: "white",
                      padding: "20px",
                      margin: "20px 0px 30px 0px",
                      borderRadius: "8px",
                      boxShadow: "0 0 10px #ccc",
                    }}
                    key={key}
                  >
                    <div
                      style={{
                        display: "flex",

                        marginTop: "10px",
                      }}
                    >
                      <Link
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontSize: "18px",
                          marginLeft: "20px",
                        }}
                        to={`/company/${job?.companyId}`}
                      >
                        {job.postedby}
                      </Link>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "-15px",
                      }}
                    >
                      <h4 style={{ marginLeft: "22px" }}>
                        {job.Title},{" "}
                        <span style={{ color: "green" }}>{job.Salary}pkr</span>
                      </h4>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LocationOnOutlinedIcon color="primary" />
                        <h4>{job.City}</h4>
                      </div>
                    </div>

                    <Typography
                      sx={{
                        display: "flex",
                        marginLeft: "20px",
                        fontSize: "small",
                      }}
                    >
                      {job.Description}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{
                        display: "flex",
                        marginLeft: "23px",
                        fontSize: "small",
                      }}
                    >
                      {job.Type + " Time"} {"— "}
                      {job.Mode}
                    </Typography>
                    <Button
                      style={{ margin: "10px" }}
                      variant="contained"
                      onClick={() => navigate(`/job/${job?.id}`)}
                    >
                      View Job
                    </Button>
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
