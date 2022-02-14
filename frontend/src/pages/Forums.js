import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import UserHeader from "../Components/User/Userheader";

export default function Forums() {
  return (
    <div>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#f3f2ef",
          width: "100%",
          // marginTop : "30px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            width: "1100px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <h3>Start a New Topic</h3>
          <TextField
            style={{ marginBottom: "15px" }}
            fullWidth
            label="Topic Title"
          ></TextField>
          <div>
            <Button>Image</Button>
            <Button>Event</Button>
            <Button>Document</Button>
            <Button>Post</Button>
          </div>
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
              // border : '3px solid #548CCB',
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <div style={{ marginTop: "140px" }}>
              <h3>Topic 1</h3>
              <Typography>Total posts: 1000</Typography>
              <Typography>Views: 2300</Typography>
              <Button>View Discussion</Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              // border : '3px solid #548CCB',
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <div style={{ marginTop: "140px" }}>
              <h3>Topic 2</h3>
              <Typography>Total posts: 1000</Typography>
              <Typography>Views: 2300</Typography>
              <Button>View Discussion</Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              // border : '3px solid #548CCB',
              height: "350px",
              width: "400px",
              borderRadius: "10px",
              margin: "8px",
            }}
          >
            <div style={{ marginTop: "140px" }}>
              <h3>Topic 3</h3>
              <Typography>Total posts: 1000</Typography>
              <Typography>Views: 2300</Typography>
              <Button>View Discussion</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
