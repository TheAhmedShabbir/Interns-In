import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";

export default function UserProfile() {
  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "25px",
          backgroundColor: "#fff",
          width: "1200px",
          padding: "15px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "10px",
        }}
      >
        <div>
          <div style={{ padding: "10px", margin: "10px" }}>
            <img
              style={{ borderRadius: "110px" }}
              width="150px"
              height="150px"
              src={img}
            />
          </div>
          <h3>Ahmed Shabbir</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            JustifyContent: "center",
            alignItems: "baseline",
            width: "900px",
            padding: "20px",
            marginLeft: "20px",
          }}
        >
          <h3>user123@gmail.com</h3>
          <h3>Punjab,Pakistan</h3>
          <h3>MERN Stack Developer</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginRight: "20px",
          }}
        >
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button size="small" variant="outlined">
            CV
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            height: "300px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
            margin: "10px",
            padding: "15px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: "10px", padding: "10px" }}>Education</h2>
          <div style={{ padding: "10px", margin: "10px" }}>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Add
            </Button>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Edit
            </Button>
          </div>
        </div>
        <div
          style={{
            height: "300px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
            margin: "10px",
            padding: "15px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: "10px", padding: "10px" }}>Experience</h2>
          <div style={{ padding: "10px", margin: "10px" }}>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Add
            </Button>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Edit
            </Button>
          </div>
        </div>
        <div
          style={{
            height: "300px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
            margin: "10px",
            padding: "15px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: "10px", padding: "10px" }}>Skills</h2>
          <div style={{ padding: "10px", margin: "10px" }}>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Add
            </Button>
            <Button style={{ margin: "10px" }} size="small" variant="outlined">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
