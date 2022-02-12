import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AdminHeader from "../../Components/Admin/Adminheader";
import img from "../../assets/images/Userpfp.jpg";

export default function AdminProfile() {
  return (
    <div>
      <AdminHeader />
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div style={{ zIndex: 1, position: "relative" }}>
          <img
            style={{ borderRadius: "110px" }}
            width="200px"
            height="200px"
            src={img}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            marginTop: "-110px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 550,
                height: 300,
              },
            }}
          >
            <Paper
              elevation={3}
              style={{
                paddingTop: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "20px",
                paddingBottom: "30px",
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
                    paddingLeft: "50px",
                    paddingRight: "70px",
                  }}
                >
                  <h2>Name</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ marginBottom: "15px" }}>
                  Ahmed Shabbir
                </Typography>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignContent: "center",
                    paddingLeft: "50px",
                    paddingRight: "70px",
                  }}
                >
                  <h2>Password</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ marginBottom: "15px" }}>
                  **********
                </Typography>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignContent: "center",
                    paddingLeft: "50px",
                    paddingRight: "70px",
                  }}
                >
                  <h2>Email</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography>abc@gmail.com</Typography>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
}
