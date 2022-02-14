
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";


export default function CompanyProfile() {
  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <CompanyHeader />
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
                height: 700,
              },
            }}
          >
            <Paper
              elevation={2}
              style={{
                paddingTop: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "20px",
                paddingBottom: "30px",
                marginBottom: "30px",
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
                  <h2>Company Name</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ marginBottom: "15px" }}>
                  Company123
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
                  <h2>Location</h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ marginBottom: "15px" }}>
                  Lahore, Punjab
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
                  <h2>About </h2>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </div>
                <Typography style={{ margin: "15px" }}>
                  <div style = {{textAlign : 'justify', marginLeft : '20px', marginRight : '20px'}}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    </div>
                </Typography>
              </div>
              

            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
}


