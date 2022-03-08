import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Forums() {

  const [NewTopic, setNewTopic] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [forums, setForums] = useState([]);
  const forumsCollection = collection(db, "Forums");


  const StartTopic = async () => {
    await addDoc(forumsCollection, { TopicTitle: NewTopic, TopicDescription: NewDescription });

  }

  useEffect(() => {
    // get forums
    const getForums = async () => {
      const data = await getDocs(forumsCollection);
      setForums(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getForums();
  }, []);

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
          minHeight: "600px",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            minWidth: "300px",
            width: '1100px',
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <h3>Start a New Topic</h3>
          <TextField
            style={{ marginBottom: "15px" }}
            fullWidth
            label="Topic Title"
            onChange={(event) => { setNewTopic(event.target.value) }}
          ></TextField>
          <TextField
            style={{ marginBottom: "15px" }}
            fullWidth
            label="Topic Description"
            onChange={(event) => { setNewDescription(event.target.value) }}
          ></TextField>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <Button>Image</Button>
              <Button>Event</Button>
              <Button>Document</Button>

            </div>
            <div>
              <Button onClick={StartTopic} style={{ color: 'white', backgroundColor: '#548CCB', borderRadius: '2px' }}>Post</Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "15px",
          }}
        >
          {forums.map((forum) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: "300px",
                  width: "350px",
                  borderRadius: "10px",
                  margin: "8px",
                }}
              >
                <h2>{forum.TopicTitle}</h2>
                <Typography>Total posts: 1000</Typography>
                <Typography>Views: 2300</Typography>
                <Button
                  href="/ForumTopic"
                  style={{ margin: "15px" }}
                  variant="outlined"
                >
                  View Discussion
                </Button>
              </div>
            );
          })}
        </div>
      </div >
    </div >
  );
}
