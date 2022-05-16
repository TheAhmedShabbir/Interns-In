import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function EduEdit({
  degree,
  Institute,
  status,
  duration,
  open,
  close,
  id
}) {
  const [newDegree, setNewDegree] = useState();
  const [newInstitute, setNewInstitute] = useState();
  const [newStatus, setNewStatus] = useState();
  const [newDuration, setNeDuration] = useState();
  // const [newJobType, setNewJobType] = useState();
  // const [newMode, setNewMode] = useState();

  const updateDegree = async (id, nDegree) => {
    if (nDegree == undefined) {
      nDegree = degree;
    }
    const EDUcollection = doc(db, "UserEducation", id);
    const nf = { Degree_Name: nDegree };
    updateDoc(EDUcollection, nf);
  };

  const updateInstitute = async (id, nInstitute) => {
    if (nInstitute == undefined) {
      nInstitute = Institute;
    }
    const EDUcollection = doc(db, "UserEducation", id);
    const nf = { Institute_Name: nInstitute };
    updateDoc(EDUcollection, nf);
  };

  const updateDuration = async (id, nDuration) => {
    if (nDuration == undefined) {
      nDuration = duration;
    }
    const EDUcollection = doc(db, "UserEducation", id);
    const nf = { Duration: nDuration };
    updateDoc(EDUcollection, nf);
  };

  const updateStatus = async (id, nStatus) => {
    if (nStatus == undefined) {
      nStatus = status;
    }
    const EDUcollection = doc(db, "UserEducation", id);
    const nf = { Status: nStatus };
    updateDoc(EDUcollection, nf);
  };

  // const updateJobType = async (id, nJobType) => {
  //   if (nJobType == undefined) {
  //     nJobType = type;
  //   }
  //   const jobDoc = doc(db, "Job", id);
  //   const nf = { Type: nJobType };
  //   updateDoc(jobDoc, nf);
  // };

  // const updateMode = async (id, nMode) => {
  //   if (nMode == undefined) {
  //     nMode = mode;
  //   }
  //   const jobDoc = doc(db, "Job", id);
  //   const nf = { Mode: nMode };
  //   updateDoc(jobDoc, nf);
  // };

  const editEdu = async () => {
    updateDegree(id, newDegree);
    updateInstitute(id, newInstitute);
    updateDuration(id, newDuration);
    updateStatus(id, newStatus);
    // updateJobType(id, newJobType);
    // updateMode(id, newMode);
  };

  return (
    <div>


<Modal
                      open={open}
                      onClose={close}
                      // aria-labelledby="modal-modal-title"
                      // aria-describedby="modal-modal-description"
                       >
                         <Box sx={{ position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #548CCB',
                                    boxShadow: 24,
                                    p: 4,}}>
                          {/* <Form> */}
                            <h2>Add Education</h2>
                            <TextField
                            fullWidth 
                            label = "Degree Name"
                            defaultValue={degree}
                            onChange={(e) => setNewDegree(e.target.value)}
                            />
                            <TextField
                            fullWidth 
                            label = "Institute Name"
                            defaultValue={Institute}
                            onChange={(e) => setNewInstitute(e.target.value)}
                            />
                            <TextField
                            fullWidth 
                            label = "Duration"
                            defaultValue={duration}
                            onChange={(e) => setNewDuration(e.target.value)}
                            />
                            <TextField
                            fullWidth 
                            label = "Status"
                            defaultValue={status}
                            onChange={(e) => setNewStatus(e.target.value)}
                            />
                            <Button onClick = {close}>Cancel</Button>
                            <Button onClick={() => editEdu()}>Add</Button>
                          {/* </Form> */}
                        </Box>
                       </Modal>



{/* 
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
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Full Time"
                      value="Full Time"
                      // defaultValue={type}
                      onChange={(event) => {
                        setNewJobType(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Radio />}
                      label="Part Time"
                      value="Part Time"
                      // defaultValue={type}
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
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Remote"
                      value="Remote"
                      defaultValue={mode}
                      onChange={(event) => {
                        setNewMode(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: "80px" }}
                      control={<Radio />}
                      label="On-site"
                      value="On-site"
                      defaultValue={mode}
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
      </Modal> */}
    </div>
  );
}
