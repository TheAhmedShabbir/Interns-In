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
  const updateTitle = async (id, newTitle) => {
    const jobDoc = doc(db, "Job", id);
    const nf = { Title: newTitle };
    updateDoc(jobDoc, nf);
  };

  const updateDescription = async (id, newDescription) => {
    const jobDoc = doc(db, "Job", id);
    const nf = { Description: newDescription };
    updateDoc(jobDoc, nf);
  };

  const updateSalary = async (id, newSalary) => {
    const jobDoc = doc(db, "Job", id);
    const nf = { Salary: newSalary };
    updateDoc(jobDoc, nf);
  };

  const updateCity = async (id, newCity) => {
    const jobDoc = doc(db, "Job", id);
    const nf = { City: newCity };
    updateDoc(jobDoc, nf);
  };

  // const updateTitle = async (id, newTitle) => {
  //   const jobDoc = doc(db, "Job", id);
  //   const nf = { Title: newTitle };
  //   updateDoc(jobDoc, nf);
  // };

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
              onChange={(e) => updateTitle(id, e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              style={{ margin: "10px" }}
              label="Job Description"
              defaultValue={description}
              onChange={(e) => updateDescription(id, e.target.value)}
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
                onChange={(e) => updateSalary(id, e.target.value)}
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
                onChange={(e) => updateCity(id, e.target.value)}
              />
            </div>
            <div>
              <Button
                sx={{ marginTop: "30px" }}
                color="success"
                variant="contained"
                onClick={close}
              >
                Save
              </Button>
              {/* <Button variant="outlined">Cancel</Button> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
