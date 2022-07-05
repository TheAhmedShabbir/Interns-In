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
  Timestamp,
  query,
  orderBy,
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
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../src/firebase-config";
import { getDownloadURL } from "firebase/storage";
import Loader from "../Components/Common/Loader";
import ScrollButton from "../Components/Common/ScrollUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ReportPost from "../Components/Common/ReportModal";

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
  const [loading, setLoading] = useState(true);

  // Scroll Up button
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  // Get User/Company To render respective header
  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userData);
  };

  // Upload Image in Post
  const [progress, setProgress] = useState(0);
  const [Url, setUrl] = useState("");
  const [image, setImage] = useState(false);

  const uploadImage = async () => {
    setImage(true);
  };

  const CancelUpload = async () => {
    setImage(false);
  };
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    HandleUpload(file);
  };

  const HandleUpload = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrl(url);
        });
      }
    );
    // }
  };

  const [reply, setReply] = useState("");
  // const rep = (p) => setReply(p);

  const PostQuery = async () => {
    await addDoc(PostCollection, {
      post: NewPost,
      Forum_ID: forumTopic?.id,
      User_Email: user?.email,
      User_Pfp: UserInfo[0].Pfp,
      Time: moment().format("MMMM Do YYYY, h:mm a"),
      PostImg: Url,
      Reply_ID: reply,
    });
    getPosts();
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
    getPosts();
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
    setLoading(false);
  };

  const getPosts = async () => {
    const data = query(PostCollection, orderBy("Time", "desc"));
    const d = await getDocs(data);
    const posts = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = posts.filter((i) => i?.Forum_ID == forumTopic?.id);
    setPosts(userProf);
    setLoading(false);
  };

  // Add reply Modal

  // const changeVal = (p) => setReply(p);
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  // Report content
  const [ReportID, setReportID] = useState("");

  const [ROpen, setROpen] = React.useState(false);
  const handleROpen = () => setROpen(true);
  const handleRClose = () => setROpen(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(user);
      if (currentUser) {
        getUserInfo();
        getForums();
        getPosts();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user, forumTopic?.id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef", minHeight: "100vh" }}>
        {UserInfo[0]?.Role == "Company" ? (
          <div>
            <CompanyHeader />
          </div>
        ) : (
          <UserHeader />
        )}

        <div style={{ paddingTop: "70px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              backgroundColor: "white",
              boxShadow: "0px 0px 10px black",
              margin: "50px",
              paddingBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // margin: "50px",
                // borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  backgroundColor: "#2563eb",
                  color: "white",
                }}
              >
                <h2>{forumTopic?.TopicTitle}</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                }}
              >
                <h4>{forumTopic?.TopicDescription}</h4>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#2563eb",
                    boxShadow: "0px 0px 5px black",
                  }}
                  onClick={handleOpen}
                >
                  Add Post
                </Button>
              </div>

              {/* Modal Div  */}
              <Modal
                open={open}
                onClose={handleClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
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
                      padding: "15px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "initial" }}>
                      <h3>Add Post</h3>
                    </div>
                    <div>
                      <TextField
                        style={{ width: "600px" }}
                        label="What's on your mind?"
                        rows={5}
                        multiline
                        required
                        onChange={(event) => {
                          setNewPost(event.target.value);
                        }}
                      />
                    </div>
                    {!image ? (
                      <div>
                        <Button
                          style={{ color: "#2BAE66FF", margin: "5px" }}
                          onClick={uploadImage}
                        >
                          <ExpandMoreIcon style={{ marginRight: "3px" }} />
                          Add Image
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          style={{ color: "#2BAE66FF", margin: "5px" }}
                          onClick={CancelUpload}
                        >
                          <ExpandLessIcon style={{ marginRight: "3px" }} />
                          Add Image
                        </Button>
                        <form
                          onSubmit={formHandler}
                          style={{
                            border: "1px solid black",
                            marginTop: "10px",
                          }}
                        >
                          <h3>Add image</h3>
                          <input type="file" onChange={HandleUpload} />
                          <Button style={{ color: "orange" }} type="submit">
                            <CloudUploadIcon style={{ marginRight: "3px" }} />
                            upload
                          </Button>
                          <h3>Uploaded{progress}%</h3>
                        </form>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          boxShadow: "0px 0px 5px black",
                          marginRight: "5px",
                        }}
                        onClick={PostQuery}
                      >
                        Post
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          boxShadow: "0px 0px 5px black",
                          marginLeft: "5px",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "200px",
              backgroundColor: "#2563eb",

              margin: "50px",
              // border: "2px solid #548CCB",
              borderRadius: "10px",
            }}
          >
            <div style={{ color: "white" }}>
              <h2>Posts</h2>
            </div>

            <Button
              onClick={scrollToTop}
              style={{
                display: visible ? "inline" : "none",
                position: "fixed",
                left: "50%",
                bottom: "10px",
                height: "30px",
                fontSize: "20px",
                zIndex: 100,
                cursor: "pointer",
                backgroundColor: "#4F18FB",
                color: "white",
                boxShadow: "0px 0px 10px black",
              }}
            >
              <ArrowDropUpIcon fontSize="medium" />
            </Button>

            {Posts.map((item, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    margin: "15px",
                    // borderRadius: "20px",
                    justifyContent: "space-between",
                    boxShadow: "0px 0px 20px black",
                    // maxWidth: "200px",
                    // backgroundColor: 'red'
                  }}
                  key={key}
                >
                  <div
                    style={{
                      margin: "5px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      // backgroundColor: 'blue',
                      borderRadius: "20px",
                    }}
                  >
                    {/* <div style = {{display : 'flex', flexDirection : 'row', justifyContent: 'initial'}}> */}
                    <img
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50px",
                        marginRight: "15px",
                      }}
                      src={item.User_Pfp}
                      alt=""
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h4 style={{ marginLeft: "5px", marginRight: "10px" }}>
                        {item.User_Email}
                      </h4>
                      {item.Reply_ID ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <h5
                            style={{
                              marginLeft: "5px",
                              color: "gray",
                              marginRight: "10px",
                            }}
                          >
                            replying to : {item.Reply_ID}
                          </h5>
                          <h5 style={{ color: "gray" }}>{item.Time}</h5>
                        </div>
                      ) : (
                        <h5 style={{ color: "gray" }}>{item.Time}</h5>
                      )}
                    </div>
                    {/* </div> */}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "initial",
                      marginLeft: "10px",
                      // alignItems: "flex-start",
                      // backgroundColor: 'green'
                    }}
                  >
                    <p style={{ marginLeft: "5px", textAlign: "justify" }}>
                      {item.post}
                    </p>
                    {/* <Button style={{ marginLeft: "5px" }}>reply</Button> */}
                  </div>
                  {item.PostImg ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignContent: "left",
                        marginLeft: "15px",
                      }}
                    >
                      <img
                        style={{
                          height: "250px",
                          width: "250px",
                        }}
                        src={item.PostImg}
                        alt=""
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirectio: "row",
                      justifyContent: "initial",
                      // backgroundColor: 'yellow'
                    }}
                  >
                    {item.User_Email == user.email ? (
                      <div
                        style={{
                          justifyContent: "center",
                          margin: "10px",
                        }}
                      >
                        <Button
                          style={{
                            border: "none",
                            color: "#4F18FB",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                          onClick={() => updatePost(key)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          style={{
                            border: "none",
                            marginLeft: "5px",
                            color: "#FB1871 ",
                            cursor: "pointer",
                          }}
                          onClick={() => deletePost(key)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : (
                      <div
                        style={{
                          justifyContent: "center",
                          // margin: "20px",
                        }}
                      >
                        <Button
                          style={{
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                          onClick={() => {
                            handleROpen(), setReportID(item.id);
                          }}
                          // onClick = {() => {console.log(item.id)}}
                        >
                          <FlagIcon />
                        </Button>
                        <Button
                          style={{
                            border: "none",
                            color: "#2BAE66FF",
                            marginLeft: "5px",
                          }}
                          onClick={() => {
                            handleOpen5(), setReply(item.User_Email);
                          }}
                        >
                          <SendIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <PostEdit
            id={updatedPost.id}
            key={updatedPost.id}
            open={open2}
            setOpen={setOpen2}
            close={handleClose2}
            Post={updatedPost.post}
          />
          <ReportPost
            id={ReportID}
            open={ROpen}
            setOpen={setROpen}
            close={handleRClose}
          />
          <Modal open={open5} onClose={handleClose5}>
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
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "initial" }}>
                  <h3>Add Reply</h3>
                </div>
                <div>
                  <TextField
                    style={{ width: "600px" }}
                    label="What's on your mind?"
                    rows={5}
                    multiline
                    required
                    onChange={(event) => {
                      setNewPost(event.target.value);
                    }}
                  />
                </div>
                {!image ? (
                  <div>
                    <Button
                      style={{ color: "#2BAE66FF", margin: "5px" }}
                      onClick={uploadImage}
                    >
                      <ExpandMoreIcon style={{ marginRight: "3px" }} />
                      Add Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      style={{ color: "#2BAE66FF", margin: "5px" }}
                      onClick={CancelUpload}
                    >
                      <ExpandLessIcon style={{ marginRight: "3px" }} />
                      Add Image
                    </Button>
                    <form
                      onSubmit={formHandler}
                      style={{ border: "1px solid black", marginTop: "10px" }}
                    >
                      <h3>Add image</h3>
                      <input type="file" onChange={HandleUpload} />
                      <Button style={{ color: "orange" }} type="submit">
                        <CloudUploadIcon style={{ marginRight: "3px" }} />
                        upload
                      </Button>
                      <h3>Uploaded{progress}%</h3>
                    </form>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      boxShadow: "0px 0px 5px black",
                      marginRight: "5px",
                    }}
                    onClick={PostQuery}
                  >
                    Post
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      boxShadow: "0px 0px 5px black",
                      marginLeft: "5px",
                    }}
                    onClick={handleClose5}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
