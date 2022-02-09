import { Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function Forums() {
  return (
    <div>
      <h2>This is forums page</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "gray",
          width: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            padding: "15px",
            width: "1100px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <TextField fullWidth></TextField>
          <Button>Image</Button>
          <Button>Event</Button>
          <Button>Document</Button>
          <Button>Post</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <h3>Topic 1</h3>
            <Typography>Total posts: 1000</Typography>
            <Typography>Views: 2300</Typography>
            <Button>View Discussion</Button>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <h3>Topic 2</h3>
            <Typography>Total posts: 1000</Typography>
            <Typography>Views: 2300</Typography>
            <Button>View Discussion</Button>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <h3>Topic 3</h3>
            <Typography>Total posts: 1000</Typography>
            <Typography>Views: 2300</Typography>
            <Button>View Discussion</Button>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <h3>Topic 4</h3>
            <Typography>Total posts: 1000</Typography>
            <Typography>Views: 2300</Typography>
            <Button>View Discussion</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
