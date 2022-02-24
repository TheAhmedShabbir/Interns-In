import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db } from "../../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";

export default function UserHomepage() {
  const [jobs, setJobs] = useState([]);
  const jobCollection = collection(db, "Job");

  useEffect(() => {
    // get jobs
    const getJobs = async () => {
      const data = await getDocs(jobCollection);
      setJobs(data.docs.map((doc) => ({ ...doc.data() })));
      console.log(jobs);
    };

    // Function Calls
    getJobs();
  }, []);

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
            {jobs.map((job) => {
              return (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "50px",
                    borderRadius: "8px",
                  }}
                >
                  <h2>
                    {job.Title}, {job.Type}, {job.Mode}, {job.City}
                  </h2>
                  <Typography>{job.Description}</Typography>
                  <h2 style={{ color: "green" }}> {job.Salary} pkr</h2>
                  <Button style={{ margin: "10px" }} variant="outlined">
                    Apply now
                  </Button>
                  <Button
                    style={{
                      margin: "10px",
                    }}
                    variant="outlined"
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

// style={{
//   padding: "15px",
//   backgroundColor: "#fff",
//   borderRadius: "10px",
//   marginTop: "10px",
//   width: "920px",
// }}
