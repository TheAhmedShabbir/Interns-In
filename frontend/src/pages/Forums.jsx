import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { onAuthStateChanged } from "firebase/auth";
import CompanyHeader from "../Components/Company/CompanyHeader";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../Components/Common/Loader";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";

export default function Forums() {
  const navigate = useNavigate();

  const [NewTopic, setNewTopic] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [Usermail, setUsermail] = useState("");
  const [forums, setForums] = useState([]);
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const [ForumType, setForumType] = useState("");
  const forumsCollection = collection(db, "Forums");
  const forumTopicCollection = collection(db, "Forum Topic");
  const UserCollection = collection(db, "UserProfile");

  const [loading, setLoading] = useState(true);

  const StartTopic = async () => {
    await addDoc(forumsCollection, {
      TopicTitle: NewTopic,
      TopicDescription: NewDescription,
      Type: ForumType,
      Post_Email: user.email,
      Time: moment().format("MMMM Do YYYY, h:mm a"),
    });
    await addDoc(forumTopicCollection, {
      Description: NewDescription,
    });
    getForums();
  };

  //get User posts
  const posts = collection(db, "Forum Topic");
  const [postsData, setPostsData] = useState([]);

  // get forums
  const getForums = async () => {
    const data = query(forumsCollection, orderBy("Time", "desc"));
    await getDocs(data)
      .then((doc) => {
        const Fdata = doc.docs.map((forums) => ({
          ...forums.data(),
          id: forums.id,
        }));
        setForums(Fdata);
      })
      .catch((err) => {
        console.log(err);
      });
    // setForums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const Filters = async (name) => {
    const data = query(forumsCollection, orderBy("Time", "desc"));
    const Fdata = await getDocs(data);
    const job = Fdata.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const categoryFilter = job.filter((c) => c.Type == name);

    setForums(categoryFilter);
    console.log(categoryFilter);
    setLoading(false);
  };

  const getUserEmail = async () => {
    const data = await getDocs(forumsCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setLoading(false);
  };

  // get User information
  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userData);
    console.log(UserInfo);

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getUserInfo();
        getForums();
        getUserEmail();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user]);
  if (loading) {
    return (
      <div>
        {/* <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "40%",
            zIndex: "1000",
            height: "35px",
            width: "35px",
          }}
        /> */}
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        {UserInfo[0]?.Role == "Company" ? (
          <div>
            <CompanyHeader />
          </div>
        ) : (
          <UserHeader />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#fafafa",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "#fafafa",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "30px",
                padding: "15px",
                minWidth: "750px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px black",
              }}
            >
              <h3>Start a new Topic</h3>
              <TextField
                fullWidth
                style={{ marginBottom: "15px", minWidth: "500px" }}
                required
                label="Topic Title"
                onChange={(event) => {
                  setNewTopic(event.target.value);
                }}
              ></TextField>

              <TextField
                fullWidth
                style={{
                  marginBottom: "15px",
                  minWidth: "500px",
                }}
                rows={5}
                multiline
                required
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      name="nameRadio"
                      value={ForumType}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flex: "8",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormControlLabel
                        value={"Announcement"}
                        control={<Radio required={true} />}
                        label={"Announcement"}
                        onChange={(event) => {
                          setForumType(event.target.value);
                        }}
                        // sx={{ marginRight: "150px" }}
                      />
                      <FormControlLabel
                        value={"News"}
                        control={<Radio required={true} />}
                        label={"News"}
                        onChange={(event) => {
                          setForumType(event.target.value);
                        }}
                        // sx={{ marginRight: "150px" }}
                      />
                      <FormControlLabel
                        value={"Query"}
                        control={<Radio required={true} />}
                        label={"Query"}
                        onChange={(event) => {
                          setForumType(event.target.value);
                        }}
                        sx={{ marginRight: "350px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                  <div style={{ display: "flex", flex: "2" }}>
                    <Button
                      onClick={StartTopic}
                      variant="contained"
                      style={{ backgroundColor: "blue" }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
                padding: "15px",
                height: "300px",
                // minWidth: "750px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px black",
              }}
            >
              <h3>Show only</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "Orange",
                      margin: "5px",
                    }}
                    onClick={() => {
                      Filters("Announcement");
                    }}
                  >
                    <CampaignIcon />
                    Announcements
                  </Button>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#2C5F2DFF",
                      margin: "5px",
                    }}
                    onClick={() => {
                      Filters("News");
                    }}
                  >
                    <ArticleIcon />
                    News
                  </Button>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#AE0E36FF",
                      margin: "5px",
                    }}
                    onClick={() => {
                      Filters("Query");
                    }}
                  >
                    <HelpIcon />
                    Query
                  </Button>
                </div>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    margin: "5px",
                  }}
                  onClick={getForums}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              padding: "15px",
              marginTop: "20px",
              backgroundColor: "#fafafa",
              borderRadius: "10px",
            }}
          >
            {forums.map((forum, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // alignItems: "center",
                    backgroundColor: "white",
                    height: "250px",
                    width: "300px",
                    borderRadius: "10px",
                    margin: "8px",
                    boxShadow: "0 0 10px black",
                  }}
                  key={key}
                >
                  {forum.Type == "Announcement" ? (
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        maxHeight: "30px",
                        backgroundColor: "orange",
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: "white",
                          marginLeft: "5px",
                        }}
                      >
                        Type : Announcement
                      </p>
                    </div>
                  ) : forum.Type == "News" ? (
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        maxHeight: "30px",
                        backgroundColor: "#2C5F2DFF",
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: "white",
                          marginLeft: "5px",
                        }}
                      >
                        Type : News
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        maxHeight: "30px",
                        backgroundColor: "#AE0E36FF",
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: "white",
                          marginLeft: "5px",
                        }}
                      >
                        Type : Query
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h2>{forum.TopicTitle}</h2>
                    <h5 style={{ color: "GrayText" }}>
                      Posted on : {forum.Time}
                    </h5>
                  </div>
                  {postsData.map((post, key) => {
                    return (
                      <div key={key}>
                        <Typography>Total posts: {post?.length}</Typography>
                      </div>
                    );
                  })}
                  {/* <Typography>Views: 2300</Typography> */}
                  <div>
                    <Button
                      href={`/ForumTopic/${forum?.id}`}
                      style={{
                        margin: "15px",
                        backgroundColor: "#333D79FF",
                        color: "white",
                        // boxShadow: "0 0 5px black",
                      }}
                      variant="contained"
                    >
                      <VisibilityIcon style={{ marginRight: "5px" }} />
                      View Discussion
                    </Button>
                  </div>
                  <div>
                    {user?.email == forum.Post_Email ? (
                      <div></div>
                    ) : (
                      // <button
                      //   style={{ border: "none", backgroundColor: "white" }}
                      // >
                      //   <EditIcon />
                      // </button>
                      <div></div>
                    )}

                    {/* {user.email == forum.Post_Email ? (
                    <button
                      style={{ border: "none", backgroundColor: "white" }}
                      
                    >
                      <DeleteIcon />
                    </button>
                  ) : (
                    <div></div>
                  )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
