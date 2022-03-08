import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import img from "../assets/images/Userpfp.jpg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  const [NewPost, setNewPost] = useState("");

  

  //data fetch from database
  const forumTopicCollection = collection(db, "Forum Topic");
  const forumsCollection = collection(db, "Forums");

  // Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PostQuery = async () => {
    await addDoc(forumTopicCollection, { Post: NewPost });
  };

  // useEffect(() => {
  //   }, []);

  useEffect(() => {
    // get forums topic
    const getForumDescription = async () => {
      const data = await getDocs(forumsCollection);
      setForumTopic(data.docs.map((doc) => ({ ...doc.data() })));
      // console.log(forumTopic)
    };

    // get forums topic
    // const getForumTopic = async () => {
    //   const data = await getDocs(forumTopicCollection);
    //   setForumTopic(data.docs.map((doc) => ({ ...doc.data() })));
    // };

    // Function Calls
    // getForumTopic();

    // Function Calls
    getForumDescription();
  }, []);

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
        style={{ display: "flex", flexDirection: "column", minHeight: "500px", backgroundColor : 'white', borderRadius: '10px', border : '2px solid #548CCB' , margin : '50px', minHeight : '200px'}}
      >
        {forumTopic.map((item, key) => {
          return (
            
            <div style = {{display : 'flex', flexDirection : 'column', margin : '50px', borderRadius : '10px', }}>
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
                             <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white' }}>
                               <div>
                                 <TextField
                                   style={{ width: '350px' }}
                                   label="What's on your mind?"
                                   onChange={(event) => { setNewPost(event.target.value) }}
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
            backgroundColor: "white",
            margin: "50px",
            border : '2px solid #548CCB',
            borderRadius: "10px",
          }}
        >
          <h1>User posts</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              margin: "15px",
              borderRadius: "20px",
            }}
          >
            <div style={{ marginright: "5px" }}>
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50px",
                }}
                src={img}
                alt=""
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "5px",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <h4 style={{ marginLeft: "5px" }}>My Name</h4>
              <p style={{ marginLeft: "5px", textAlign: "justify" }}>
                hey there
              </p>
              <Button style={{ marginLeft: "5px" }}>reply</Button>
            </div>
          </div>
        </div>
      
    </div>
  );
}
