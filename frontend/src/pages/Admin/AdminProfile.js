import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function AdminProfile() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>Admin Profile</h1>
      <div style={{ borderRadius: "25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 450,
                height: 400,
              },
            }}
          >
            <Paper
              elevation={3}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignContent: "center",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <h2>Name</h2>
                  <Button>Edit</Button>
                </div>
                <Typography>Ahmed Shabbir</Typography>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignContent: "center",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <h2>Password</h2>
                  <Button>Edit</Button>
                </div>
                <Typography>**********</Typography>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignContent: "center",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <h2>Email</h2>
                  <Button>Edit</Button>
                </div>
                <Typography>abc@gmail.com</Typography>
              </div>
              <div></div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
}
