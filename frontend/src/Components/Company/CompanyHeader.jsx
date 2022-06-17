import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Badge from "@mui/material/Badge";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function CompanyHeader() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [employees, setEmployees] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const userCollection = collection(db, "UserProfile");
  const shortlistCollectionRef = collection(
    db,
    `UserProfile/${userInfo?.id}/shortlisted`
  );
  const employeesCollectionRef = collection(
    db,
    `UserProfile/${userInfo?.id}/employees`
  );

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();
    await signOut(auth);
    navigate("/SignIn");
  };

  const getUserInfo = async () => {
    const data = await getDocs(userCollection);
    const profiles = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.Email == user?.email);

    setUserInfo(userData[0]);

    setLoading(false);
  };

  const getShortlisted = async () => {
    const data = await getDocs(shortlistCollectionRef);
    const shortlisted = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setApplicants(shortlisted);
    // console.log(applicants);
    setLoading(false);
  };

  const getEmployees = async () => {
    const employeesData = await getDocs(employeesCollectionRef);
    const employeesProfiles = employeesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setEmployees(employeesProfiles);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get jobs
        getUserInfo();
        getShortlisted();
        getEmployees();
      }
    });
  }, [user, userInfo?.id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          position: "static",
          top: 0,
          left: 0,
          backgroundColor: "#2563eb",
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
            to="/CompanyHomepage"
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
                  // border: "2px solid blue",
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

          {/* <Link
            to="/CompanyNotifications"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Notifications</Button>
          </Link> */}
          <Button color="inherit">
            <Link
              to="/employees"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Badge color="success" badgeContent={employees?.length}>
                <PeopleAltIcon />
              </Badge>
              <Typography fontSize="small">Employees</Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              to="/shortlisted"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Badge color="warning" badgeContent={applicants?.length}>
                <ListAltIcon />
              </Badge>
              <Typography fontSize="small">Shortlisted</Typography>
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
              to="/CompanyProfile"
              style={{ color: "white", textDecoration: "none" }}
            >
              <PermIdentityOutlinedIcon />{" "}
              <Typography fontSize="small">Profile</Typography>
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
