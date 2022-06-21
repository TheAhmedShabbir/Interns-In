import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ExpEdit({
  company,
  position,
  duration,
  certified,
  open,
  close,
  id,
}) {
  const [newCompany, setNewCompany] = useState();
  const [newPosition, setNewPosition] = useState();
  const [newDuration, setNewDuration] = useState();
  const [newCertified, setNewCertified] = useState();

  const updateCompany = async (id, nCompany) => {
    if (nCompany == undefined) {
      nCompany = company;
    }
    const EXPcollection = doc(db, "UserProfile", id);
    const nf = { Company_Name: nCompany };
    updateDoc(EXPcollection, nf);
  };

  const updatePosition = async (id, nPosition) => {
    if (nPosition == undefined) {
      nPosition = position;
    }
    const EXPcollection = doc(db, "UserProfile", id);
    const nf = { Position_Name: nPosition };
    updateDoc(EXPcollection, nf);
  };

  const updateDuration = async (id, nDuration) => {
    if (nDuration == undefined) {
      nDuration = duration;
    }
    const EXPcollection = doc(db, "UserProfile", id);
    const nf = { Duration: nDuration };
    updateDoc(EXPcollection, nf);
  };

  const updateCertified = async (id, nCertified) => {
    if (nCertified == undefined) {
      nCertified = certified;
    }
    const EXPcollection = doc(db, "UserProfile", id);
    const nf = { Certified: nCertified };
    updateDoc(EXPcollection, nf);
  };

  const editExp = async () => {
    updateCompany(id, newCompany);
    updatePosition(id, newPosition);
    updateDuration(id, newDuration);
    updateCertified(id, newCertified);
  };

  return (
    <div>
      <Modal open={open} onClose={close}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {/* <Form> */}
          <h2>Add Education</h2>
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Company Name"
            defaultValue={company}
            onChange={(e) => setNewCompany(e.target.value)}
          />
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Position Name"
            defaultValue={position}
            onChange={(e) => setNewPosition(e.target.value)}
          />
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Duration"
            defaultValue={duration}
            onChange={(e) => setNewDuration(e.target.value)}
          />
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Certified"
            defaultValue={certified}
            onChange={(e) => setNewCertified(e.target.value)}
          />
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => editExp()}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
}
