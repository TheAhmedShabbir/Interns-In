import React from "react";
import { Button, Checkbox, TextField } from "@mui/material";
export default function UserHomepage() {
  return (
    <div>
      <h1>This is User Homepage</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "15px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "80px",
                backgroundColor: "red",
                padding: "10px",
              }}
            >
              Image
            </div>
            <h3>User 123</h3>
          </div>
          <div
            style={{
              backgroundColor: "gray",
              padding: "15px",
              margin: "5px",
            }}
          >
            <h3>Top companies</h3>
            <div>
              <h3>ABC Company</h3>
              <Button>Follow</Button>
            </div>
            <div>
              <h3>ABC Company</h3>
              <Button>Follow</Button>
            </div>
            <Button>View all</Button>
          </div>
          <div
            style={{
              backgroundColor: "gray",
              padding: "15px",
              margin: "5px",
            }}
          >
            <h3>People You may know</h3>
            <div>
              <h3>ABC Company</h3>
              <Button>View Profile</Button>
            </div>
            <div>
              <h3>ABC Company</h3>
              <Button>View Profile</Button>
            </div>
            <div>
              <h3>ABC Company</h3>
              <Button>View Profile</Button>
            </div>
            <Button>View all</Button>
          </div>
        </div>
        <div style={{ padding: "15px", width: "950px" }}>
          <div
            style={{
              padding: "15px",
              backgroundColor: "gray",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <TextField></TextField>
            </div>
            <div>
              <Checkbox> Full Time</Checkbox>
              <Checkbox> Part Time</Checkbox>
              <Checkbox> Internship</Checkbox>
              <Button>Search</Button>
            </div>
          </div>
          <div
            style={{
              padding: "15px",
              backgroundColor: "gray",
              borderRadius: "10px",
              margin: "5px",
            }}
          >
            <h2>Posts</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
