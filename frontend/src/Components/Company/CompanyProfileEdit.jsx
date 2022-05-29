import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function CmpProfEdit({
  companyname,
  email,
  location,
  about,
  open,
  close,
  id,
}) {
  const [newCompanyname, setNewCompanyname] = useState();
  const [newLocation, setNewLocation] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAbout, setNewAbout] = useState();

  const updateCompanyname = async (id, nCName) => {
    if (nCName == undefined) {
        nCName = companyname;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { CompanyName: nCName };
    updateDoc(UserCollection, nf);
  };

  const updatelocation = async (id, nLocation) => {
    if (nLocation == undefined) {
        nLocation = location;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { Location: nLocation };
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

  const updateAbout = async (id, nAbout) => {
    if (nPass == undefined) {
        nAbout = about;
    }
    const UserCollection = doc(db, "UserProfile", id);
    const nf = { About: nAbout };
    updateDoc(UserCollection, nf);
  };

  const editCmpProf = async () => {
    updateFName(id, newCompanyname);
    updateSName(id, newLocation);
    updateEmail(id, newEmail);
    updatePassword(id, newAbout);
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
            label="Company Name"
            defaultValue={companyname}
            onChange={(e) => setNewCompanyname(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Location"
            defaultValue={location}
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <TextField
            fullWidth
            label="About"
            defaultValue={about}
            onChange={(e) => setNewAbout(e.target.value)}
          />
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => editProf()}>Update</Button>
          {/* </Form> */}
        </Box>
      </Modal>
    </div>
  );
}
