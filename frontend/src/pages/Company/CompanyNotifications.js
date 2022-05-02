import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <CompanyHeader />
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
          {jobs.map((job) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
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
                  <div>
                    <img width="150px" height="150px" src={img} />
                  </div>
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
