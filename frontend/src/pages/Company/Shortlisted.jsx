import { Button, Typography, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MuiAlert from "@mui/material/Alert";
import VideocamIcon from "@mui/icons-material/Videocam";
import { forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TestModal from "../../Components/Company/TestModal";
import CallModal from "../../Components/Company/CallModal";
import VideoCallIcon from '@mui/icons-material/VideoCall';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Shortlisted() {
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [warningOpen, setWarningOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleWarningClick = () => {
    setWarningOpen(true);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  // Send call code
  const [Copen, setCOpen] = React.useState(false);
  const handleCOpen = () => setCOpen(true);
  const handleCClose = () => setCOpen(false);

  const [Company, setCompany] = useState("");
  const [U_ID, setU_ID] = useState("");




  const userCollection = collection(db, "UserProfile");
  const shortlistCollectionRef = collection(
    db,
    `UserProfile/${userInfo?.id}/shortlisted`
  );

  const getShortlisted = async () => {
    const data = await getDocs(shortlistCollectionRef);
    const shortlisted = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setApplicants(shortlisted);
    // console.log(applicants);
    setLoading(false);
  };

  const hireApplicant = async (id) => {
    const data = await getDocs(shortlistCollectionRef);
    const shortlisted = data.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const shortlistedFilter = shortlisted.filter((i) => i.id == id);

    const employeesCollectionRef = collection(
      db,
      `UserProfile/${userInfo?.id}/employees`
    );
    const employeesData = await getDocs(employeesCollectionRef);
    const employeesProfiles = employeesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const employeeFilter = employeesProfiles.filter(
      (i) => i.applicantid == shortlistedFilter[0]?.applicantid
    );

    if (employeeFilter[0]?.applicantid == shortlistedFilter[0]?.applicantid) {
      handleWarningClick();
      setLoading(false);
    } else {
      const h = await addDoc(
        collection(db, `UserProfile/${userInfo?.id}/employees`),
        {
          applicantEmail: shortlistedFilter[0]?.applicantEmail,
          employeename: shortlistedFilter[0]?.firstname,
          lastname: shortlistedFilter[0]?.lastname,
          pfp: shortlistedFilter[0]?.pfp,
          resume: shortlistedFilter[0]?.resume,
          bio: shortlistedFilter[0]?.bio,
          address: shortlistedFilter[0]?.address,
          about: shortlistedFilter[0]?.about,
          city: shortlistedFilter[0]?.city,
          province: shortlistedFilter[0]?.province,
          applicantid: shortlistedFilter[0]?.applicantid,
        }
      );
      handleSuccessClick();
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    setUserInfo(userData[0]);

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getUserInfo();
        getShortlisted();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user, userInfo?.id]);

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
        }}
      >
        <CompanyHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "900px",
            maxWidth: "1400px",
            minHeight: "100vh",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h1 style={{ marginTop: "80px" }}>Shortlisted</h1>
          <Button
            sx={{ marginLeft: "auto", marginTop: "-7vh", marginRight: "10px" }}
            variant="outlined"
            startIcon={<AssignmentIcon />}
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/1BbUH4ZVEcVnH5n7jufLQv6MtPhZoLdml7fd4s6XZP9c/edit"
              )
            }
          >
            Make Online Test
          </Button>
          <Button sx={{ marginLeft: "auto", marginTop: "2vh", marginRight: "10px"}}
          variant="outlined"
          startIcon={<VideoCallIcon />}
          ><a href = "/Live" target = "_blank" style = {{textDecoration : 'none'}}>
            Start online Call</a></Button>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
            }}
          >
            {applicants?.map((a, key) => {
              if (applicants?.length == 0) {
                <div></div>;
              } else {
                return (
                  <div style={{ margin: "20px" }} key={key}>
                    <div
                      style={{
                        zIndex: 1,
                        position: "relative",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "110px",
                          boxShadow: "0 0 10px #ccc",
                        }}
                        width="140px"
                        height="140px"
                        src={a?.pfp}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "-80px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          "& > :not(style)": {
                            m: 1,
                            width: 300,
                            minHeight: "35vh",
                          },
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            boxShadow: "0 0 10px #ccc",
                          }}
                        >
                          <div style={{ marginTop: "70px", padding: "10px" }}>
                            <h3>
                              <b>{a?.firstname + " " + a?.lastname}</b>
                            </h3>
                            <p>{a?.bio}</p>
                            <div style={{ marginTop: "70px" }}>
                              {/* <Button
                                style={{ margin: "10px" }}
                                size="small"
                                variant="outlined"
                                color="success"
                                startIcon={<VideocamIcon />}
                              >
                                Interview
                              </Button> */}
                              <Button
                                style={{ margin: "10px" }}
                                size="small"
                                variant="outlined"
                                startIcon={<SendIcon />}
                                onClick={() => openModal()}
                              >
                                Send Test
                              </Button>
                              <Button
                                style={{ margin: "10px" }}
                                size="small"
                                variant="outlined"
                                startIcon={<SendIcon />}
                                onClick={() => {handleCOpen(), setCompany(userInfo?.id), setU_ID(a?.id)}}
                              >
                                Call 
                              </Button>
                              <Button
                                style={{ margin: "10px" }}
                                size="small"
                                color="success"
                                variant="outlined"
                                onClick={() => hireApplicant(a.id)}
                                startIcon={<PersonAddAlt1Icon />}
                              >
                                Hire
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </div>

                    <TestModal
                      open={open}
                      close={closeModal}
                      email={a?.applicantEmail}
                    ></TestModal>
                    <CallModal
                    open = {Copen}
                    close = {handleCClose}
                    id = {U_ID}
                    CmpID = {Company}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <Snackbar
          open={warningOpen}
          autoHideDuration={2000}
          onClose={handleWarningClose}
        >
          <Alert
            onClose={handleWarningClose}
            sx={{ width: "100%" }}
            severity="warning"
          >
            You have already Hired this Applicant!
          </Alert>
        </Snackbar>

        <Snackbar
          open={successOpen}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
        >
          <Alert
            onClose={handleSuccessClose}
            sx={{ width: "100%" }}
            severity="success"
          >
            Applicant Hired!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
