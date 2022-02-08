import { Button, Typography } from "@mui/material";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <h1>This is View Applicants Page</h1>
      <div
        style={{
          maxWidth: "1100px",
          backgroundColor: "blue",
          padding: "20px",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <h2>View Applicants</h2>
        <div
          style={{
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "row",
            padding: "15px",
            borderRadius: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
            >
              Image
            </div>
            <Typography style={{ marginLeft: "15px" }}>User 123</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button>View CV</Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "row",
            padding: "15px",
            borderRadius: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
            >
              Image
            </div>
            <Typography style={{ marginLeft: "15px" }}>User 456</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button>View CV</Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "row",
            padding: "15px",
            borderRadius: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
            >
              Image
            </div>
            <Typography style={{ marginLeft: "15px" }}>User 789</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button>View CV</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
