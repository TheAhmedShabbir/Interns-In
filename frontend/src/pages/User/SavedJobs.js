import { Button, formLabelClasses, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../../Components/User/Userheader";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const userProfile = collection(db, "UserProfile");

  const deleteSaveJob = async (key, id) => {
    const data = await getDocs(userProfile);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Role == "User");

    // const matchedJob = userProf[0].savedJob.filter((i) => i.id == id);

    const deleteSavedJob = doc(db, "UserProfile", userProf[0].id);
    const sj = userProf[0].savedJob[key];
    await updateDoc(deleteSavedJob, {
      savedJob: arrayRemove(sj),
    });

    window.location.reload(false);
  };

  const getSavedJobs = async () => {
    const data = await getDocs(userProfile);
    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const userProf = profiles.filter((i) => i.Role == "User");

    if (!userProf[0].savedJob) {
      setLoading(false);
    } else {
      setSavedJobs(userProf[0].savedJob);
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Function Calls
        getSavedJobs();
      } else {
        navigate("/SignIn");
      }
    });
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <UserHeader />
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            flexDirection: "column",
            alignItems: "center",
            width: "900px",
            minHeight: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h1>Saved Jobs</h1>
          {savedJobs.map((job, key) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                key={key}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "white",
                    padding: "15px",
                    width: "700px",
                    borderRadius: "10px",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "15px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ padding: "10px" }}>
                      XYZ added a new job for {job.Title}
                    </Typography>
                    <div>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        View Details
                      </Button>
                      <Button
                        style={{ margin: "10px" }}
                        size="small"
                        variant="outlined"
                      >
                        Apply now
                      </Button>

                      <Button
                        style={{
                          margin: "10px",
                        }}
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => deleteSaveJob(key, job.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
