import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import img from "../../assets/images/Userpfp.jpg";

export default function ViewApplicants({ id, open, close, applicant }) {
  return (
    <div>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 0,
            p: 4,
            width: "110vh",
            // height: "85vh",
            overflowY: "auto",
          }}
        >
          {applicant?.map((app, key) => {
            return (
              <div key={key}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img width="80px" height="80px" src={img} />
                    </div>
                    <p style={{ marginLeft: "15px" }}>
                      {app.FirstName} {app.LastName}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      float: "right",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      style={{
                        margin: "10px",
                      }}
                      color="success"
                      size="small"
                      variant="outlined"
                    >
                      ShortList
                    </Button>
                    <Button size="small" variant="outlined">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                sx={{ marginTop: "30px", marginLeft: "30px" }}
                variant="outlined"
                onClick={close}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

{
  /* <div
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
      </div> */
}
