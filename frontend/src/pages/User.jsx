import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { db, auth, storage } from "../firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import CompanyHeader from "../Components/Company/CompanyHeader";

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

export default function User() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const url = window.location.pathname.split("/");

  // Database variable
  const EduCollection = collection(db, "UserEducation");
  const userCollection = collection(db, "UserProfile");

  // Education Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get / post User Education------------------------------------------------------------------------------------------------------

  const [UserEducation, setUserEducation] = useState([]);

  // / Get User ID
  //   const getUser = async () => {
  //     const data = await getDocs(UserInfoCollection);
  //     const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const userProf = profiles.filter((i) => i.Email == user?.email);
  //     setUserProfile(userProf[0]);
  //     setLoading(false);
  //   };

  // get employee profile
  const getProfile = async () => {
    const data = await getDocs(userCollection);
    const profile = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profile.filter((i) => i.id == url[2]);
    setProfile(userProf[0]);
    setLoading(false);
  };

  // Get User Education From Firestore database
  const getEducation = async () => {
    const data = await getDocs(EduCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.User_Email == user?.email);
    setUserEducation(userProf);
    setLoading(false);
  };

  //Get / Post User Experience---------------------------------------------

  const [UserExperience, setUserExperience] = useState([]);

  // Database variable
  const ExpCollection = collection(db, "UserExperience");

  // Get User Eperience From Firestore database

  const getExperience = async () => {
    const data = await getDocs(ExpCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.User_Email == user?.email);
    setUserExperience(userProf);
    // console.log(UserEdxperience)
    setLoading(false);
  };

  //Get / Post User Skills-------------------------------------------------

  const [UserSkills, setUserSkills] = useState([]);
  const SkillCollection = collection(db, "UserSkills");

  //Get User skills From Firestore database

  const getSkills = async () => {
    const data = await getDocs(SkillCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.User_Email == user?.email);
    setUserSkills(userProf);
    setLoading(false);
  };

  // Skills Modal
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  //Upload CV---------------------------------------------------------------------

  // CV Modal
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

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
    // }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user) {
      // Function Calls
      getProfile();
      getEducation();
      getExperience();
      getSkills();
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
        <CompanyHeader />
        <div style={{ minHeight: "100vh", paddingTop: "80px" }}>
          <img
            style={{
              borderRadius: "110px",
              boxShadow: "0 0 10px #ccc",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
              zIndex: 100,
              position: "relative",
            }}
            width="150px"
            height="150px"
            src={profile?.Pfp}
          ></img>
          <div
            style={{
              backgroundColor: "#fff",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "-70px",
              borderRadius: "8px",
              boxShadow: "0 0 10px #ccc",
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              // alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <Button
                style={{ marginLeft: "auto", marginRight: "10px" }}
                variant="outlined"
                onClick={() => handleOpen3()}
              >
                CV
              </Button>
            </div>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                width: "70%",
              }}
            >
              <h2>{profile?.FirstName + " " + profile?.LastName}</h2>
              <Typography style={{ marginTop: "-15px", fontSize: "14px" }}>
                {profile?.bio}
              </Typography>
              <Typography style={{ fontSize: "14px", margin: "5px" }}>
                {profile?.address +
                  ", " +
                  profile?.city +
                  ", " +
                  profile?.province}
              </Typography>

              <Typography style={{ fontSize: "15px", margin: "5px" }}>
                {profile?.about}
              </Typography>
            </div>
          </div>
          <h2 style={{ marginTop: "40px" }}>Education</h2>
          <div
            style={{
              backgroundColor: "#fff",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "8px",
              boxShadow: "0 0 10px #ccc",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
              <div style={{ margin: "10px", marginBottom: "20px" }}>
                {UserEducation.map((item, key) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={key}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          marginLeft: "20px",
                        }}
                      >
                        <h3>{item.Institute_name}</h3>
                        <Typography
                          style={{ marginTop: "-15px" }}
                          fontSize="14px"
                        >
                          {item.Degree_Name}
                        </Typography>
                        <Typography>{item.Duration}</Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h2 style={{ marginTop: "40px" }}>Experience</h2>
          <div
            style={{
              backgroundColor: "#fff",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "8px",
              boxShadow: "0 0 10px #ccc",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
              <div style={{ margin: "10px", marginBottom: "20px" }}>
                {UserExperience.map((item, key) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={key}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          marginLeft: "20px",
                        }}
                      >
                        <h3>{item.Company_Name}</h3>
                        <Typography
                          style={{ marginTop: "-15px" }}
                          fontSize="14px"
                        >
                          {item.Position}
                        </Typography>
                        <Typography>{item.Duration}</Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
