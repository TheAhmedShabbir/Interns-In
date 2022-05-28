import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import SavedJobs from "./SavedJobs";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserHomepage() {
  const navigate = useNavigate();

  const [searchJob, setSearchJob] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobsShown, setJobsShown] = useState([]);
  const [user, setUser] = useState(null);
  const [UserInfo, setUserInfo] = useState([]);

  const [loading, setLoading] = useState(true);

  const jobCollection = collection(db, "Job");
  const UserCollection = collection(db, "UserProfile");

  // apply now snackbars
  const [warningOpen, setWarningOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [saveOpen, setSaveOpen] = useState(false);
  const [alreadySaveOpen, setAlreadySaveOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  const handleSearchResult = () => {
    setSearchResult(true);
  };

  const handleSearchResultClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSearchResult(false);
  };

  const handleSaveClick = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSaveOpen(false);
  };

  const handleAlreadySaveClick = () => {
    setAlreadySaveOpen(true);
  };

  const handleAlreadySaveClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlreadySaveOpen(false);
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
    const userData = profiles.filter((u) => u.Email == user?.email);

    const saveJobRef = collection(db, `UserProfile/${userData[0].id}/savejobs`);
    const d = await getDocs(saveJobRef);
    const saveJobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const jobDetails = jobs?.filter((j) => j.id == id);

    if (saveJobs[0]?.jobid == id) {
      handleAlreadySaveClick();
    } else {
      await addDoc(collection(db, `UserProfile/${userData[0].id}/savejobs`), {
        title: jobDetails[0].Title,
        city: jobDetails[0].City,
        description: jobDetails[0].Description,
        mode: jobDetails[0].Mode,
        salary: jobDetails[0].Salary,
        type: jobDetails[0].Type,
        company: jobDetails[0].company,
        postedby: jobDetails[0].postedby,
        jobid: id,
      });

      handleSaveClick();
    }
  };

  const applyJob = async (id) => {
    const d = await getDocs(UserCollection);
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
    console.log(applicants);

    const jobDetails = jobs?.filter((j) => j.id == id);

    if (applicantFilter[0]?.applicantEmail == user?.email) {
      handleWarningClick();
    } else {
      const a = await addDoc(collection(db, `Job/${id}/applicants`), {
        applicantEmail: user?.email,
        firstname: userData[0]?.FirstName,
        lastname: userData[0]?.LastName,
        pfp: userData[0]?.Pfp,
        resume: userData[0]?.cv,
        bio: userData[0]?.Main,
        address: userData[0]?.Address,
        about: userData[0]?.About,
        city: userData[0]?.City,
        province: userData[0]?.Province,
        applicantid: applicantFilter[0]?.id,
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

    // console.log();

    // if (
    //   j[0].Applicants?.filter((a) => a == user.email) &&
    //   j[0].Applicants.length != 0
    // ) {
    //   handleWarningClick();
    // } else {
    //   const jobApply = doc(db, "Job", id);
    //   const nf = { Applicants: jobs[k].Applicants.concat(user.email) };
    //   console.log(nf);

    //   updateDoc(jobApply, nf);
    //   handleSuccessClick();
    // }
  };

  const search = async () => {
    if (searchJob !== "") {
      const results = jobs.filter((job) => {
        return job?.Title?.toLowerCase().startsWith(searchJob);
        // Use the toLowerCase() method to make it case-insensitive
      });

      setJobsShown(results);

      if (results.length == 0) {
        handleSearchResult();
      }
    } else {
      setJobsShown(jobs);

      // If the text field is empty, show all jobs
    }
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const x = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setJobs(x);
    setJobsShown(x);
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
              {UserInfo?.Pfp ? (
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "110px",
                      marginTop: "-75px",
                      backgroundColor: "white",
                    }}
                    width="150px"
                    height="150px"
                    src={UserInfo?.Pfp}
                  />
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "110px",
                      marginTop: "-75px",
                      backgroundColor: "white",
                      border: "blue 2px solid",
                    }}
                    width="150px"
                    height="150px"
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3>{UserInfo?.FirstName + " " + UserInfo?.LastName}</h3>
                <Typography>{UserInfo?.Main}</Typography>
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
          <div style={{ padding: "10px", width: "950px" }}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="search"
                  value={searchJob}
                  onChange={(e) => {
                    setSearchJob(e.target.value);
                  }}
                  className="input"
                  placeholder="Search Jobs"
                  style={{
                    width: "650px",
                    height: "50px",
                  }}
                />
                <Button
                  style={{
                    marginLeft: "15px",
                    height: "40px",
                  }}
                  size="small"
                  variant="outlined"
                  onClick={() => search()}
                >
                  Search
                </Button>
              </div>
            </div>
            <div>
              <h2>Posts</h2>
              {jobsShown.map((job, key) => {
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
                      onClick={() => applyJob(job.id)}
                    >
                      Apply now
                    </Button>
                    <Button
                      style={{
                        margin: "10px",
                      }}
                      variant="outlined"
                      onClick={() => saveJob(job.id)}
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
              open={searchResult}
              autoHideDuration={2000}
              onClose={handleSearchResultClose}
            >
              <Alert
                onClose={handleSearchResultClose}
                sx={{ width: "100%" }}
                severity="warning"
              >
                No jobs Found
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

            <Snackbar
              open={alreadySaveOpen}
              autoHideDuration={2000}
              onClose={handleAlreadySaveClose}
            >
              <Alert
                onClose={handleAlreadySaveClose}
                sx={{ width: "100%" }}
                severity="warning"
              >
                Job is already saved
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    );
  }
}
