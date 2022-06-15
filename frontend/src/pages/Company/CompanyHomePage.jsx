import React, { useState, useEffect, useRef } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import { Button, TextField, Typography } from "@mui/material";
import img from "../../assets/images/Userpfp.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import { db, auth } from "../../firebase-config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormEdit from "../../Components/Company/FormEdit";
import ViewApplicants from "../../Components/Company/ViewApplicants";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import "./index.css";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//video call code----------------------------------------------------------------------------------------------------------------------------------------------

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Videos({ mode, callId, setPage }) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef();
  const remoteRef = useRef();

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      const roomRef = doc(db, "calls", roomId);
      await getDocs(collection(roomRef, "answerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((d) => {
            deleteDoc(d.ref);
          });
        }
      );

      await getDocs(collection(roomRef, "offerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((d) => {
            deleteDoc(d.ref);
          });
        }
      );

      await deleteDoc(roomRef);
    }

    window.location.reload();
  };

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === "create") {
      const callDoc = doc(collection(db, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      setRoomId(callDoc.id);
      // console.log()

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else if (mode === "join") {
      const callDoc = doc(db, "calls", callId);
      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      const callData = (await getDoc(callDoc)).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  return (
    <div
      className="videos"
      // style = {{display : 'flex', backgroundColor: 'white', height :'100%'}}
      // className="flex items-center whitespace-nowrap bg-whitetext-black"
    >
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          type="button"
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <CallIcon />
        </Button>
        <div
          style={{ backgroundColor: "#2563eb" }}
          tabIndex={0}
          role="button"
          className="more button"
        >
          <MoreVertIcon />
          <div className="popover">
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                console.log(roomId);
              }}
            >
              <ContentCopyIcon />
              Copy joining code
            </Button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div
            className="modal"
            style={{ display: "flex", flexDirection: "column", color: "black" }}
          >
            <h3>By pressing start your camera and microphone will turn on</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                margin: "25px",
              }}
              // className="container"
              color="primary"
              // className="flex gap-4 mt-8"
            >
              <Button
                type="button"
                variant="contained"
                onClick={setupSources}
                style={{ backgroundColor: "green" }}
                // fullWidth
              >
                Start
              </Button>

              <Button
                type="button"
                // fullWidth
                variant="contained"
                onClick={() => setPage("home")}
                style={{ backgroundColor: "red" }}
                // className="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <div
    // className="create flex flox-col items-center justify-center bg-gray-200 text-600 rounded-lg"
    // className="create box"
    >
      <Button style={{ color: "white" }} onClick={() => setPage("create")}>
        Create Call
      </Button>
    </div>
  );
}
//=========================================================================================================================================

export default function CompanyHomePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [pending, setPending] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [applicantOpen, setApplicantOpen] = useState(false);
  let [editJob, setEditJob] = useState([]);
  let [appJob, setAppJob] = useState([]);

  const [warningOpen, setWarningOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const jobCollection = collection(db, "Job");
  const userCollection = collection(db, "UserProfile");

  //VideoCall
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  const handleWarningClick = () => {
    setWarningOpen(true);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeleteOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const openApplicantModal = async (id) => {
    const applicantsReference = collection(db, `Job/${id}/applicants`);
    const applicantsData = await getDocs(applicantsReference);
    const applicants = applicantsData.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(applicants);

    if (applicants.length == 0) {
      setApplicantOpen(false);
      handleWarningClick();
    } else {
      setAppJob(applicants);
      setApplicantOpen(true);
    }
  };

  const closeApplicantModal = () => {
    setApplicantOpen(false);
  };

  const updateJob = async (id) => {
    setEditJob(jobs[id]);
    openModal();
  };

  const deleteJob = async (id) => {
    const jobDoc = doc(db, "Job", jobs[id].id);
    await deleteDoc(jobDoc);

    getJobs();
  };

  // const getEmployees = async () => {};

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const job = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const jobFilter = job.filter((i) => i.company == user?.email);

    setJobs(jobFilter);

    setLoading(false);
  };

  const getUserInfo = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    const shortlistCollectionRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/shortlisted`
    );
    const d = await getDocs(shortlistCollectionRef);
    const shortlisted = d.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const employeesCollectionRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/employees`
    );
    const employeesData = await getDocs(employeesCollectionRef);
    const employeesProfiles = employeesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setEmployees(employeesProfiles);
    setPending(shortlisted);
    setUserInfo(userData[0]);

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // get user info
        getUserInfo();

        // Function Calls
        getJobs();
      }
    });
  }, [user, open]);

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
            flexDirection: "row",
            marginTop: "40px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                width: "280px",
                marginTop: "40px",
                borderRadius: "8px",
                marginBottom: "5px",
                boxShadow: "0 0 10px #ccc",
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <img
                  style={{
                    borderRadius: "110px",
                    marginTop: "-75px",
                    boxShadow: "0 0 10px #ccc",
                  }}
                  width="150px"
                  height="150px"
                  src={img}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3>{UserInfo?.CompanyName}</h3>
                <Typography>{UserInfo?.bio}</Typography>
              </div>
            </div>
            <div
              style={{
                padding: "15px",
                margin: "5px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                width: "280px",
                color: "white",
                backgroundColor: "#2563eb",
                minHeight: "150px",
                boxShadow: "0 0 10px #ccc",
              }}
            >
              <h4>Video Conference</h4>
              <div className="app">
                {currentPage === "home" ? (
                  <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                  />
                ) : (
                  <Videos
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                flexWrap: "wrap",
                alignContent: "flex-start",
                padding: "20px",
                margin: "10px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  borderRadius: "8px",
                  padding: "15px",
                  border: "2px solid #2563eb",
                  margin: "10px",
                  width: "200px",
                  boxShadow: "0 0 10px #ccc",
                  minHeight: "137px",
                }}
              >
                <h2>Post a Job</h2>
                <Button href="/postjob" size="small" variant="contained">
                  <AddIcon></AddIcon>
                </Button>
              </div>
              <div
                style={{
                  borderRadius: "8px",
                  padding: "15px",
                  boxShadow: "0 0 10px #ccc",
                  border: "2px solid #2563eb",
                  margin: "10px",
                  width: "200px",
                  minHeight: "137px",
                }}
              >
                <h2>Jobs Posted</h2>
                <Typography>{jobs?.length}</Typography>
              </div>
              <div
                style={{
                  borderRadius: "8px",
                  padding: "15px",
                  border: "2px solid #2563eb",
                  boxShadow: "0 0 10px #ccc",
                  margin: "10px",
                  width: "200px",
                  minHeight: "137px",
                }}
              >
                <h2 style={{ margin: "10px" }}>Pending Interviews</h2>
                <Typography style={{ marginTop: "5px" }}>
                  {pending?.length}
                </Typography>
              </div>
              <div
                style={{
                  borderRadius: "8px",
                  border: "2px solid #2563eb",
                  padding: "15px",
                  boxShadow: "0 0 10px #ccc",
                  margin: "10px",
                  width: "200px",
                  minHeight: "137px",
                }}
              >
                <h2>Employees</h2>
                <Typography>{employees?.length}</Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Posts</h2>

              {jobs.map((job, key) => {
                return (
                  <div
                    style={{
                      minWidth: "700px",
                      maxWidth: "700px",
                      backgroundColor: "white",
                      padding: "20px",
                      margin: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 0 10px #ccc",
                    }}
                    key={key}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 style={{ marginLeft: "20px" }}>
                        {job.Title},{" "}
                        <span style={{ color: "green" }}>{job.Salary}pkr</span>
                      </h2>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LocationOnOutlinedIcon color="primary" />
                        <h4>{job.City}</h4>
                      </div>
                    </div>
                    <Typography
                      sx={{
                        display: "flex",
                        marginLeft: "20px",
                        fontSize: "small",
                      }}
                    >
                      {job.Description}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{
                        display: "flex",
                        marginLeft: "23px",
                        fontSize: "small",
                      }}
                    >
                      {job.Type} {"— "}
                      {job.Mode}
                    </Typography>
                    <div>
                      <h2 style={{ color: "green" }}> {job.Salary} pkr</h2>
                      <Button
                        style={{ margin: "10px" }}
                        variant="contained"
                        onClick={() => openApplicantModal(job.id)}
                      >
                        View Applicants
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        variant="outlined"
                        color="warning"
                        onClick={() => updateJob(key)}
                      >
                        <EditIcon></EditIcon>
                      </Button>
                      <Button
                        style={{
                          margin: "10px",
                        }}
                        variant="outlined"
                        color="error"
                        onClick={() => deleteJob(key).then(handleDeleteClick())}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FormEdit
            id={editJob.id}
            key={editJob.id}
            open={open}
            close={closeModal}
            title={editJob.Title}
            description={editJob.Description}
            city={editJob.City}
            salary={editJob.Salary}
            type={editJob.Type}
            mode={editJob.Mode}
          />
          <ViewApplicants
            open={applicantOpen}
            close={closeApplicantModal}
            applicant={appJob}
            companyId={UserInfo?.id}
          />

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
              No Applicants
            </Alert>
          </Snackbar>

          <Snackbar
            open={deleteOpen}
            autoHideDuration={2000}
            onClose={handleDeleteClose}
          >
            <Alert
              onClose={handleDeleteClose}
              sx={{ width: "100%" }}
              severity="error"
            >
              Job Deleted!
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}
