import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function UserHeader() {
  const logout = async () => {
    await signOut(auth);
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
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            <Typography style={{ fontSize: "30px" }}>Interns-In</Typography>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Link
            to="/UserHomePage"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Home</Button>
          </Link>
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
            to="/UserAbout"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Profile</Button>
          </Link>
          <Link
            to="/UserProfile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Me</Button>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
