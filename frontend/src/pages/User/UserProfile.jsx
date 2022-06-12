import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-config";
import { getDownloadURL } from "firebase/storage";
import ProfEdit from "../../Components/User/EditProfile";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const UserCollection = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);
  const [Url, setUrl] = useState();
  let [Edit, setEdit] = useState([]);

  // Upload Profile pic------------------------------------------------------------------------------------------------------------------------

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
    // }
  };

  //Update User Profile Picture

  const updateProfilePic = async () => {
    const updatedDoc = doc(db, "UserProfile", UserInfo[0]?.id);
    await updateDoc(updatedDoc, {
      Pfp: Url,
    });
  };
  //Update User Profile
  const updateProf = async (id) => {
    setEdit(UserInfo[id]);
    handleOpen2();
  };
  // Profile pic modal -----------------------------------------------------------------------------------------------------------------------
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  // Update Modal------------------------------------------------------------------------------------------------------------------------------
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // Get User Info

  const getUserInfo = async () => {
    const data = await getDocs(UserCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userData);
    console.log(UserInfo);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get User information

      // Function Calls
      getUserInfo();
    } else {
      navigate("/SignIn");
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
      <div style={{ backgroundColor: "#fafafa" }}>
        <UserHeader />
        <div style={{ minHeight: "100vh" }}>
          {UserInfo &&
            UserInfo.map((item, key) => {
              return (
                <div key={key}>
                  <div
                    style={{
                      
                      marginTop: "10vh",
                    }}
                  >
                    {item?.Pfp ? (
                      <div>
                        <img
                          style={{
                            borderRadius: "110px",
                            border: "2px solid #2563eb",
                            boxShadow: "0 0 10px #ccc",
                            zIndex: 1000,
                            position: "relative",
                          }}
                          width="160px"
                          height="160px"
                          src={item.Pfp}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          zIndex: 1000,
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "110px",
                            backgroundColor: "white",
                            border: "2px solid #2563eb",
                            boxShadow: "0 0 10px #ccc",
                          }}
                          width="150px"
                          height="150px"
                        />
                      </div>
                    )}

                    {/* Upload Profile picture */}
                    <div>
                      <Modal open={open3} onClose={handleClose3}>
                        <Box sx={style}>
                          {/* <Form> */}
                          <h2>Upload / Download files</h2>
                          <form onSubmit={formHandler}>
                            <input type="file" onChange={HandleUpload} />
                            <Button type="submit">upload</Button>
                            <Button onClick={updateProfilePic}>Save</Button>

                            <Button onClick={handleClose3}>Cancel</Button>

                            <h3>uploaded{progress}%</h3>
                          </form>
                        </Box>
                      </Modal>

                      <Button onClick={handleOpen3}>
                        <EditIcon />
                      </Button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-110px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          m: 1,
                          width: 470,
                          boxShadow: "0 0 10px #ccc",
                        },
                      }}
                    >
                      <Paper
                        style={{
                          paddingTop: "130px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          borderRadius: "20px",
                          paddingBottom: "30px",
                          marginBottom: "30px",
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
                            <h2>Username</h2>
                            <Button
                              size="small"
                              onClick={() => updateProf(key)}
                            >
                              <EditIcon />
                            </Button>
                          </div>
                          <Typography style={{ marginBottom: "15px" }}>
                            {item.FirstName + " " + item.LastName}
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
                            <h2>Password</h2>
                            {/* <Button size="small" variant="outlined">
                    Edit
                  </Button> */}
                          </div>
                          <Typography>******</Typography>
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
                          <Typography>{item.Email}</Typography>
                        </div>
                      </Paper>
                    </Box>

                    <ProfEdit
                      id={Edit?.id}
                      key={Edit?.id}
                      open={open2}
                      close={handleClose2}
                      first_name={Edit?.FirstName}
                      second_name={Edit?.LastName}
                      // password={Edit?.Password}
                      email={Edit?.Email}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
