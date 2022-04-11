import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AdminHeader from "../../Components/Admin/Adminheader";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  let [companies, setCompanies] = useState([]);
  let [jobsPosted, setJobsPosted] = useState([]);
  let [usersRegistered, setUsersRegistered] = useState([]);
  const [loading, setLoading] = useState(true);

  const userProfile = collection(db, "UserProfile");
  const jobs = collection(db, "Job");

  const getData = async () => {
    const data = await getDocs(userProfile);
    const d = await getDocs(jobs);

    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const job = d.docs.map((doc) => ({ ...doc.data() }));

    const companies = profiles.filter((i) => i.Role == "Company");
    const users = profiles.filter((i) => i.Role == "User");

    setJobsPosted(job);
    setCompanies(companies);
    setUsersRegistered(users);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email == "ahmed.shabbir1308@gmail.com") {
        setLoading(false);
      } else {
        navigate("/SignIn");
      }
    });
    getData();
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <AdminHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: "60px",
            margin: "10px",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Pending Approvals</h2>
            <Typography>125</Typography>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Jobs Posted</h2>
            <Typography>{jobsPosted.length}</Typography>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Users Registered</h2>
            <p>{usersRegistered.length}</p>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Companies registered</h2>
            <Typography>{companies.length}</Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            padding: "50px",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              height: "400px",
              width: "500px",
              margin: "10px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Users Joining</h2>
          </div>
          <div
            style={{
              borderRadius: "10px",
              height: "400px",
              width: "500px",
              margin: "10px",
              backgroundColor: "#fff",
              border: "2px solid blue",
            }}
          >
            <h2>Companies Joining</h2>
          </div>
        </div>
      </div>
    );
  }
}
