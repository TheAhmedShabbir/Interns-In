import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Userpfp from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [mode, setMode] = useState("");
  const [salary, setSalary] = useState(0);
  const [city, setCity] = useState("");
  const jobCollection = collection(db, "Job");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (!user) {
      setLoading(false);
      navigate("/CompanySignIn");
    }
  }, [user]);

  const createPost = async () => {
    await addDoc(jobCollection, {
      Title: jobTitle,
      Description: jobDescription,
      Type: jobType,
      Mode: mode,
      Salary: salary,
      City: city,
    });
  };
  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <CompanyHeader />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "700px",
              backgroundColor: "white",
              borderRadius: "10px",
              height: "750px",
              margin: "50px",
            }}
          >
            <h2 style={{ padding: "10px", margin: "20px" }}>Add A New Post</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "600px",
                height: "600px",
              }}
            >
              <TextField
                id="name"
                required
                style={{ margin: "10px" }}
                fullWidth
                label="Job Title"
                // onChange={(event) => {
                //   if (event.target.value == "") {
                //     const name = document.getElementById("name");
                //     name.style.border = "red";
                //   } else setJobTitle(event.target.value);
                // }}
                onClick={(event) => {
                  if (event.target.value == "") {
                    const name = document.getElementById("name");
                    name.style.border = "red";
                    console.log(event.target.value);
                  }
                }}
              />
              <TextField
                required
                style={{ margin: "10px" }}
                fullWidth
                label="Job Description"
                onChange={(event) => {
                  setJobDescription(event.target.value);
                }}
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
                      onChange={(event) => {
                        setJobType(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Checkbox />}
                      label="Part Time"
                      value="Part Time"
                      onChange={(event) => {
                        setJobType(event.target.value);
                      }}
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
                      onChange={(event) => {
                        setMode(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Checkbox />}
                      label="On-site"
                      value="On-site"
                      onChange={(event) => {
                        setMode(event.target.value);
                      }}
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
                <TextField
                  required
                  type="number"
                  label="Salary"
                  onChange={(event) => {
                    setSalary(event.target.value);
                  }}
                />
              </div>

              <h4>Set Location and Deadline</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TextField
                    required
                    label="City Name"
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                  <Button
                    color="success"
                    onClick={createPost}
                    variant="contained"
                  >
                    Post
                  </Button>
                  <Button
                    style={{ marginLeft: "25px" }}
                    variant="outlined"
                    onClick={() => history.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
