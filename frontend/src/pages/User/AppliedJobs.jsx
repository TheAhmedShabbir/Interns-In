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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CircularProgress from "@mui/material/CircularProgress";

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
        <UserHeader />
        <div
          style={{
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
            width: "900px",
            minHeight: "100vh",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h1 style={{ marginBottom: "50px", marginTop: "100px" }}>
            Applied Jobs
          </h1>
          {jobsApplied.map((job, key) => {
            return (
              <div
                style={{
                  maxWidth: "650px",
                  minWidth: "650px",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px #ccc",
                  margin: "15px",
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
                    {job.title},{" "}
                    <span style={{ color: "green" }}>{job.salary}pkr</span>
                  </h2>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LocationOnOutlinedIcon color="primary" />
                    <h4>{job.city}</h4>
                  </div>
                </div>
                <Typography
                  sx={{
                    display: "flex",
                    marginLeft: "20px",
                    fontSize: "small",
                  }}
                >
                  {job.description}
                </Typography>
                <br></br>
                <Typography
                  sx={{
                    display: "flex",
                    marginLeft: "23px",
                    fontSize: "small",
                  }}
                >
                  {job.type + " Time"} {"— "}
                  {job.mode}
                </Typography>
                <Button style={{ margin: "10px" }} variant="outlined">
                  View Details
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
            No Applied Jobs!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
