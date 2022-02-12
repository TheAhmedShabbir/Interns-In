import * as React from "react";
import Typography from "@mui/material/Typography";
import AdminHeader from "../../Components/Admin/Adminheader";

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: "50px",
          margin: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
            padding: "15px",
          }}
        >
          <h2>Pending Approvals</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
            padding: "15px",
          }}
        >
          <h2>Jobs Posted</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
            padding: "15px",
          }}
        >
          <h2>Users Registered</h2>
          <Typography>125</Typography>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
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
          flexWrap: "wrap",
          padding: "50px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
            height: "400px",
            width: "400px",
            margin: "10px",
          }}
        >
          <h2>Users Joining</h2>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "2px solid blue",
            height: "400px",
            width: "400px",
            margin: "10px",
          }}
        >
          <h2>Companies Joining</h2>
        </div>
      </div>
    </div>
  );
}
