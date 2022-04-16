import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function UserHomepage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const jobCollection = collection(db, "Job");
  const userProfile = collection(db, "UserProfile");

  const saveJob = async (id) => {
    const data = await getDocs(userProfile);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Role == "User");
    const i = userProf[0].id;

    const job = jobs.filter((i) => i.id == id);
    const jobSave = doc(db, "UserProfile", i);

    const nf = { savedJob: userProf[0].savedJob.concat(job) };
    updateDoc(jobSave, nf);
  };

  const applyJob = async (k, id) => {
    const data = await getDocs(userProfile);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const users = profiles.filter((i) => i.Email == user?.email);

    const jobApply = doc(db, "Job", id);
    const nf = { Applicants: jobs[k].Applicants.concat(users) };
    console.log(nf);
    updateDoc(jobApply, nf);
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // get jobs
        getJobs();
      }
    });
    // getData();
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
                <h3>Ahmed Shabbir</h3>
                <Typography>Student</Typography>
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
                  Follow
                </Button>
              </div>
              <div style={{ padding: "10px", marginBottom: "20px" }}>
                <h3>Netsol</h3>
                <Button size="small" variant="outlined">
                  Follow
                </Button>
              </div>
              <Button size="small" variant="contained">
                View all
              </Button>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                margin: "5px",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <h3>People You may know</h3>
              <div style={{ padding: "10px" }}>
                <h4>ABC Company</h4>
                <Button size="small" variant="outlined">
                  View Profile
                </Button>
              </div>
              <div style={{ padding: "10px" }}>
                <h3>ABC Company</h3>
                <Button size="small" variant="outlined">
                  View Profile
                </Button>
              </div>
              <div style={{ padding: "10px", marginBottom: "20px" }}>
                <h3>ABC Company</h3>
                <Button size="small" variant="outlined">
                  View Profile
                </Button>
              </div>
              <Button size="small" variant="contained">
                View all
              </Button>
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
                      onClick={() => saveJob(job.id)}
                    >
                      Save
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
