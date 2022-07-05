import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { onAuthStateChanged } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function UserHeader() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobsApplied, setJobsApplied] = useState([]);

  const jobCollection = collection(db, "Job");
  const userCollection = collection(db, "UserProfile");

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/SignIn");
  };

  const getJobs = async () => {
    const data = await getDocs(jobCollection);
    setJobs(data.docs.map((doc) => ({ ...doc.data() })));
    setLoading(false);
  };

  const getSavedJobs = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    const saveJobRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/savejobs`
    );
    const d = await getDocs(saveJobRef);
    const savejobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (!savejobs) {
      setLoading(true);
    } else {
      setSavedJobs(savejobs);
      setLoading(false);
    }
  };

  const getAppliedJobs = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((u) => u.Email == user?.email);

    const appliedJobRef = collection(
      db,
      `UserProfile/${userData[0]?.id}/appliedJobs`
    );
    const d = await getDocs(appliedJobRef);
    const appliedJobs = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (!appliedJobs) {
      setLoading(true);
    } else {
      setJobsApplied(appliedJobs);
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get jobs
        getJobs();
        getSavedJobs();
        getAppliedJobs();
      }
    });
  }, [user, loading]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          position: "static",
          top: 0,
          left: 0,
          backgroundColor: "#2563eb",
          position: "fixed",
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link
            to="/UserHomepage"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography style={{ fontSize: "25px" }}>
              interns
              <span
                style={{
                  backgroundColor: "white",
                  color: "#2563eb",
                  marginLeft: "5px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  borderRadius: "2px",
                }}
              >
                <b>in</b>
              </span>
            </Typography>
          </Link>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Button color="inherit">
            <Link
              to="/UserNotifications"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              {/* <Button
              color="inherit"
              style={{ display: "flex", flexDirection: "column" }}
            > */}
              <Badge color="error" badgeContent={jobs?.length}>
                <NotificationsNoneIcon />
              </Badge>
              <Typography fontSize="small">Notifications</Typography>
              {/* </Button> */}
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/Forums"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <ArticleOutlinedIcon />{" "}
              <Typography fontSize="small">Forums</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/SavedJobs"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Badge color="warning" badgeContent={savedJobs?.length}>
                <BookmarkAddedOutlinedIcon />
              </Badge>{" "}
              <Typography fontSize="small">Saved Jobs</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/AppliedJobs"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Badge color="success" badgeContent={jobsApplied?.length}>
                <AssignmentTurnedInIcon />
              </Badge>
              <Typography fontSize="small"> Applied Jobs</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/UserProfile"
              style={{ color: "white", textDecoration: "none" }}
            >
              <AccountCircleIcon />
              <Typography fontSize="small">Profile</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/UserAbout"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ContactPageOutlinedIcon />
              <Typography fontSize="small">About</Typography>
            </Link>
          </Button>
          <Button color="inherit" onClick={logout}>
            <Link to="#" style={{ color: "white", textDecoration: "none" }}>
              <LogoutOutlinedIcon />
              <Typography fontSize="small">Logout</Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
