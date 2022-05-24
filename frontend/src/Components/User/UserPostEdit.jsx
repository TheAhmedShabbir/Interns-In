import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { db } from "../../firebase-config";
import {updateDoc, doc } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
 


export default function UserPostEdit({post, id, open, close}) {

    const updateUserPost = async (id, newPost) => {
        const updatePostDoc = doc(db, "Forum Topic", id);
        const nf = { userPost: newPost };
        updateDoc(updatePostDoc, nf);
      };

  return (
    <div>
        <div style={{ alignContent: "baseline" }}>
                <Button onClick={handleOpen}>What's on your mind?</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "white",
                      }}
                    >
                      <div>
                        <TextField
                          style={{ width: "350px" }}
                          label="What's on your mind?"
                          defaultValue={post}
                          onChange={(event) => {
                            updateUserPost(id, event.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <Button onClick={close && window.location.reload()} >Post</Button>
                        <Button  onClick={close}>Cancel</Button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
    </div>
  )
}
