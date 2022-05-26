import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Shortlisted() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const shortlistedCollection = collection(db, "Shortlisted");
  const userCollection = collection(db, "UserProfile");
  const [applicants, setApplicants] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // const getJobs = async () => {
  //   const data = await getDocs(jobCollection);
  //   const j = data.docs.map((doc) => ({ ...doc.data() }));

  //   const applicant = j.map((a) => a.Applicants);
  //   setJobs(applicant);

  //   const d = await getDocs(userCollection);
  //   const app = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  //   const applicantProfile = applicant.filter((a) => a.Applicants == app.Email);
  //   const prof = app.filter((p) => p.Email == applicantProfile);

  //   if (applicantProfile == app) {
  //     // console.log(app);
  //   }
  //   console.log(prof);
  //   // setApplicants(userData);

  //   setLoading(false);
  // };

  const getShortlisted = async () => {
    const data = await getDocs(shortlistedCollection);
    const s = data.docs.map((doc) => ({ ...doc.data() }));

    const d = await getDocs(userCollection);
    const profiles = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const user = profiles.filter((p) => p.Role == "User");

    const userData = user.filter((u) => u[0]?.id == s.id);
    setApplicants(userData);
    // console.log(userData);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      // get jobs
      // getJobs();
      getShortlisted();
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
          <h1>Shortlisted</h1>
          {applicants.map((a, key) => {
            if (a.length == 0) {
              <div></div>;
            } else {
              return (
                <div key={key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px",
                      padding: "10px",
                      backgroundColor: "white",
                      minWidth: "500px",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <img width="80px" height="80px" src={img} />
                      </div>
                      <p style={{ marginLeft: "15px" }}>
                        {a?.FirstName + " " + a?.LastName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
