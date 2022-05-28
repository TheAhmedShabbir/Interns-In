
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
          
          <h2>Add Education</h2>
          <TextField
            fullWidth
            label="User Post"
            defaultValue={Post}
            onChange={(e) => setNewPost(e.target.value)}
          />
          
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => editPost()}>Update</Button>
          
        </Box>
      </Modal>
    </div>
  );
}
