import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserPostEdit from "../Components/User/UserPostEdit";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import CompanyHeader from "../Components/Company/CompanyHeader";
import PostEdit from "../Components/Common/EditPostModal";
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from "react-router-dom";


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
  const [forumTopic, setForumTopic] = useState();
  const [forumID, setForumID] = useState();
  const [NewPost, setNewPost] = useState("");
  const { id } = useParams();
  const UserCollection = collection(db, "UserProfile");
  const PostCollection = collection(db, "UserPosts");
  const [UserInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState({});
  const [Posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  // Get User/Company To render respective header
  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userData);
  };

  // Get User Posts from database

    // const getPosts = async () => {
    //   const data = await getDocs(PostCollection);
    //   const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    //   console.log(Posts);
      
    // };

  // Post user posts in the database.

    const PostQuery = async () => {
    await addDoc(PostCollection, {
       post: NewPost ,
        Forum_ID: forumTopic?.id,
        User_Email: user?.email,
        User_Pfp: UserInfo[0].Pfp      
      });
  };

  // Update Post
  
  let [updatedPost, setUpdatedPost] = useState([]);

  const updatePost = async (id) => {
    setUpdatedPost(Posts[id]);
    handleOpen2();
  };

  // Modal for update post
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // Delete Post
  const deletePost = async (id) => {
    const PostCollection = doc(db, "UserPosts", Posts[id].id);
    await deleteDoc(PostCollection);
  };

  

  // User Post Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const openModal = () => {
  //   setOpen(true);
  // };
  const getForums = async () => {
    await getDoc(doc(db, `Forums/${id}`)).then((x) => {
      setForumTopic({ id: x.id, ...x.data() });
      
    });
    const d = await getDocs(PostCollection);
    const posts = d.docs.map((doc) => ({ ...doc.data(),id: doc.id }));
    const userProf = posts.filter((i) => i?.Forum_ID == forumTopic?.id);
    
    setPosts(userProf);
  };
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(user);
      if (currentUser) {

        getUserInfo();
        getForums();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user,forumTopic?.id]);
 

  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      {UserInfo[0]?.Role == "Company" ? (
        <div>
          <CompanyHeader />
        </div>
      ) : (
        <UserHeader />
      )}
      
      <div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "50px",
                  borderRadius: "10px",
                }}
              >
                 <h1>{forumTopic?.TopicDescription}</h1>  

                 {/* Modal Div  */}
                <div style={{ alignContent: "baseline" }}>
                  <Button onClick={handleOpen}>Add an Answer</Button>
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
                          <Button onClick={handleClose}>Cancel</Button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>

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
          {Posts.map((item, key) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  margin: "15px",
                  borderRadius: "20px",
                  justifyContent: "space-between",
                  Width: "200px",
                }}
                key={key}
              >
                <div
                  style={{
                    marginright: "5px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                      marginLeft: "25px",
                    }}
                    src={item.User_Pfp}
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
                  <h4 style={{ marginLeft: "5px" }}>{item.User_Email}</h4>
                  <p style={{ marginLeft: "5px", textAlign: "justify" }}>
                    {item.post}
                  </p>
                  {/* <Button style={{ marginLeft: "5px" }}>reply</Button> */}
                </div>

                <div
                  style={{
                    justifyContent: "center",

                    // marginRight:"20px",
                    // marginTop : '20px'
                    margin: "20px",
                  }}
                >
                  {item.User_Email == user.email ? (
                    <div style={{
                      justifyContent: "center",
                      margin: "20px",
                    }}>
                      <button
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        color : '#4F18FB',
                        cursor: "pointer",
                      }}
                      onClick={() => updatePost(key)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        color : '#FB1871 ',
                        cursor: "pointer",
                      }}
                      onClick={() => deletePost(key)}
                    >
                      <DeleteIcon />
                    </button>
                    </div>
                  ) : (  
                  <div style={{
                    justifyContent: "center",
                    margin: "20px",
                  }}>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    <FlagIcon />
                  </button>
                  </div>
                  )}
                </div>
              </div>
            );
          })}
                   
        </div>
        <PostEdit
      id = {updatedPost.id}
      key = {updatedPost.id}
      open = {open2}
      setOpen = {setOpen2}
      close = {handleClose2}
      Post = {updatedPost.post}
      />
      </div>
    </div>
  );
}
