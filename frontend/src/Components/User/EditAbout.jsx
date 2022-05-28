import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function AbtEdit({
  address,
  city,
  province,
  main,
  about,
  open,
  close,
  id,
}) {
  const [newAddress, setNewAddress] = useState();
  const [newCity, setNewCity] = useState();
  const [newProvince, setNewProvince] = useState();
  const [newMain, setNewMain] = useState();
  const [newAbout, setNewAbout] = useState();

  const updateAddress = async (id, nAddress) => {
    if (nAddress == undefined) {
      nAddress = address;
    }
    const Usercollection = doc(db, "UserProfile", id);
    const nf = { address: nAddress };
    updateDoc(Usercollection, nf);
  };

  const updateCity = async (id, nCity) => {
    if (nCity == undefined) {
      nCity = city;
    }
    const Usercollection = doc(db, "UserProfile", id);
    const nf = { city: nCity };
    updateDoc(Usercollection, nf);
  };

  const updateProvince = async (id, nProvince) => {
    if (nProvince == undefined) {
      nProvince = province;
    }
    const Usercollection = doc(db, "UserProfile", id);
    const nf = { province: nProvince };
    updateDoc(Usercollection, nf);
  };

  const updateMain = async (id, nMain) => {
    if (nMain == undefined) {
      nMain = main;
    }
    const Usercollection = doc(db, "UserProfile", id);
    const nf = { bio: nMain };
    updateDoc(Usercollection, nf);
  };

  const updateAbout = async (id, nAbout) => {
    if (nAbout == undefined) {
      nAbout = about;
    }
    const Usercollection = doc(db, "UserProfile", id);
    const nf = { about: nAbout };
    updateDoc(Usercollection, nf);
  };

  const editEdu = async () => {
    updateAddress(id, newAddress);
    updateCity(id, newCity);
    updateProvince(id, newProvince);
    updateMain(id, newMain);
    updateAbout(id, newAbout);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
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
          <h2>Add About</h2>
          <TextField
            fullWidth
            label="Address"
            defaultValue={address}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="City"
            defaultValue={city}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <TextField
            fullWidth
            label="Province"
            defaultValue={province}
            onChange={(e) => setNewProvince(e.target.value)}
          />
          <TextField
            fullWidth
            label="Main"
            defaultValue={main}
            onChange={(e) => setNewMain(e.target.value)}
          />
          <TextField
            fullWidth
            label="About"
            defaultValue={about}
            onChange={(e) => setNewAbout(e.target.value)}
          />
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => editEdu()}>Add</Button>
          {/* </Form> */}
        </Box>
      </Modal>
    </div>
  );
}
