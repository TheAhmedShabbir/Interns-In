import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Notifications() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const jobCollection = collection(db, "Job");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get jobs
      const getJobs = async () => {
        const data = await getDocs(jobCollection);
        setJobs(data.docs.map((doc) => ({ ...doc.data() })));
        setLoading(false);
      };

      // Function Calls
      getJobs();
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
      <div style={{ backgroundColor: "#f3f2ef", fontFamily: "ubuntu" }}>
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
          <h1>Notifications</h1>
          {jobs.map((job, key) => {
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
                    flexDirection: "column",
                    backgroundColor: "white",
                    padding: "15px",
                    width: "650px",
                    borderRadius: "10px",
                    margin: "10px",
                    boxShadow: "0 0 10px #ccc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ marginLeft: "20px" }}>
                      <img width="120px" height="120px" src={img} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "15px",
                        marginTop: "10px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography style={{ padding: "10px" }}>
                        <span style={{ fontSize: "18px" }}>
                          <b>{job.postedby}</b>
                        </span>{" "}
                        posted a new job for{" "}
                        <span style={{ fontSize: "18px" }}>
                          <b>{job.Title}</b>
                        </span>{" "}
                      </Typography>
                    </div>
                  </div>
                  <div style={{ marginTop: "-20px" }}>
                    <Button
                      style={{ margin: "10px" }}
                      size="small"
                      variant="outlined"
                      color="success"
                    >
                      Apply now
                    </Button>
                    <Button
                      style={{ margin: "10px" }}
                      size="small"
                      variant="outlined"
                    >
                      View Details
                    </Button>
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
