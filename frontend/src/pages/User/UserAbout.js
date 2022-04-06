import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function UserAbout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const UserInfoCollection = collection(db, "Applicant");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

//Upload CV
const [uploadFile, setUploadFile] = useState(true);


const HandleUpload = () => {}




  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    if (user) {
      // get forums
      const getUserInfo = async () => {
        const data = await getDocs(UserInfoCollection);
        setUserInfo(data.docs.map((doc) => ({ ...doc.data() })));
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
        {userInfo.map((userinfo) => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: "25px",
                  backgroundColor: "#fff",
                  width: "1200px",
                  padding: "15px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ padding: "10px", margin: "10px" }}>
                    <img
                      style={{ borderRadius: "110px" }}
                      width="150px"
                      height="150px"
                      src={img}
                    />
                  </div>
                  <h3>{userinfo.Name}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    JustifyContent: "center",
                    alignItems: "baseline",
                    width: "900px",
                    padding: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <h3>{userinfo.email}</h3>
                  <h3>{userinfo.Location}</h3>
                  <h3>{userinfo.About}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    marginRight: "20px",
                  }}
                >
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  {/* Upload CV */}
                  {uploadFile ? (
                    <Button size="small" variant="outlined" onClick={() => {
                      setUploadFile(false);
                    }}>
                    CV
                  </Button>
                  ) : (
                    <input type="file" onChange={HandleUpload} />
                  )}
                  
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    height: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>
                      Education
                    </h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Add
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3>{userinfo.Education}</h3>
                  </div>
                </div>
                <div
                  style={{
                    height: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>
                      Experience
                    </h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Add
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3>{userinfo.Experience}</h3>
                  </div>
                </div>
                <div
                  style={{
                    height: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>Skills</h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Add
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3>{userinfo.Skills}</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
