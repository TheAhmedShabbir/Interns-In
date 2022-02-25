import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Forums() {
  const [forums, setForums] = useState([]);
  const forumsCollection = collection(db, "Forums");

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
            width: "1100px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <h3>Start a New Topic</h3>
          <TextField
            style={{ marginBottom: "15px" }}
            fullWidth
            label="Topic Title"
          ></TextField>
          <div>
            <Button>Image</Button>
            <Button>Event</Button>
            <Button>Document</Button>
            <Button>Post</Button>
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
                <Button style={{ margin: "15px" }} variant="outlined">
                  View Discussion
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
