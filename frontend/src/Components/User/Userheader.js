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

export default function UserHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate("/SignIn");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            to="/Notifications"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Notifications</Button>
          </Link>
          <Link to="/Forums" style={{ color: "white", textDecoration: "none" }}>
            <Button color="inherit">Forums</Button>
          </Link>
          <Link
            to="/SavedJobs"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Saved Jobs</Button>
          </Link>
          <Link
            to="/UserProfile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Profile</Button>
          </Link>
          <Link
            to="/UserAbout"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Me</Button>
          </Link>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
