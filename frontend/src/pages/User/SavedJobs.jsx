import { Button, formLabelClasses, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../../Components/User/Userheader";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const jobCollection = collection(db, "Job");
  const userCollection = collection(db, "UserProfile");

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

  const deleteSaveJob = async (key, id) => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Role == "User");

    const deleteSavedJob = doc(db, "UserProfile", userProf[0].id);
    const sj = userProf[0].savedJob[key];
    await updateDoc(deleteSavedJob, {
      savedJob: arrayRemove(sj),
    });

    window.location.reload(false);
  };

  /////////pending
  const getSavedJobs = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    const sj = jobs.filter((j) => userData[0]?.savedJobs[1] == j.id);
    // console.log(sj);

    if (!userData[0].savedJobs) {
      setLoading(true);
    } else {
      setSavedJobs(userData[0].savedJobs);
      setLoading(false);
    }
    console.log(sj);
  };

  const applyJob = async (k, id) => {
    const data = await getDocs(jobCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const j = profiles.filter((i) => i.id == id);

    if (
      j[0].Applicants?.filter((a) => a == user.email) &&
      j[0].Applicants.length != 0
    ) {
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
    const d = await getDocs(jobCollection);
    const job = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setJobs(job);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getJobs();
        // Function Calls
        getSavedJobs();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <UserHeader />
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            flexDirection: "column",
            alignItems: "center",
            width: "900px",
            minHeight: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h1>Saved Jobs</h1>
          {jobs.map((job, key) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                key={key}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "white",
                    padding: "15px",
                    width: "700px",
                    borderRadius: "10px",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "15px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ padding: "10px" }}>
                      {job.postedby} added a new job for {job.Title}
                    </Typography>
                    <div>
                      {/* <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        View Details
                      </Button> */}
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={() => applyJob(key, job.id)}
                      >
                        Apply now
                      </Button>

                      <Button
                        style={{
                          margin: "10px",
                        }}
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => deleteSaveJob(key, job.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
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
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
