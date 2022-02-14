import { Button, Typography } from "@mui/material";
import React from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import Userpfp from "../../assets/images/Userpfp.jpg";

export default function Homepage() {
  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <CompanyHeader />
      <div
        style={{
          height: "500px",
          maxWidth: "900px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
      >
        <h2>View Applicants</h2>
        <div>
          <Button variant="outlined">Vew Shortlisted Candidates</Button>
        </div>
        <div
          style={{
            backgroundColor: "white",
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
            <img
              style={{
                height: "100px",
                width: "100px",
                // backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
              src={Userpfp}
              alt="img"
            />
            <Typography style={{ marginLeft: "15px" }}>User 123</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button variant="contained">View CV</Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
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
            <img
              style={{
                height: "100px",
                width: "100px",
                // backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
              src={Userpfp}
              alt="img"
            />
            <Typography style={{ marginLeft: "15px" }}>User 456</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button variant="contained">View CV</Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
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
            <img
              style={{
                height: "100px",
                width: "100px",
                // backgroundColor: "red",
                borderRadius: "50px",
                marginRight: "10px",
              }}
              src={Userpfp}
              alt="img"
            />
            <Typography style={{ marginLeft: "15px" }}>User 789</Typography>
          </div>
          <div>
            <Button>Shortlist</Button>
            <Button>Visit Profile</Button>
            <Button variant="contained">View CV</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
