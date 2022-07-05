import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import CircularProgress from "@mui/material/CircularProgress";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CompanyProfileEdit from "../../Components/Company/CompanyProfileEdit";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-config";
import { getDownloadURL } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #548CCB",
  boxShadow: 24,
  p: 4,
};

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);

  const UserCollection = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userData);

    setLoading(false);
  };

  // edit data
  let [editDetails, setEditDetails] = useState([]);

  const updateCmpProf = async (id) => {
    setEditDetails(UserInfo[id]);
    handleOpen();
  };
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update Profile Picture
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [Url, setUrl] = useState();
  const [progress, setProgress] = useState(0);

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
  };

  //Update User Profile Picture
  const updateProfilePic = async () => {
    console.log(UserInfo);
    const updatedDoc = doc(db, "UserProfile", UserInfo[0]?.id);
    await updateDoc(updatedDoc, {
      Pfp: Url,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get company information
      getUserInfo();
    } else {
      navigate("/CompanySignIn");
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "40%",
            zIndex: "1000",
            height: "35px",
            width: "35px",
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "#fafafa",
          fontFamily: "ubuntu, arial,sans-serif",
          height: "100vh",
        }}
      >
        <CompanyHeader />
        <div style={{ paddingTop: "70px" }}>
          {UserInfo &&
            UserInfo.map((item, key) => {
              return (
                <div
                  style={{
                    marginTop: "40px",
                  }}
                  key={key}
                >
                  <div style={{ zIndex: 1, position: "relative" }}>
                    <img
                      style={{ borderRadius: "110px" }}
                      width="160px"
                      height="160px"
                      src={item.Pfp}
                    />
                  </div>
                  <div>
                    <Modal open={open2} onClose={handleClose2}>
                      <Box sx={style}>
                        {/* <Form> */}
                        <h2>Update Profile Picture</h2>
                        <form onSubmit={formHandler}>
                          <input type="file" onChange={HandleUpload} />
                          <Button type="submit">upload</Button>
                          <Button onClick={updateProfilePic}>Save</Button>

                          <Button onClick={handleClose2}>Cancel</Button>

                          <h3>uploaded{progress}%</h3>
                        </form>
                      </Box>
                    </Modal>

                    <Button onClick={handleOpen2}>
                      <EditIcon />
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-110px",
                      paddingTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          m: 1,
                          width: "75vh",
                          minHeight: "65vh",
                        },
                      }}
                    >
                      <Paper
                        elevation={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          borderRadius: "20px",
                          marginBottom: "30px",
                          paddingTop: "70px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              paddingLeft: "50px",
                              paddingRight: "70px",
                            }}
                          >
                            <h2>Company Name</h2>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                updateCmpProf(key);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                          <Typography>{item?.CompanyName}</Typography>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              paddingLeft: "50px",
                              paddingRight: "70px",
                            }}
                          >
                            <h2>Password</h2>
                            {/* <Button size="small" variant="outlined">
                      Edit
                    </Button> */}
                          </div>
                          <Typography style={{ marginBottom: "15px" }}>
                            {UserInfo?.Password}
                          </Typography>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              paddingLeft: "50px",
                              paddingRight: "70px",
                            }}
                          >
                            <h2>Email</h2>
                            {/* <Button size="small" variant="outlined">
                      Edit
                    </Button> */}
                          </div>
                          <Typography> {item.Email}</Typography>
                        </div>

                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              paddingLeft: "50px",
                              paddingRight: "70px",
                            }}
                          >
                            <h2>Location</h2>
                            {/* <Button size="small" variant="outlined">
                      Edit
                    </Button> */}
                          </div>
                          <Typography style={{ marginBottom: "15px" }}>
                            {item?.Location}
                          </Typography>
                        </div>

                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              paddingLeft: "50px",
                              paddingRight: "70px",
                            }}
                          >
                            <h2>About </h2>
                            {/* <Button size="small" variant="outlined">
                      Edit
                    </Button> */}
                          </div>
                          <Typography> {item?.About}</Typography>
                        </div>
                      </Paper>
                    </Box>
                  </div>
                  <CompanyProfileEdit
                    id={editDetails?.id}
                    key={editDetails?.id}
                    open={open}
                    setOpen={setOpen}
                    close={handleClose}
                    companyname={editDetails.CompanyName}
                    location={editDetails.Location}
                    email={editDetails.Email}
                    about={editDetails.About}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
