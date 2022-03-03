import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import img from "../assets/images/Userpfp.jpg";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { Comment, Form, } from 'semantic-ui-react'

import { Comment, Form } from "semantic-ui-react";
// import { TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f3f2ef',
  border: '2px solid #548CCB',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


export default function ForumTopic() {
  const [forumTopic, setForumTopic] = useState([]);

  //Question/Answer states
  const [rep, setReply] = useState(false);
  const [repp, setReplyState] = useState("false");

  //data fetch from database
  const forumTopicCollection = collection(db, "Forum Topic");

  // Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    // get forums topic
    const getForumTopic = async () => {
      const data = await getDocs(forumTopicCollection);
      setForumTopic(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getForumTopic();
  }, []);

  function reply() {
    setReply(true);
  }
  function replystate() {
    setReplyState(false);
    setReply(false);
  }

  return (
    <div>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#f3f2ef",
          marginLeft: "auto",
          marginRight: "auto",
          // marginTop: "50px",
          minHeight: "600px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: "15px",
            marginTop: "50px",
            border: "3px solid #548CCB",
            backgroundColor: "#f3f2ef",
            flexWrap: "wrap",
            padding: "15px",
          }}
        >
          {forumTopic.map((forumtopic) => {
            return (
              <div>
                <h2>{forumtopic.Description}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    // alignItems: "center",
                    // border: "3px solid #548CCB",
                    backgroundColor: "#f3f2ef",
                    minHeight: "200px",
                    borderRadius: "10px",
                    margin: "8px",
                    minWidth: "900px",
                  }}
                >
                  <div style={{ alignContent: "baseline" }}>
                    <Button onClick={handleOpen}>Ask a Question</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#f3f2ef' }}>
                          <div>
                            <TextField
                              style={{ width: '350px' }}
                              label="What's on your mind?"
                            />
                          </div>
                          <div>
                            <Button>Post</Button>
                            <Button>Cancel</Button>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </div>
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
                        Hey, whats up??
                      </p>
                      <Button onClick={reply} style={{ marginLeft: "5px" }}>
                        reply
                      </Button>

                      {rep ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <TextField></TextField>

                          <Button onClick={replystate}>Post</Button>

                          <Button
                            onClick={() => {
                              setReply(false);
                            }}
                            style={{ marginLeft: "5px" }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div></div>
                      )}






                      {repp ? (
                        <div></div>
                      ) : (
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
                            <p
                              style={{
                                marginLeft: "5px",
                                textAlign: "justify",
                              }}
                            >
                              Hey, whats up??
                            </p>
                            <Button
                              onClick={reply}
                              style={{ marginLeft: "5px" }}
                            >
                              reply
                            </Button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


