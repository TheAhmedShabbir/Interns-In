import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../../Components/User/Userheader";
import { db, auth } from "../../firebase-config";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
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
  const [cvOpen, setCvOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleCvClick = () => {
    setCvOpen(true);
  };

  const handleCvClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCvOpen(false);
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

  const deleteSaveJob = async (id) => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((u) => u.Email == user?.email);

    const savedJobCollection = collection(
      db,
      `UserProfile/${userData[0].id}/savejobs`
    );
    const d = await getDocs(savedJobCollection);
    const savedjobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const deleteJob = savedjobs.filter((u) => u.jobid == id);
    // console.log(deleteJob);

    const dj = deleteDoc(
      doc(db, `UserProfile/${userData[0]?.id}/savejobs`, deleteJob[0].id)
    );

    getSavedJobs();
  };

  const getSavedJobs = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    const saveJobRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/savejobs`
    );
    const d = await getDocs(saveJobRef);
    const savejobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (!savejobs) {
      setLoading(true);
    } else {
      setSavedJobs(savejobs);
      setLoading(false);
    }
  };

  const applyJob = async (id) => {
    const d = await getDocs(userCollection);
    const profiles = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((u) => u.Email == user?.email);

    const applicantsReference = collection(db, `Job/${id}/applicants`);
    const applicantsData = await getDocs(applicantsReference);
    const applicants = applicantsData.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const applicantFilter = applicants.filter(
      (j) => j.applicantEmail == user?.email
    );
    console.log(userData);

    const jobDetails = jobs?.filter((j) => j.id == id);

    if (applicantFilter[0]?.applicantEmail == user?.email) {
      handleWarningClick();
    } else if (userData[0].cv == "") {
      handleCvClick();
    } else {
      const a = await addDoc(collection(db, `Job/${id}/applicants`), {
        applicantEmail: user?.email,
        firstname: userData[0]?.FirstName,
        lastname: userData[0]?.LastName,
        pfp: userData[0]?.Pfp,
        resume: userData[0]?.cv,
        bio: userData[0]?.bio,
        address: userData[0]?.address,
        about: userData[0]?.about,
        city: userData[0]?.city,
        province: userData[0]?.province,
        applicantid: userData[0]?.id,
      });

      await addDoc(
        collection(db, `UserProfile/${userData[0]?.id}/appliedJobs`),
        {
          title: jobDetails[0].Title,
          city: jobDetails[0].City,
          description: jobDetails[0].Description,
          mode: jobDetails[0].Mode,
          salary: jobDetails[0].Salary,
          type: jobDetails[0].Type,
          company: jobDetails[0].company,
          postedby: jobDetails[0].postedby,
          jobid: id,
        }
      );

      handleSuccessClick();
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Function Calls
        getSavedJobs();
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
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "15px",
            minHeight: "100vh",
          }}
        >
          <h1 style={{ marginBottom: "50px", marginTop: "100px" }}>
            Saved Jobs
          </h1>
          {savedJobs.map((job, key) => {
            return (
              // <div
              //   style={{
              //     backgroundColor: "white",
              //     padding: "20px",
              //     margin: "20px",
              //     borderRadius: "8px",
              //     width: "700px",
              //     boxShadow: "0 0 10px #ccc",
              //   }}
              //   key={key}
              // >
              //   <h2>
              //     {job.title}, {job.type}, {job.mode}, {job.city}
              //   </h2>
              //   <Typography>{job.Description}</Typography>
              //   <h2 style={{ color: "green" }}> {job.salary} pkr</h2>
              //   <Button
              //     style={{ margin: "10px" }}
              //     variant="contained"
              //     onClick={() => applyJob(key, job.id)}
              //   >
              //     Apply now
              //   </Button>
              //   <Button
              //     style={{
              //       margin: "10px",
              //     }}
              //     variant="outlined"
              //     onClick={() => deleteSaveJob(job.jobid)}
              //     color="error"
              //   >
              //     Delete
              //   </Button>
              // </div>
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
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  onClick={() => applyJob(job.id)}
                >
                  Apply now
                </Button>
                <Button
                  style={{
                    margin: "10px",
                  }}
                  onClick={() => deleteSaveJob(job.jobid)}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </div>
            );
          })}
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

        <Snackbar open={cvOpen} autoHideDuration={2000} onClose={handleCvClose}>
          <Alert
            onClose={handleCvClose}
            sx={{ width: "100%" }}
            severity="warning"
          >
            Please upload your Resume first.
          </Alert>
        </Snackbar>

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
      </div>
    );
  }
}
