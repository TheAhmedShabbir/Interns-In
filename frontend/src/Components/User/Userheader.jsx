import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
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

export default function UserHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/SignIn");
  };

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
            to="/UserHomepage"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography style={{ fontSize: "27px" }}>
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
              <Badge color="error" badgeContent={3}>
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
              <Badge color="warning" badgeContent={1}>
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
              <Badge color="success" badgeContent={2}>
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
              <PermIdentityOutlinedIcon />{" "}
              <Typography fontSize="small">Profile</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/UserAbout"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ContactPageOutlinedIcon />{" "}
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
