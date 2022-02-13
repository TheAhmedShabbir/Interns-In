import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import UserHeader from "../Components/User/Userheader";



export default function Notifications() {
  return (
    <div>
      <UserHeader/>
      <div
        style={{
          display: "flex",
          marginTop : "30px",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "gray",
          width: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h2>My Notifications</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "15px",
            width: "700px",
            borderRadius: "10px",
            margin: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "red",
              height: "60px",
              width: "60px",
              borderRadius: "50px",
            }}
          >
            image
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography style={{ padding: "10px" }}>
              XYZ added a new job for Software Engineer
            </Typography>
            <div>
              <Button>View Details</Button>
              <Button>Apply now</Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "15px",
            width: "700px",
            borderRadius: "10px",
            margin: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "red",
              height: "60px",
              width: "60px",
              borderRadius: "50px",
            }}
          >
            image
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography style={{ padding: "10px" }}>
              XYZ added a new job for Software Engineer
            </Typography>
            <div>
              <Button>View Details</Button>
              <Button>Apply now</Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "15px",
            width: "700px",
            borderRadius: "10px",
            margin: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "red",
              height: "60px",
              width: "60px",
              borderRadius: "50px",
            }}
          >
            image
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography style={{ padding: "10px" }}>
              XYZ added a new job for Software Engineer
            </Typography>
            <div>
              <Button>View Details</Button>
              <Button>Apply now</Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "15px",
            width: "700px",
            borderRadius: "10px",
            margin: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: "red",
              height: "60px",
              width: "60px",
              borderRadius: "50px",
            }}
          >
            image
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography style={{ padding: "10px" }}>
              XYZ added a new job for Software Engineer
            </Typography>
            <div>
              <Button>View Details</Button>
              <Button>Apply now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
