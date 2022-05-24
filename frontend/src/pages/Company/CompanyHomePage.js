import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import { Button, TextField, Typography } from "@mui/material";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormEdit from "../../Components/Company/FormEdit";
import ViewApplicants from "../../Components/Company/ViewApplicants";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CompanyHomePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [applicantOpen, setApplicantOpen] = useState(false);
  const [jobId, setJobId] = useState(0);
  let [editJob, setEditJob] = useState([]);
  let [appJob, setAppJob] = useState([]);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const jobCollection = collection(db, "Job");
  const UserCollection = collection(db, "UserProfile");

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeleteOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const openApplicantModal = async (id) => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == jobs[id].Applicants);

    setAppJob(userData);
    setJobId(jobs[id].id);

    if (jobs[id].Applicants.length == 0) {
      setApplicantOpen(false);
    } else setApplicantOpen(true);
  };

  const closeApplicantModal = () => {
    setApplicantOpen(false);
  };

  const updateJob = async (id) => {
    setEditJob(jobs[id]);
    openModal();
  };

  const deleteJob = async (id) => {
    const jobDoc = doc(db, "Job", jobs[id].id);
    await deleteDoc(jobDoc);
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const job = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const jobFilter = job.filter((i) => i.company == user?.email);

    setJobs(jobFilter);

    setLoading(false);
  };
  //////////pending
  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    const d = await getDocs(UserCollection);
    const job = data.docs.map((doc) => ({ ...doc.data() }));
    // const jobFilter = job.filter((i) => i.company == user?.email);

    setUserInfo(userData[0]);
    // console.log(userData);

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // get user info
        getUserInfo();

        // Function Calls
        getJobs();
      }
    });
  }, [user, open, jobs]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <CompanyHeader />
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
                  src={img}
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
                <h3>{UserInfo?.CompanyName}</h3>
                <Typography>{UserInfo?.Headline}</Typography>
              </div>
            </div>
            <h3>Pending Interviews</h3>
            {jobs.map((j, k) => {
              if (j.Applicants[k] == undefined) {
                <div></div>;
              } else
                return (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      margin: "5px",
                    }}
                    key={k}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "15px",
                        margin: "5px",
                        width: "200px",
                        borderRadius: "8px",
                      }}
                    >
                      <div style={{ padding: "10px" }}>
                        <h4></h4>
                        <Button size="small" variant="outlined">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                flexWrap: "wrap",
                alignContent: "flex-start",
                padding: "20px",
                margin: "10px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  border: "2px solid blue",
                  margin: "10px",
                  width: "200px",
                }}
              >
                <h2>Post a Job</h2>
                <Button href="/postjob" size="small" variant="contained">
                  Add
                </Button>
              </div>
              <div
                style={{
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  border: "2px solid blue",
                  margin: "10px",
                  width: "200px",
                  height: "100px",
                }}
              >
                <h2>Jobs Posted</h2>
                <Typography>{jobs.length}</Typography>
              </div>
              <div
                style={{
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  border: "2px solid blue",
                  margin: "10px",
                  width: "200px",
                  height: "100px",
                }}
              >
                <h2 style={{ margin: "10px" }}>Pending Interviews</h2>
                <Typography style={{ marginTop: "5px" }}>1</Typography>
              </div>
              <div
                style={{
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  border: "2px solid blue",
                  margin: "10px",
                  width: "200px",
                  height: "100px",
                }}
              >
                <h2>Employees</h2>
                <Typography>125</Typography>
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
                    <div>
                      <h2 style={{ color: "green" }}> {job.Salary} pkr</h2>
                      <Button
                        style={{ margin: "10px" }}
                        variant="outlined"
                        onClick={() => openApplicantModal(key)}
                      >
                        View Applicants
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        variant="outlined"
                        color="warning"
                        onClick={() => updateJob(key)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{
                          margin: "10px",
                        }}
                        variant="outlined"
                        color="error"
                        onClick={() => deleteJob(key).then(handleDeleteClick())}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FormEdit
            id={editJob.id}
            key={editJob.id}
            open={open}
            close={closeModal}
            title={editJob.Title}
            description={editJob.Description}
            city={editJob.City}
            salary={editJob.Salary}
            type={editJob.Type}
            mode={editJob.Mode}
          />
          <ViewApplicants
            open={applicantOpen}
            close={closeApplicantModal}
            applicant={appJob}
            id={jobId}
            key={"apps123" + jobId}
          />

          <Snackbar
            open={deleteOpen}
            autoHideDuration={2000}
            onClose={handleDeleteClose}
          >
            <Alert
              onClose={handleDeleteClose}
              sx={{ width: "100%" }}
              severity="error"
            >
              Job Deleted!
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}
