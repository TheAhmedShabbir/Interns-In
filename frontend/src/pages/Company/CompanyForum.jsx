import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { onAuthStateChanged } from "firebase/auth";
import CompanyHeader from "../../Components/Company/CompanyHeader";

export default function CompanyForums() {
  const [NewTopic, setNewTopic] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [Usermail, setUsermail] = useState("");
  const [forums, setForums] = useState([]);
  const forumsCollection = collection(db, "Forums");
  const forumTopicCollection = collection(db, "Forum Topic");
  const [user, setUser] = useState({});

  const StartTopic = async () => {
    await addDoc(forumsCollection, {
      TopicTitle: NewTopic,
      TopicDescription: NewDescription,
      Post_Email: user.email,
    });
    await addDoc(forumTopicCollection, {
      Description: NewDescription,
    });
  };

  // get forums
  const getForums = async () => {
    const data = await getDocs(forumsCollection);
    setForums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // get User information
  const getUserInfo = async () => {
    const data = await getDocs(forumsCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Role == "Company");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(user);
    });
    if (user) {
      getForums();
    } else {
      navigate("/SignIn");
    }
    getForums();
    getUserInfo();
  }, [user]);

  return (
    <div>
        <CompanyHeader/>
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
            onChange={(event) => {
              setNewTopic(event.target.value);
            }}
          ></TextField>
          <TextField
            style={{ marginBottom: "15px" }}
            fullWidth
            label="Topic Description"
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
          ></TextField>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* <Button>Image</Button>
              <Button>Event</Button>
              <Button>Document</Button> */}
            </div>
            <div>
              <Button
                onClick={StartTopic}
                style={{
                  color: "white",
                  backgroundColor: "#548CCB",
                  borderRadius: "2px",
                }}
              >
                Post
              </Button>
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
                  href={`/CompanyForumTopic/${forum?.id}`}
                  style={{ margin: "15px" }}
                  variant="outlined"
                >
                  View Discussion
                </Button>
                <div>
                  {user.email == forum.Post_Email ? (
                    <button
                      style={{ border: "none", backgroundColor: "white" }}
                    >
                      <EditIcon />
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {user.email == forum.Post_Email ? (
                    <button
                      style={{ border: "none", backgroundColor: "white" }}
                      onClick
                    >
                      <DeleteIcon />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
