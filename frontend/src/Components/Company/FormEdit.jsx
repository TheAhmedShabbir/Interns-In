import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormEdit({
  open,
  close,
  id,
  title,
  description,
  salary,
  city,
  type,
  mode,
}) {
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newSalary, setNewSalary] = useState();
  const [newCity, setNewCity] = useState();
  const [newJobType, setNewJobType] = useState();
  const [newMode, setNewMode] = useState();

  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = () => {
    setEditOpen(true);
  };

  const handleEditClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEditOpen(false);
  };

  const updateTitle = async (id, nTitle) => {
    if (nTitle == undefined) {
      nTitle = title;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { Title: nTitle };
    updateDoc(jobDoc, nf);
  };

  const updateDescription = async (id, nDescription) => {
    if (nDescription == undefined) {
      nDescription = description;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { Description: nDescription };
    updateDoc(jobDoc, nf);
  };

  const updateSalary = async (id, nSalary) => {
    if (nSalary == undefined) {
      nSalary = salary;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { Salary: nSalary };
    updateDoc(jobDoc, nf);
  };

  const updateCity = async (id, nCity) => {
    if (nCity == undefined) {
      nCity = city;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { City: nCity };
    updateDoc(jobDoc, nf);
  };

  const updateJobType = async (id, nJobType) => {
    if (nJobType == undefined) {
      nJobType = type;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { Type: nJobType };
    updateDoc(jobDoc, nf);
  };

  const updateMode = async (id, nMode) => {
    if (nMode == undefined) {
      nMode = mode;
    }
    const jobDoc = doc(db, "Job", id);
    const nf = { Mode: nMode };
    updateDoc(jobDoc, nf);
  };

  const editJob = async () => {
    updateTitle(id, newTitle);
    updateDescription(id, newDescription);
    updateSalary(id, newSalary);
    updateCity(id, newCity);
    updateJobType(id, newJobType);
    updateMode(id, newMode);
  };

  return (
    <div>
      <Modal open={open}>
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
            width: "80vh",
            height: "85vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              style={{ margin: "10px" }}
              label="Job Title"
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              style={{ margin: "10px" }}
              label="Job Description"
              defaultValue={description}
              onChange={(e) => setNewDescription(e.target.value)}
            ></TextField>
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
                    defaultValue={type}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Full Time"
                      value="Full"
                      onChange={(event) => {
                        setNewJobType(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Radio />}
                      label="Part Time"
                      value="Part"
                      onChange={(event) => {
                        setNewJobType(event.target.value);
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
                    defaultValue={mode}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Remote"
                      value="Remote"
                      onChange={(event) => {
                        setNewMode(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Radio />}
                      label="On-site"
                      value="On-site"
                      onChange={(event) => {
                        setNewMode(event.target.value);
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
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TextField
                type="number"
                label="Salary"
                defaultValue={salary}
                onChange={(e) => setNewSalary(e.target.value)}
              />
            </div>
            <h4>Set Location</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                label="City Name"
                defaultValue={city}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </div>
            <div>
              <Button
                sx={{ marginTop: "30px" }}
                color="success"
                variant="contained"
                onClick={() => editJob().then(handleEditClick())}
              >
                Save
              </Button>
              <Button
                sx={{ marginTop: "30px", marginLeft: "10px" }}
                variant="outlined"
                onClick={close}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={editOpen}
        autoHideDuration={2000}
        onClose={handleEditClose}
      >
        <Alert
          onClose={handleEditClose}
          sx={{ width: "100%" }}
          severity="success"
        >
          Job Updated!
        </Alert>
      </Snackbar>
    </div>
  );
}
