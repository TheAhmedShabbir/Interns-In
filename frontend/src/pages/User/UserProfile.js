import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const UserCollection = collection(db, "UserProfile");
  const [loading, setLoading] = useState(true);

  //Uploading User Profile Picture

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const filePickerRef = useRef();
  const [uploadpic, setUploadpic] = useState(true);

  const handleImageChange = () => {};

  const handleSubmit = () => {};

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get User information
      const getUserInfo = async () => {
        const data = await getDocs(UserCollection);
        setUserInfo(data.docs.map((doc) => ({ ...doc.data() })));
        setLoading(false);
      };

      // Function Calls
      getUserInfo();
    } else {
      navigate("/SignIn");
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <UserHeader />
        <div
          style={{
            marginTop: "40px",
          }}
        >
          <div style={{ zIndex: 1, position: "relative" }}>
            <img
              style={{ borderRadius: "110px" }}
              width="200px"
              height="200px"
              src={img}
            />
          </div>
          <div>
            {uploadpic ? (
              <Button
                onClick={() => {
                  setUploadpic(false);
                }}
              >
                <EditIcon />
              </Button>
            ) : (
              <div style={{display:"flex", marginleft:"50%",marginRight:"50%", zIndex:"9999"}}>
              <input
                type="file"
                onChange={handleImageChange}
                // ref={filePickerRef}
              />
          </div>

            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
              marginTop: "-110px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 550,
                },
              }}
            >
              <Paper
                elevation={2}
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
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography style={{ marginBottom: "15px" }}>
                    {/* {userinfo.Username} */}
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
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography style={{ marginBottom: "15px" }}>
                    {/* {userinfo.Password} */}
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
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </div>
                  <Typography>{user?.email}</Typography>
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
