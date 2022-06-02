import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DatePicker from "react-datepicker";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { db, auth } from "../../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostJob() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [mode, setMode] = useState("");
  const [salary, setSalary] = useState(5000);
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [loading, setLoading] = useState(true);
  const [postOpen, setPostOpen] = useState(false);

  const userCollection = collection(db, "UserProfile");
  const jobCollection = collection(db, "Job");

  const handlePostClick = () => {
    setPostOpen(true);
  };

  const handlePostClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPostOpen(false);
  };

  const getUser = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    setCompanyName(userData[0]?.CompanyName);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getUser();
        setLoading(false);
      } else {
        navigate("/SignIn");
      }
    });
  }, [user]);

  const createPost = async () => {
    await addDoc(jobCollection, {
      Title: jobTitle,
      Description: jobDescription,
      Type: jobType,
      Mode: mode,
      Salary: salary,
      City: city,
      company: user?.email,
      postedby: companyName,
    });

    navigate("/CompanyHomepage");
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div
        style={{
          minHeight: "630px",
          backgroundColor: "#f3f2ef",
        }}
      >
        <CompanyHeader />
        <h1 style={{ padding: "10px", margin: "20px" }}>Post A New Job</h1>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <ValidatorForm className="space-y-6" onSubmit={createPost}>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item>
                <TextValidator
                  required
                  autoComplete="given-name"
                  name="companyname"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  id="name"
                  label="Job Title"
                  autoFocus
                  value={jobTitle}
                  onChange={(event) => {
                    setJobTitle(event.target.value);
                  }}
                  sx={{ width: "500px" }}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  required
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  label="Job Description"
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                  }}
                  sx={{ width: "500px" }}
                />
              </Grid>

              <h3>Job Type</h3>
              <FormControl>
                <RadioGroup
                  name="nameRadio"
                  value={jobType}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    value={"Full Time"}
                    control={<Radio required={true} />}
                    label={"Full Time"}
                    onChange={(event) => {
                      setJobType(event.target.value);
                    }}
                    sx={{ marginRight: "150px" }}
                  />
                  <FormControlLabel
                    value={"Part Time"}
                    control={<Radio required={true} />}
                    label={"Part Time"}
                    onChange={(event) => {
                      setJobType(event.target.value);
                    }}
                  />
                </RadioGroup>
              </FormControl>

              <h3>Mode</h3>

              <FormControl>
                <RadioGroup
                  name="nameRadio"
                  value={mode}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    value={"Remote"}
                    control={<Radio required={true} />}
                    label={"Remote"}
                    onChange={(event) => {
                      setMode(event.target.value);
                    }}
                    sx={{ marginRight: "150px" }}
                    errorMessages={["This field is required"]}
                  />
                  <FormControlLabel
                    value={"On-site"}
                    control={<Radio required={true} />}
                    label={"On-site"}
                    onChange={(event) => {
                      setMode(event.target.value);
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <h4>Set Salary</h4>

              <Grid item>
                <TextValidator
                  type="number"
                  label="Salary"
                  value={salary}
                  // validators={["required", "isPassword6Char"]}
                  errorMessages={["This field is required"]}
                  onChange={(event) => {
                    if (event.target.value > 500) {
                      setSalary(event.target.value);
                    }
                  }}
                />
              </Grid>

              <h4>Set Location</h4>
              <Grid item xs={12}>
                <TextValidator
                  required
                  label="City Name"
                  errorMessages={["This field is required"]}
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} type={"submit"}>
              Post
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2, marginLeft: "25px" }}
              onClick={() => history.back()}
            >
              Cancel
            </Button>
          </ValidatorForm>
        </Box>
        <Snackbar
          open={postOpen}
          autoHideDuration={2000}
          onClose={handlePostClose}
        >
          <Alert
            onClose={handlePostClose}
            sx={{ width: "100%" }}
            severity="success"
          >
            Job Posted!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

{
  /* <div style={{ display: "flex", justifyContent: "center" }}>
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
    <h2 style={{ padding: "10px", margin: "20px" }}>Add A New Job</h2>
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
        onChange={(event) => {
          setJobTitle(event.target.value);
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
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Full Time"
                control={<Radio />}
                label="Full Time"
                onChange={(event) => {
                  setJobType(event.target.value);
                }}
              />
              <FormControlLabel
                sx={{ marginLeft: "80px" }}
                control={<Radio />}
                label="Part Time"
                value="Part Time"
                onChange={(event) => {
                  setJobType(event.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
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
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={<Radio />}
                label="Remote"
                value="Remote"
                onChange={(event) => {
                  setMode(event.target.value);
                }}
              />
              <FormControlLabel
                sx={{ marginLeft: "80px" }}
                control={<Radio />}
                label="On-site"
                value="On-site"
                onChange={(event) => {
                  setMode(event.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
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
            onClick={() => createPost().then(handlePostClick())}
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
      <Snackbar
        open={postOpen}
        autoHideDuration={2000}
        onClose={handlePostClose}
      >
        <Alert
          onClose={handlePostClose}
          sx={{ width: "100%" }}
          severity="success"
        >
          Job Posted!
        </Alert>
      </Snackbar>
    </div>
  </div>
</div>; */
}
