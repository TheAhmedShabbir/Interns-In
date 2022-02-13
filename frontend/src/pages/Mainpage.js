import { Button, Typography } from "@mui/material";
import React from "react";
import Generalheader from "../Components/Common/header";
import TextField from "@mui/material/TextField";
import img from "../assets/images/mainpage_img.jpg";

export default function Mainpage() {
  return (
    <div>
      <Generalheader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <Typography
            style={{
              fontSize: "40px",
              marginBottom: "40px",
              marginTop: "30px",
            }}
          >
            <b>
              Looking For A <br></br> Job/Internship?
            </b>
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField fullWidth label="Search for jobs" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                style={{ margin: "10px 0px 5px 0px" }}
                width="10px"
                label="Province"
              />
              <TextField
                style={{ margin: "10px 0px 5px 10px" }}
                width="10px"
                label="City"
              />
            </div>
            <Button style={{ marginTop: "25px" }} variant="contained">
              Search
            </Button>
          </div>
        </div>
        <img
          style={{
            height: "500px",
            width: "750px",
            marginLeft: "20px",
          }}
          src={img}
          alt="img"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingTop: "150px",
          paddingBottom: "150px",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "35px" }}>
          <b>Find the Right job/internship for you.</b>
        </p>
        <Button size="large" variant="contained">
          Choose field
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          backgroundColor: "#548CCB",
          padding: "40px",
          color: "white",
          height: "400px",
        }}
      >
        <Typography style={{ fontSize: "40px", marginBottom: "30px" }}>
          <b>Who Is Interns-In For?</b>
        </Typography>
        <p>Anyone looking to start a professional career</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "40px",
          height: "400px",
        }}
      >
        <p style={{ fontSize: "35px" }}>
          <b>Post Your Jobs For Millions of People to See</b>
        </p>
        <Button size="large" variant="contained">
          Post Now
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",

          backgroundColor: "#323233",
          color: "white",
        }}
      >
        <h5>Copyright @ Interns-In. All Rights Reserved</h5>
      </div>
    </div>
  );
}
