import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function FormEdit({
  open,
  close,
  id,
  title,
  description,
  salary,
  city,
}) {
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newSalary, setNewSalary] = useState();
  const [newCity, setNewCity] = useState();

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

  const editJob = async () => {
    updateTitle(id, newTitle);
    updateDescription(id, newDescription);
    updateSalary(id, newSalary);
    updateCity(id, newCity);
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
                <FormGroup
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Full Time"
                    value="Full time"
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
                onClick={() => editJob()}
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
    </div>
  );
}
