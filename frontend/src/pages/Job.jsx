import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import UserHeader from "../Components/User/Userheader";
import { db, auth } from "../firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CompanyHeader from "../Components/Company/CompanyHeader";
import AdminHeader from "../Components/Admin/Adminheader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #548CCB",
  boxShadow: 24,
  p: 4,
};

export default function Job() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const url = window.location.pathname.split("/");

  const userCollection = collection(db, "UserProfile");
  const jobCollection = collection(db, "Job");

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const j = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const jobFilter = j.filter((i) => i.id == url[2]);

    setJobs(jobFilter);
    setLoading(false);
  };

  const getUser = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userProf[0]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Function Calls
        getUser();
        getJobs();
      } else {
        navigate("/SignIn");
      }
    });
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
        {userInfo?.Role == "User" && (
          <div>
            <UserHeader />
          </div>
        )}
        {userInfo?.Role == "Company" && (
          <div>
            <CompanyHeader />
          </div>
        )}
        {userInfo?.Role == "Admin" && (
          <div>
            <AdminHeader />
          </div>
        )}

        <div
          style={{
            minHeight: "100vh",
            paddingTop: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {jobs.map((job, key) => {
              if (jobs?.length == 0) {
                <div>
                  <h1>No jobs posted</h1>
                </div>;
              }
              return (
                <div
                  style={{
                    minWidth: "800px",
                    maxWidth: "800px",
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px #ccc",
                  }}
                  key={key}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ marginLeft: "20px" }}>
                      {job.Title},{" "}
                      <span style={{ color: "green" }}>{job.Salary}pkr</span>
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "30px",
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
                      padding: "20px",
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
                    {job.Type} {"— "}
                    {job.Mode}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
