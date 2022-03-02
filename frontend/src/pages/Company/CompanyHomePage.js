import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import { Button, TextField, Typography } from "@mui/material";
import img from "../../assets/images/Userpfp.jpg";
import { db } from "../../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CompanyHomePage() {
  const [jobs, setJobs] = useState([]);
  const jobCollection = collection(db, "Job");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const updateJob = async (id) => {
    const data = await getDocs(jobCollection);
    console.log(data.docs.map((doc) => doc.id));
    setOpen(true);
  };

  useEffect(() => {
    // get jobs
    const getJobs = async () => {
      const data = await getDocs(jobCollection);
      setJobs(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getJobs();
  }, []);

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
              <h3>Company XYZ</h3>
              <Typography>We are Hiring!</Typography>
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
            <h2>Jobs Posted</h2>
            <div style={{ padding: "10px" }}>
              <h3>Software Engineer</h3>
              <Button size="small" variant="outlined">
                View Applicants
              </Button>
            </div>
            <div style={{ padding: "10px", marginBottom: "20px" }}>
              <h3>SQA Engineer</h3>
              <Button size="small" variant="outlined">
                View Applicants
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
            <h3>Pending Interviews</h3>
            <div style={{ padding: "10px" }}>
              <h4>Ahmed Shabbir</h4>
              <Button size="small" variant="outlined">
                View Profile
              </Button>
            </div>
            <div style={{ padding: "10px" }}>
              <h3>Abdullah Shahzad</h3>
              <Button size="small" variant="outlined">
                View Profile
              </Button>
            </div>
            <div style={{ padding: "10px", marginBottom: "20px" }}>
              <h3>Muaaz Shabbir</h3>
              <Button size="small" variant="outlined">
                View Profile
              </Button>
            </div>
            <Button size="small" variant="contained">
              View all
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
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
              }}
            >
              <h2>Jobs Posted</h2>
              <Typography>125</Typography>
            </div>
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
              <h2>Pending Interviews</h2>
              <Typography>125</Typography>
            </div>
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
                      onClick={() => updateJob()}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        margin: "10px",
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  borderRadius: "8px",
                  boxShadow: 0,
                  p: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "600px",
                    height: "600px",
                  }}
                >
                  <TextField style={{ margin: "10px" }} label="Job Title" />
                  <TextField
                    style={{ margin: "10px" }}
                    label="Job Description"
                  />
                  <h3>Job Type</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <FormGroup
                        sx={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Full Time"
                          value="Full Time"
                        />
                        <FormControlLabel
                          sx={{ marginLeft: "80px" }}
                          control={<Checkbox />}
                          label="Part Time"
                          value="Part Time"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <h3>Mode</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <FormGroup
                        sx={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Remote"
                          value="Remote"
                        />
                        <FormControlLabel
                          sx={{ marginLeft: "80px" }}
                          control={<Checkbox />}
                          label="On-site"
                          value="On-site"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <h4>Set Salary</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextField type="number" label="Salary" />
                  </div>

                  <h4>Set Location and Deadline</h4>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
