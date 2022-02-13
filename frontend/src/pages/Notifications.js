import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import UserHeader from "../Components/User/Userheader";
import img from "../assets/images/Userpfp.jpg";

export default function Notifications() {
  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <UserHeader />
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          flexDirection: "column",
          alignItems: "center",
          width: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h1>Notifications</h1>
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
          <div>
            <img width="150px" height="150px" src={img} />
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
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                View Details
              </Button>
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                Apply now
              </Button>
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
          <div>
            <img width="150px" height="150px" src={img} />
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
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                View Details
              </Button>
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                Apply now
              </Button>
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
          <div>
            <img width="150px" height="150px" src={img} />
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
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                View Details
              </Button>
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                Apply now
              </Button>
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
          <div>
            <img width="150px" height="150px" src={img} />
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
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                View Details
              </Button>
              <Button
                style={{ margin: "10px" }}
                size="small"
                variant="outlined"
              >
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
