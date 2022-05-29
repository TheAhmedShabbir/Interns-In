import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

export default function UserHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/SignIn");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ position: "static", top: 0, left: 0 }}>
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
            <Typography style={{ fontSize: "25px" }}>Interns-In</Typography>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Link
            to="/UserNotifications"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <NotificationsNoneOutlinedIcon />
              Notification
            </Button>
          </Link>
          <Link to="/Forums" style={{ color: "white", textDecoration: "none" }}>
            <Button color="inherit">
              <ArticleOutlinedIcon /> Forums
            </Button>
          </Link>
          <Link
            to="/SavedJobs"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <BookmarkAddedOutlinedIcon /> Saved Jobs
            </Button>
          </Link>
          <Link
            to="/AppliedJobs"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Applied Jobs</Button>
          </Link>
          <Link
            to="/UserProfile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <PermIdentityOutlinedIcon /> Profile
            </Button>
          </Link>
          <Link
            to="/UserAbout"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <ContactPageOutlinedIcon /> About
            </Button>
          </Link>
          <Button color="inherit" onClick={logout}>
            <LogoutOutlinedIcon /> Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
