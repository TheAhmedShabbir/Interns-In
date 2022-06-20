import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import { db, auth } from "../../firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { storage } from "../../firebase-config";
import { ref, uploadBytesResumable } from "firebase/storage";
import EduEdit from "../../Components/User/EducatinModal";
import ExpEdit from "../../Components/User/ExperienceModal";
import { getDownloadURL } from "firebase/storage";
import AbtEdit from "../../Components/User/EditAbout";

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

export default function UserAbout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Education Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get / post User Education------------------------------------------------------------------------------------------------------

  const [UserEducation, setUserEducation] = useState([]);
  const [Degree, setDegree] = useState("");
  const [Institute, setInstitute] = useState("");
  const [Status, setStatus] = useState("");
  const [Duration, setDuration] = useState("");

  // / Get User ID
  const getUser = async () => {
    const data = await getDocs(UserInfoCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Email == user?.email);
    setUserProfile(userProf[0]);
    setLoading(false);
  };

  // Database variable
  const EduCollection = collection(db, "UserEducation");
  const UserInfoCollection = collection(db, "UserProfile");

  // Get User Education From Firestore database
  const getEducation = async () => {
    const data = await getDocs(EduCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.User_Email == user?.email);
    setUserEducation(userProf);
    setLoading(false);
  };

  // Post User Education into Firestore database
  const postEducation = async () => {
    await addDoc(EduCollection, {
      Degree_Name: Degree,
      Institute_name: Institute,
      Status: Status,
      Duration: Duration,
      User_Email: user?.email,
    });
  };

  //Update User Education

  let [editEducation, setEditEducation] = useState([]);

  const updateEdu = async (id) => {
    setEditEducation(UserEducation[id]);
    handleOpen4();
  };

  // Update Education modal
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  // Delete User  Education

  const deleteEdu = async (id) => {
    const EduCollection = doc(db, "UserEducation", UserEducation[id].id);
    await deleteDoc(EduCollection);
  };

  //Get / Post User Experience----------------------------------------------------------------------------------------------

  const [UserExperience, setUserExperience] = useState([]);
  const [Company, setCompany] = useState("");
  const [Position, setPosition] = useState("");
  const [Certified, setCertified] = useState("");
  const [Duration2, setDuration2] = useState("");

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

  // Experience Modal
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  //Post User Experience into Firestore database
  const postExp = async () => {
    await addDoc(ExpCollection, {
      Company_Name: Company,
      Position: Position,
      Duration: Duration2,
      Certified: Certified,
      User_Email: user?.email,
    });
  };

  // Edit User Experience

  let [editExperience, setEditExperience] = useState([]);

  const updateExp = async (id) => {
    setEditExperience(UserExperience[id]);
    handleOpen5();
  };

  // Update Experience modal
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  // Delete User  Experience

  const deleteExp = async (id) => {
    const ExpCollection = doc(db, "UserExperience", UserExperience[id].id);
    await deleteDoc(ExpCollection);
  };

  //Get / Post User Skills-----------------------------------------------------------------------------------------------------

  const [UserSkills, setUserSkills] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [skill4, setSkill4] = useState("");
  const [skill5, setSkill5] = useState("");
  const [skill6, setSkill6] = useState("");
  const SkillCollection = collection(db, "UserSkills");

  //Get User skills From Firestore database

  const getSkills = async () => {
    const data = await getDocs(SkillCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.User_Email == user?.email);
    console.log(userProf);
    setUserSkills(userProf);
    setLoading(false);
  };
  // post skills
  const postskill = async () => {
    await addDoc(SkillCollection, {
      Skill1: skill1,
      Skill2: skill2,
      Skill3: skill3,
      Skill4: skill4,
      Skill5: skill5,
      Skill6: skill6,
      User_ID: user?.email,
    });
  };

  // Skills Modal
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  //Post User skills into Firestore database
  // const postSkills = async (id) => {
  //   await addDoc(UserInfoCollection, { Skills: Skills, id: id });
  // };

  //Upload CV-----------------------------------------------------------------------------------------------------------

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

  // Update CV
  const updateCV = async () => {
    const updatedDoc = doc(db, "UserProfile", userProfile?.id);
    await updateDoc(updatedDoc, {
      cv: Url,
    });
  };

  //About edit modal
  const [open6, setOpen6] = useState(false);
  const handleOpen6 = () => setOpen6(true);
  const handleClose6 = () => setOpen6(false);
  let [editAbout, setEditAbout] = useState([]);

  const updateAbt = async () => {
    setEditAbout(userProfile);
    handleOpen6();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user) {
      // Function Calls
      getUser();
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
        <UserHeader />
        <div style={{ minHeight: "100vh", marginTop: "50px" }}>
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
            src={userProfile?.Pfp}
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
              <Button
                variant="outlined"
                onClick={updateAbt}
                startIcon={<EditIcon />}
              >
                Edit
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
              <h2>{userProfile?.FirstName + " " + userProfile?.LastName}</h2>
              <Typography style={{ marginTop: "-15px", fontSize: "14px" }}>
                {userProfile?.bio}
              </Typography>
              <Typography style={{ fontSize: "14px", margin: "5px" }}>
                {userProfile?.address +
                  ", " +
                  userProfile?.city +
                  ", " +
                  userProfile?.province}
              </Typography>

              <Typography style={{ fontSize: "15px", margin: "5px" }}>
                {userProfile?.about}
              </Typography>
            </div>
          </div>
        </div>
        <Modal open={open3} onClose={handleClose3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <h2>Upload / Download files</h2>
            <form onSubmit={formHandler}>
              <input type="file" onChange={HandleUpload} />
              <Button type="submit" onClick={updateCV}>
                upload
              </Button>

              <Button onClick={handleClose3}>Close</Button>
              <h3>uploaded{progress}%</h3>
            </form>
          </Box>
        </Modal>
        <AbtEdit
          id={editAbout.id}
          // key={editAbout.id}
          open={open6}
          close={handleClose6}
          address={editAbout.Address}
          city={editAbout.City}
          province={editAbout.Province}
          main={editAbout.Main}
          about={editAbout.About}
        />
        ;
      </div>
    );
  }
}

// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: "10px",
//   }}
// >
//   <div
//     style={{
//       // minHeight: "300px",
//       width: "1200px",
//       borderRadius: "10px",
//       backgroundColor: "#fff",
//       margin: "10px",
//       padding: "15px",
//       backgroundColor: "white",
//       boxShadow: "0 0 10px #ccc",
//     }}
//   >
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignContent: "flex-start",
//         alignItems: "center",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//         backgroundColor: "white",
//       }}
//     >
//       <h2 style={{ margin: "10px", padding: "10px" }}>Education</h2>
//       <div style={{ padding: "10px", margin: "10px" }}>
//         <Button style={{ margin: "10px" }} onClick={handleOpen}>
//           <AddCircleOutlineIcon />
//         </Button>
//       </div>
//     </div>
//     <div>
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <h2>Add Education</h2>
//           <TextField
//             fullWidth
//             label="Degree Title"
//             onChange={(event) => {
//               setDegree(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Institute Name"
//             onChange={(event) => {
//               setInstitute(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Duration"
//             onChange={(event) => {
//               setDuration(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Status"
//             onChange={(event) => {
//               setStatus(event.target.value);
//             }}
//           />
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={() => postEducation(userProfile[0].id)}>
//             Add
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//     {/* Education Block */}
//     {UserEducation &&
//       UserEducation.map((item, key) => {
//         return (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               border: "2px solid #548CCB",
//               borderRadius: "15px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flex: "1.90",
//                 flexDirection: "column",
//                 justifyContent: "space-evenly",
//                 alignItems: "start",
//                 margin: "25px",
//                 paddingLeft: "25px",
//                 backgroundColor: "white",
//               }}
//               key={key}
//             >
//               <h3>Degree Name :{item.Degree_Name}</h3>
//               <h3>Institution Name : {item.Institute_name}</h3>
//               <h3>Status : {item.Status}</h3>
//               <h3>Duration : {item.Duration}</h3>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flex: "0.10",
//                 flexDirection: "column",
//                 margin: "25px",
//                 paddingLeft: "25px",
//                 backgroundColor: "white",
//               }}
//             >
//               <Button onClick={() => updateEdu(key)}>
//                 <EditIcon />
//               </Button>
//               <Button
//                 onClick={() => {
//                   deleteEdu(key);
//                 }}
//               >
//                 <DeleteIcon />
//               </Button>
//             </div>
//           </div>
//         );
//       })}
//     <EduEdit
//       id={editEducation.id}
//       key={editEducation.id}
//       open={open4}
//       close={handleClose4}
//       degree={editEducation.Degree_Name}
//       Institute={editEducation.Institute_name}
//       duration={editEducation.Duration}
//       status={editEducation.Status}
//     />
//   </div>

//   <div
//     style={{
//       // height: "300px",
//       width: "1200px",
//       borderRadius: "10px",
//       backgroundColor: "#fff",
//       margin: "10px",
//       padding: "15px",
//       backgroundColor: "white",
//       boxShadow: "0 0 10px #ccc",
//     }}
//   >
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignContent: "flex-start",
//         alignItems: "center",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//         backgroundColor: "white",
//       }}
//     >
//       <h2 style={{ margin: "10px", padding: "10px" }}>Experience</h2>
//       <div style={{ padding: "10px", margin: "10px" }}>
//         <Button style={{ margin: "10px" }} onClick={handleOpen1}>
//           <AddCircleOutlineIcon />
//         </Button>
//       </div>
//     </div>
//     <div>
//       <Modal
//         open={open1}
//         onClose={handleClose1}
//         // aria-labelledby="modal-modal-title"
//         // aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {/* <Form> */}
//           <h2>Add Experience</h2>
//           <TextField
//             fullWidth
//             label="Company Name"
//             onChange={(event) => {
//               setCompany(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Position"
//             onChange={(event) => {
//               setPosition(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Duration"
//             onChange={(event) => {
//               setDuration2(event.target.value);
//             }}
//           />
//           <TextField
//             fullWidth
//             label="Certified"
//             onChange={(event) => {
//               setCertified(event.target.value);
//             }}
//           />

//           <Button onClick={handleClose1}>Cancel</Button>
//           <Button onClick={postExp}>Add</Button>
//           {/* </Form> */}
//         </Box>
//       </Modal>
//     </div>

//     {/*User Eperience Block*/}
//     {UserExperience &&
//       UserExperience.map((item, key) => {
//         return (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               border: "2px solid #548CCB",
//               borderRadius: "15px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flex: "1.90",
//                 flexDirection: "column",
//                 justifyContent: "space-evenly",
//                 alignItems: "start",
//                 margin: "25px",
//                 paddingLeft: "25px",

//                 backgroundColor: "white",
//               }}
//               key={key}
//             >
//               <h3>Company Name :{item.Company_Name}</h3>
//               <h3>Position Name : {item.Position}</h3>
//               <h3>Duration : {item.Duration}</h3>
//               <h3>Certified : {item.Certified}</h3>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flex: "0.10",
//                 flexDirection: "column",
//                 // justifyContent : ''
//                 // // alignItems : 'start',
//                 margin: "25px",
//                 paddingLeft: "25px",

//                 backgroundColor: "white",
//               }}
//             >
//               <Button onClick={() => updateExp(key)}>
//                 <EditIcon />
//               </Button>
//               <Button onClick={() => deleteExp(key)}>
//                 <DeleteIcon />
//               </Button>
//             </div>
//           </div>
//         );
//       })}
//     <ExpEdit
//       id={editExperience.id}
//       key={editExperience.id}
//       open={open5}
//       close={handleClose5}
//       company={editExperience.Company_Name}
//       position={editExperience.Position}
//       duration={editExperience.Duration}
//       certified={editExperience.Certified}
//     />
//   </div>
// </div>
