import { useRef, useState } from "react";
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
import { Button } from "@material-ui/core";
// import "./Live.css";
import "./index.css";
import { db } from "../../firebase-config";
import CompanyHeader from "../../Components/Company/CompanyHeader";

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
      // className="flex items-center whitespace-nowrap bg-whitetext-black"
    >
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <Button
          variant="contained"
          type="button"
          style = {{backgroundColor : 'red'}}
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <CallIcon />
        </Button>
        <div tabIndex={0} role="button" className="more button">
          <MoreVertIcon />
          <div
            className="popover"
          >
            <Button
              variant="contained"
              type="button"
              style={{
                backgroundColor: "blue",
                color : 'white'
              }}
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
          <div className="modal" style = {{display : 'flex', flexDirection : 'column'}}>
            <h3>Your microphone and camera will automatically start</h3>
            <div
              style = {{display :'flex', flexDirection : 'row', justifyContent : 'space-evenly', margin : '10px'}}
              // color="primary"
              // className="flex gap-4 mt-8"
            >
              <Button
                type="button"
                variant="contained"
                onClick={setupSources}
                style = {{backgroundColor : 'green', color : 'white', boxShadow : '0px 0px 5px black'}}
              >
                Start
              </Button>
              <Button
                type="button"
                style = {{backgroundColor : 'red', color : 'white', boxShadow : '0px 0px 5px black'}}
                variant="contained"
                onClick={() => setPage("home")}
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
    <div>
      <CompanyHeader />
      <div
        // className="home"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: 'center',
          // gap: "10vw",
          padding: "30vh 20vw",
        }}
      >
        <div
          className="create flex flox-col items-center justify-center bg-gray-200 text-600 rounded-lg"
          // className="create box"
          style={{
            padding: "40px 20px",
            display : 'flex',
            flexDirection : 'column',
            width : '500px',
            backgroundColor: "#401F86",
            borderRadius: '10px'
          }}
        ><h4>Start Video Call</h4>
          <Button style={{ color: "white" }} onClick={() => setPage("create")}>
            Create Call
          </Button>
        </div>

        {/* <div
          className="answer flex flox-col items-center justify-center bg-gray-200 text-600 rounded-lg"
          // className="answer box"
          style={{
            padding: "40px 20px",
            backgroundColor: "#401F86",
          }}
        >
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Join with code"
          />
          <Button style={{ color: "white" }} onClick={() => setPage("join")}>
            Answer
          </Button>
        </div> */}
      </div>
    </div>
  );
}
function Live() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}

export default Live;
