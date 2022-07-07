import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function AdminProfEdit({ name, email, open, close, id }) {
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();

  const updateName = async (id, nName) => {
    if (nName == undefined) {
      nName = name;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { FirstName: nName };
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

  const editAdminProf = async () => {
    updateName(id, newName);
    updateEmail(id, newEmail);
  };

  return (
    <div>
      <Modal open={open} onClose={close}>
        <div
          style={{
            justifyContent: "center",
            margin: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            maxWidth: "600px",
            maxHeight: "600px",
            minWidth: "500px",
            minHeight: "200px",

            borderRadius: "8px",
            position: "absolute",
            left: "31%",
            top: "20%",
          }}
        >
          {/* <Form> */}
          <h2>Edit User Information</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ margin: "10px" }}
              fullWidth
              marginBottom="10px"
              label="Company Name"
              defaultValue={name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue={email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <Button sx={{ margin: "10px" }} onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => editAdminProf()}>Update</Button>
          {/* </Form> */}
        </div>
      </Modal>
    </div>
  );
}
