import * as React from "react";
import Typography from "@mui/material/Typography";

export default function AdminDashboard() {
  return (
    <div>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "40px" }}
      >
        Admin Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "grey",
          padding: "50px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            padding: "15px",
          }}
        >
          <h2>Pending Approvals</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            padding: "15px",
          }}
        >
          <h2>Jobs Posted</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            padding: "15px",
          }}
        >
          <h2>Users Registered</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            padding: "15px",
          }}
        >
          <h2>Companies registered</h2>
          <Typography>125</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "grey",
          padding: "50px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            height: "250px",
            width: "250px",
          }}
        >
          <h2>graph 1</h2>
        </div>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "blue",
            height: "250px",
            width: "250px",
          }}
        >
          <h2>graph 2</h2>
        </div>
      </div>
    </div>
  );
}
