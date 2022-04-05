import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function AdminHeader() {
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
            to="/AdminDashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button style={{ fontSize: "20px" }} color="inherit">
              Interns-In
            </Button>
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
          <Link
            to="/AdminProfile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">Me</Button>
          </Link>

          <Link to="/SignIn" style={{ color: "white", textDecoration: "none" }}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
