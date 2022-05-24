import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserHomepage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [UserInfo, setUserInfo] = useState([]);

  const [loading, setLoading] = useState(true);

  const jobCollection = collection(db, "Job");
  const UserCollection = collection(db, "UserProfile");

  //apply now snackbars
  const [warningOpen, setWarningOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [saveOpen, setSaveOpen] = useState(false);

  const handleSaveClick = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSaveOpen(false);
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

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const saveJob = async (id) => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Role == "User");
    const i = userProf[0].id;

    const jobSave = doc(db, "UserProfile", i);

    const nf = { savedJob: userProf[0].savedJob.concat(user?.email) };
    updateDoc(jobSave, nf);
  };

  const applyJob = async (k, id) => {
    const data = await getDocs(jobCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const j = profiles.filter((i) => i.id == id);

    if (
      j[0].Applicants?.filter((a) => a == user.email) &&
      j[0].Applicants.length != 0
    ) {
      console.log("user already exists");
      handleWarningClick();
    } else {
      const jobApply = doc(db, "Job", id);
      const nf = { Applicants: jobs[k].Applicants.concat(user.email) };
      console.log(nf);

      updateDoc(jobApply, nf);
      handleSuccessClick();
    }
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

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

      if (user) {
        // get user info
        getUserInfo();

        // get jobs
        getJobs();
      }
    });
  }, [user, jobs]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <UserHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                width: "200px",
                marginTop: "40px",
                borderRadius: "8px",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <img
                  style={{ borderRadius: "110px", marginTop: "-75px" }}
                  width="150px"
                  height="150px"
                  src={UserInfo.Pfp}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3>{UserInfo?.FirstName + " " + UserInfo?.LastName}</h3>
                <Typography>{UserInfo?.MainField}</Typography>
              </div>
            </div>
            <div
              style={{
                padding: "15px",
                margin: "5px",
                backgroundColor: "#fff",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <h2>Top companies</h2>
              <div style={{ padding: "10px" }}>
                <h3>Systems Limited</h3>
                <Button size="small" variant="outlined">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
          <div style={{ padding: "15px", width: "950px" }}>
            <div
              style={{
                padding: "25px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <TextField fullWidth label="search jobs" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox />} label="Full Time" />
                <FormControlLabel control={<Checkbox />} label="Part Time" />
                <FormControlLabel control={<Checkbox />} label="Internship" />
                <Button size="small" variant="outlined">
                  Search
                </Button>
              </div>
            </div>
            <div>
              <h2>Posts</h2>
              {jobs.map((job, key) => {
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      margin: "50px",
                      borderRadius: "8px",
                    }}
                    key={key}
                  >
                    <h2>
                      {job.Title}, {job.Type}, {job.Mode}, {job.City}
                    </h2>
                    <Typography>{job.Description}</Typography>
                    <h2 style={{ color: "green" }}> {job.Salary} pkr</h2>
                    <Button
                      style={{ margin: "10px" }}
                      variant="contained"
                      onClick={() => applyJob(key, job.id)}
                    >
                      Apply now
                    </Button>
                    <Button
                      style={{
                        margin: "10px",
                      }}
                      variant="outlined"
                      onClick={() => saveJob(job.id).then(handleSaveClick())}
                      color="success"
                    >
                      Save
                    </Button>
                  </div>
                );
              })}
            </div>
            <Snackbar
              open={warningOpen}
              autoHideDuration={2000}
              onClose={handleWarningClose}
            >
              <Alert
                onClose={handleWarningClose}
                sx={{ width: "100%" }}
                severity="warning"
              >
                You have already applied to this Job
              </Alert>
            </Snackbar>

            <Snackbar
              open={successOpen}
              autoHideDuration={2000}
              onClose={handleSuccessClose}
            >
              <Alert
                onClose={handleSuccessClose}
                sx={{ width: "100%" }}
                severity="success"
              >
                Applied Successfully!
              </Alert>
            </Snackbar>

            <Snackbar
              open={saveOpen}
              autoHideDuration={2000}
              onClose={handleSaveClose}
            >
              <Alert
                onClose={handleSaveClose}
                sx={{ width: "100%" }}
                severity="success"
              >
                Job Saved
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    );
  }
}
