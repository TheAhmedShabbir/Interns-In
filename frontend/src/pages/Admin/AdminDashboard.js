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
  const [loading, setLoading] = useState(true);

  const verifyUser = () => {
    if (user == null) {
      setLoading(true);
    } else {
      if (user?.email == "ahmed.shabbir1308@gmail.com") {
        setLoading(false);
      } else {
        history.back();
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user == null) {
      setLoading(true);
    } else {
      verifyUser();
    }
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
            padding: "50px",
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
            <h2>Users Registered</h2>
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
            <h2>Companies registered</h2>
            <Typography>125</Typography>
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
