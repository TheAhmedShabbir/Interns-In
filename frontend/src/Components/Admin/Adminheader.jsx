import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
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
            to={"/AdminDashboard"}
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
          </Link>{" "}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit">
            <Link
              to="/AdminProfile"
              style={{ color: "white", textDecoration: "none" }}
            >
              <PermIdentityOutlinedIcon />
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
