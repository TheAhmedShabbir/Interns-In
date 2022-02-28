import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function ForumTopic() {
  const [forumTopic, setForumTopic] = useState([]);
  const forumTopicCollection = collection(db, "Forum Topic");

  useEffect(() => {
    // get forums topic
    const getForumTopic = async () => {
      const data = await getDocs(forumTopicCollection);
      setForumTopic(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getForumTopic();
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
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
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: "300px",
                    width: "350px",
                    borderRadius: "10px",
                    margin: "8px",
                    minWidth: "900px",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
