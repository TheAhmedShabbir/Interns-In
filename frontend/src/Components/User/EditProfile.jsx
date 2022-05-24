import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ProfEdit({
  first_name,
  second_name,
  email,
  password,
  open,
  close,
  id,
}) {
  const [newFirstName, setNewFirstName] = useState();
  const [newScndName, setNewScndName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const updateFName = async (id, nFName) => {
    if (nFName == undefined) {
      nFName = first_name;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { FirstName: nFName };
    updateDoc(UserCollection, nf);
  };

  const updateSName = async (id, nSName) => {
    if (nSName == undefined) {
      nSName = second_name;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { LastName: nSName };
    updateDoc(UserCollection, nf);
  };

  const updateEmail = async (id, nEmail) => {
    if (nEmail == undefined) {
      nEmail = email;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { Email: nEmail };
    updateDoc(UserCollection, nf);
  };

  const updatePassword = async (id, nPass) => {
    if (nPass == undefined) {
      nPass = password;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { Password: nPass };
    updateDoc(UserCollection, nf);
  };

  const editProf = async () => {
    updateFName(id, newFirstName);
    updateSName(id, newScndName);
    updateEmail(id, newEmail);
    updatePassword(id, newPassword);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #548CCB",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* <Form> */}
          <h2>Edit User Information</h2>
          <TextField
            fullWidth
            label="First Name"
            defaultValue={first_name}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Last Name"
            defaultValue={second_name}
            onChange={(e) => setNewScndName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Enter password to save changes"
            // defaultValue={}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Enter new password if you want o change your default password"
            // defaultValue={}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => editProf()}>Add</Button>
          {/* </Form> */}
        </Box>
      </Modal>
    </div>
  );
}
