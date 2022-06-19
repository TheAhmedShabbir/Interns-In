
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function PostEdit({
  Post,
  open,
  close,
  id,
}) {
  const [newPost, setNewPost] = useState();
  
  
  const updatePost = async (id, nPost) => {
    if (nPost == undefined) {
        nPost = Post;
    }
    const Postcollection = doc(db, "UserPosts", id);
    const nf = { post: nPost };
    updateDoc(Postcollection, nf);
  };

 
  const editPost = async () => {
    updatePost(id, newPost);
    
    
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
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
          <h2>Edit Post</h2>
          </div>
          
          
          <TextField
            fullWidth
            label="User Post"
            style = {{minWidth: "600px"}}
            rows={5}
            multiline
            required
            defaultValue={Post}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: "10px",
                    }}>
          <Button style={{
                        backgroundColor: "red",
                        color: "white",
                        boxShadow: "0px 0px 5px black",
                        marginRight: "5px",
                      }} onClick={close}>Cancel</Button>
          <Button style={{
                        backgroundColor: "orange",
                        color: "white",
                        boxShadow: "0px 0px 5px black",
                        marginRight: "5px",
                      }} onClick={() => editPost()}>Update</Button>
          </div>
        </div>
        </div>
      </Modal>
    </div>
  );
}
