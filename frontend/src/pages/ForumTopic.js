import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import img from "../assets/images/Userpfp.jpg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f3f2ef",
  border: "2px solid #548CCB",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Forumtopic() {
  //Database variables
  const [forumTopic, setForumTopic] = useState([]);
  const [Userposts, setUserposts] = useState([]);
  const [NewPost, setNewPost] = useState("");


  //data fetch from database
  const forumTopicCollection = collection(db, "Forum Topic");
  const forumsCollection = collection(db, "Forums");

  // Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PostQuery = async () => {
    await addDoc(forumTopicCollection, { userPost: NewPost });
  };

  useEffect(() => {
    // get forums topic
    const getForumDescription = async () => {
      const data = await getDocs(forumsCollection);
      setForumTopic(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(forumTopic)
    };

    getForumDescription();
  }, []);


useEffect(() => {
  const getUserPosts = async () => {
    const data = await getDocs(forumTopicCollection);
    setUserposts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(Userposts)
  };

  getUserPosts();
},[])
  

  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <UserHeader />
      {/* <button
        onClick={() => {
          console.log(forumTopic.TopicDescription);
        }}
      >
        Click
      </button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid #548CCB",
          margin: "50px",
          minHeight: "200px",
        }}
      >
        {forumTopic.map((item, key) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "50px",
                borderRadius: "10px",
              }}
              key={key}
            >
              <h1>{item.TopicDescription}</h1>

              {/* Modal Div */}
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
                          onChange={(event) => {
                            setNewPost(event.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <Button onClick={PostQuery}>Post</Button>
                        <Button>Cancel</Button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "200px",
          backgroundColor: "#f3f2ef",
          margin: "50px",
          border: "2px solid #548CCB",
          borderRadius: "10px",
        }}
      >
        <h1>User posts</h1>
        {Userposts.map((item, key) => {
          return (

         
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            margin: "15px",
            borderRadius: "20px",
            justifyContent: "space-between",
            Width: "200px"
          }}
        >
          <div style={{ marginright: "5px" , display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
            <img
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50px",
                marginLeft:"25px"
              }}
              src={img}
              alt=""
            />
          </div>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "800px",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
            
          >
            
            <h4 style={{ marginLeft: "5px" }}>{item.userName}</h4>
            <p style={{ marginLeft: "5px", textAlign: "justify" }}>{item.userPost}</p>
            <Button style={{ marginLeft: "5px" }}>reply</Button>
            </div>
            

            
            <div style = {{
            justifyContent : 'center', 
           
            // marginRight:"20px",
            // marginTop : '20px'
            margin : '20px'
            }}> 

            <DeleteIcon/>
          </div>

        </div>
         );
         
        })}
      </div>
    </div>
  );
}
