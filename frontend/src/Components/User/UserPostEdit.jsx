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
                  <div style = {{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",}}>

                    <div
                      style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    // alignItems: "center",
                    backgroundColor: "white",
                    padding: '15px',
                  }}
                    >
                      <div style = {{display : 'flex', justifyContent: 'initial',}}>
                  <h3>Edit Post</h3>
                  </div>
                      <div>
                        <TextField
                         fullWidth
                          label="What's on your mind?"
                          rows={5}
                          multiline
                          required
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
                  </div>
                </Modal>
              </div>
    </div>
  )
}
