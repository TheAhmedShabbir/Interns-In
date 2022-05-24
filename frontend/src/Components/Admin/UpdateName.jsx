import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function UpdateName({ id, open, close, name }) {
  const editName = async (id, newName) => {
    const UsersDoc = doc(db, "UserProfile", id);
    const nf = { name: newName };
    updateDoc(UsersDoc, nf);
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
            height: "20vh",
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
              label="Name"
              defaultValue={name}
              onChange={(e) => editName(id, e.target.value)}
            ></TextField>

            <div>
              <Button
                sx={{ marginTop: "30px" }}
                color="success"
                variant="contained"
                onClick={() => close && window.location.reload()}
              >
                Save
              </Button>
              <Button
                sx={{ marginTop: "30px", marginLeft: "10px" }}
                variant="outlined"
                onClick={() => close}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
