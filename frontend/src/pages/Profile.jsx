import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import UserHeader from "../Components/User/Userheader";
import { db, auth } from "../firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CompanyHeader from "../Components/Company/CompanyHeader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #548CCB",
  boxShadow: 24,
  p: 4,
};

export default function UserAbout() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(0);
  const url = window.location.pathname.split("/");

  // Get / post User Education
  const [UserEducation, setUserEducation] = useState([]);

  // Database variable
  //   const ExpCollection = collection(db, "UserExperience");
  //   const EduCollection = collection(db, "UserEducation");
  const userCollection = collection(db, "UserProfile");
  const jobCollection = collection(db, "Job");
  const employeesCollectionRef = collection(
    db,
    `UserProfile/${url[1]}/employees`
  );

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    const job = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const jobFilter = job.filter((i) => i.companyId == url[1]);

    setJobs(jobFilter);

    setLoading(false);
  };

  const getUser = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userProf = profiles.filter((i) => i.Email == user?.email);
    setUserInfo(userProf[0]);
  };

  const getProfile = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const d = await getDocs(jobCollection);
    const job = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const x = await getDocs(employeesCollectionRef);
    const e = x.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setEmployees(e);

    const userProf = profiles.filter((i) => i.id == url[1]);
    // console.log(userProf[0]);

    setProfile(userProf[0]);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Function Calls
        getUser();
        getProfile();
        getJobs();
      } else {
        navigate("/SignIn");
      }
    });
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
      <div style={{ backgroundColor: "#fafafa" }}>
        {userInfo?.Role == "User" ? (
          <div>
            <UserHeader />
          </div>
        ) : (
          <div>
            <CompanyHeader />
          </div>
        )}

        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <img
            style={{
              borderRadius: "110px",
              boxShadow: "0 0 10px #ccc",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
              zIndex: 100,
              position: "relative",
            }}
            width="150px"
            height="150px"
            src={profile?.Pfp}
          ></img>
          <div
            style={{
              backgroundColor: "#fff",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "-70px",
              borderRadius: "8px",
              boxShadow: "0 0 10px #ccc",
              height: "60vh",
              display: "flex",
              padding: "20px",
            }}
          >
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "60px",
                display: "flex",
                flexDirection: "column",
                width: "70%",
              }}
            >
              <h2>{profile?.CompanyName}</h2>
              <Typography style={{ marginTop: "-15px", fontSize: "14px" }}>
                {profile?.bio}
              </Typography>
              <Typography style={{ fontSize: "14px" }}>
                {profile?.city + ", " + profile?.province}
              </Typography>
              <h3 style={{ color: "#2563eb" }}>
                {employees.length + " Employee(s)"}
              </h3>
              <Typography style={{ fontSize: "15px" }}>
                {profile?.about}
              </Typography>
            </div>
          </div>

          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <h2>Jobs</h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {jobs.map((job, key) => {
              return (
                <div
                  style={{
                    minWidth: "800px",
                    maxWidth: "800px",
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "30px",
                      }}
                    >
                      {/* <LocationOnOutlinedIcon color="primary" /> */}
                      <h4>{job.City}</h4>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      display: "flex",
                      marginLeft: "20px",
                      fontSize: "small",
                      padding: "20px",
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
