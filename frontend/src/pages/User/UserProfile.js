import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function UserProfile() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>User Profile</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <div
            style={{
              height: "200px",
              width: "200px",
              backgroundColor: "blue",
            }}
          >
            <h3>User picture</h3>
          </div>
          <Typography>User 123</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            JustifyContent: "center",
            alignItems: "baseline",
            width: "900px",
            padding: "20px",
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
            justifyContent: "space-around",
          }}
        >
          <button>Edit</button>
          <button>CV</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "grey",
            margin: "10px",
            padding: "10px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2>Education</h2>
          <button>Add</button>
          <button>Edit</button>
        </div>
        <div
          style={{
            height: "400px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "grey",
            margin: "10px",
            padding: "10px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2>Experience</h2>
          <button>Add</button>
          <button>Edit</button>
        </div>
        <div
          style={{
            height: "400px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "grey",
            margin: "10px",
            padding: "10px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2>Skills</h2>
          <button>Add</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}
