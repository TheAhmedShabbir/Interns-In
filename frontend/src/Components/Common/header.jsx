import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

export default function Generalheader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1d4ed8" }}>
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
            <Typography style={{ fontSize: "25px" }}>
              interns
              <span
                style={{
                  backgroundColor: "white",
                  color: "blue",
                  marginLeft: "5px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  // border: "2px solid blue",
                  borderRadius: "2px",
                }}
              >
                in
              </span>
            </Typography>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Link
            to="/Signin"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "25px",
            }}
          >
            Sign In
          </Link>
          <Link
            to="/UserSignUp"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "25px",
            }}
          >
            Join
          </Link>
          <Link
            to="/CompanySignUp"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WorkIcon></WorkIcon>
            <p
              style={{
                fontSize: "small",
                marginTop: "5px",
                marginBottom: "2px",
              }}
            >
              Post Job
            </p>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
