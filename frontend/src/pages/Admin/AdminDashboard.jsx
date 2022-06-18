import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AdminHeader from "../../Components/Admin/Adminheader";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

export default function AdminDashboard() {
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);
  let [companies, setCompanies] = useState([]);
  let [jobsPosted, setJobsPosted] = useState([]);
  let [usersRegistered, setUsersRegistered] = useState([]);
  let [companiesApplied, setCompaniesApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  const userProfile = collection(db, "UserProfile");
  const PendingCompanies = collection(db, "PendingApprovals");
  const jobs = collection(db, "Job");

  const getData = async () => {
    const data = await getDocs(userProfile);
    const d = await getDocs(jobs);
    const e = await getDocs(PendingCompanies);

    const profiles = data.docs.map((doc) => ({ ...doc.data() }));
    const job = d.docs.map((doc) => ({ ...doc.data() }));
    const pending = e.docs.map((doc) => ({ ...doc.data() }));

    const companies = profiles.filter((i) => i.Role == "Company");
    const users = profiles.filter((i) => i.Role == "User");
    const approvals = pending.filter((i) => i.Status == "Pending");

    setCompaniesApplied(approvals);
    setJobsPosted(job);
    setCompanies(companies);
    setUsersRegistered(users);
    setLoading(false);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Users Joining",
        data: labels.map(() => usersRegistered?.length),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
      },
      {
        label: "Companies Joining",
        data: labels.map(() => companies?.length),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgb(255, 205, 86)",
      },
    ],
  };

  const d = {
    labels: ["Companies", "Users", "Jobs"],
    datasets: [
      {
        data: [companies?.length, usersRegistered?.length, jobsPosted?.length],
        backgroundColor: ["rgb(255, 205, 86)", "#22c55e", "#c084fc"],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email == "ahmed.shabbir1308@gmail.com") {
        // setLoading(false);
      } else {
        navigate("/" + localStorage.getItem("page"));
        // setLoading(false);
      }
    });
    getData();
  }, [user]);

  if (loading) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
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
        <AdminHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-evenly",
            padding: "10px",
            marginTop: "60px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#ef4444",
              margin: "10px",
              boxShadow: "0 0 10px #ccc",
              width: "280px",
              color: "white",
            }}
          >
            <Typography
              sx={{ marginTop: "20px", marginRight: "8vh", fontSize: "18px" }}
            >
              Pending Approvals
            </Typography>
            <h2 style={{ marginRight: "24vh" }}>{companiesApplied?.length}</h2>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#a855f7",
              margin: "10px",
              boxShadow: "0 0 10px #ccc",
              width: "280px",
              color: "white",
            }}
          >
            <Typography
              sx={{ marginTop: "20px", marginRight: "14vh", fontSize: "18px" }}
            >
              Jobs Posted
            </Typography>
            <h2 style={{ marginRight: "24vh" }}>{jobsPosted?.length}</h2>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#22c55e",
              margin: "10px",
              boxShadow: "0 0 10px #ccc",
              width: "280px",
              color: "white",
            }}
          >
            <Typography
              sx={{ marginTop: "20px", marginRight: "9vh", fontSize: "18px" }}
            >
              Users Registered
            </Typography>
            <h2 style={{ marginRight: "24vh" }}>{usersRegistered?.length}</h2>
          </div>
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#f59e0b",
              margin: "10px",
              boxShadow: "0 0 10px #ccc",
              width: "280px",
              color: "white",
            }}
          >
            <Typography
              sx={{ marginTop: "20px", marginRight: "4vh", fontSize: "18px" }}
            >
              Companies Registered
            </Typography>
            <h2 style={{ marginRight: "24vh" }}>{companies?.length}</h2>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "40px",
            borderRadius: "10px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              width: "90vh",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px #ccc",
              padding: "15px",
              margin: "10px",
            }}
          >
            <h3>Users and Companies Joining</h3>
            <Line options={options} data={data}></Line>
          </div>
          <div
            style={{
              borderRadius: "10px",
              width: "50vh",
              margin: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px #ccc",
              padding: "10px",
            }}
          >
            <h3> Users, Companies and Jobs stats</h3>
            <Doughnut data={d} />
          </div>
        </div>
      </div>
    );
  }
}
