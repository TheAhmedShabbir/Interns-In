import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../../Components/User/Userheader";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
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
  const [jobsApplied, setJobsApplied] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userCollection = collection(db, "UserProfile");

  const [warningOpen, setWarningOpen] = useState(false);

  const handleWarningClick = () => {
    setWarningOpen(true);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  //   const deleteSaveJob = async (id) => {
  //     const data = await getDocs(userCollection);
  //     const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const userData = profiles.filter((u) => u.Email == user?.email);

  //     const savedJobCollection = collection(
  //       db,
  //       `UserProfile/${userData[0].id}/savejobs`
  //     );
  //     const d = await getDocs(savedJobCollection);
  //     const savedjobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const deleteJob = savedjobs.filter((u) => u.jobid == id);
  //     // console.log(deleteJob);

  //     const dj = deleteDoc(
  //       doc(db, `UserProfile/${userData[0]?.id}/savejobs`, deleteJob[0].id)
  //     );

  //     getSavedJobs();
  //   };

  const getAppliedJobs = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((u) => u.Email == user?.email);

    const appliedJobRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/appliedJobs`
    );
    const d = await getDocs(appliedJobRef);
    const appliedJobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (!appliedJobs) {
      setLoading(true);
    } else {
      setJobsApplied(appliedJobs);
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Function Calls
        getAppliedJobs();
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
          <h1 style={{ marginBottom: "30px" }}>Applied Jobs</h1>
          {jobsApplied.map((job, key) => {
            return (
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  margin: "20px",
                  borderRadius: "8px",
                  width: "700px",
                }}
                key={key}
              >
                <h2>
                  {job.title}, {job.type}, {job.mode}, {job.city}
                </h2>
                <Typography>{job.Description}</Typography>
                <h2 style={{ color: "green" }}> {job.salary} pkr</h2>
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
            No Applied Jobs!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
