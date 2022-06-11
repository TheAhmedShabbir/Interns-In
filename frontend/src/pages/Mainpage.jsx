import { Button, Typography } from "@mui/material";
import React from "react";
import Generalheader from "../Components/Common/header";
import TextField from "@mui/material/TextField";
import img from "../assets/images/mainpage_img.jpg";
import Typewriter from "typewriter-effect";

export default function Mainpage() {
  return (
    <div>
      <Generalheader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "50px",
          flexWrap: "wrap",
          alignItems: "center",
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
              fontSize: "50px",
              marginLeft: "30px",
              fontFamily: "ubuntu",
              width: "350px",
            }}
          >
            <b>
              Looking for <br></br>{" "}
              {/* <span
                style={{
                  backgroundColor: "#1d4ed8",
                  color: "white",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              >
                Job
              </span>{" "}
              or <br></br>
              <span
                style={{
                  backgroundColor: "#1d4ed8",
                  color: "white",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              >
                internship
              </span>
              ? */}
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<span style="color: #1e40af">Job</span>')
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString(
                      '<span style="color: #1e40af">internship</span>'
                    )
                    .pauseFor(1000)
                    .typeString(" ?")
                    .pauseFor(1000)
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 200,
                }}
              />
            </b>
          </Typography>
          {/* <div
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
          </div> */}
        </div>
        <img
          style={{
            height: "470px",
            width: "670px",
          }}
          src={img}
          alt="img"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "150px",
          alignItems: "center",
          marginRight: "40px",
        }}
      >
        <Typography style={{ fontSize: "45px", fontFamily: "ubuntu" }}>
          Explore topics you are interested{" "}
          <span
            style={{
              backgroundColor: "#1e40af",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>in</b>
          </span>
        </Typography>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <h2>Content Topics</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Remote
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Work from Home
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Internship
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Jobs
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Interview
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Full time
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "250px",
          alignItems: "center",
          marginBottom: "250px",
        }}
      >
        <Typography
          style={{
            fontSize: "45px",
            fontFamily: "ubuntu",
            width: "700px",
            marginLeft: "100px",
          }}
        >
          Find the right{" "}
          <span
            style={{
              backgroundColor: "#1d4ed8",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>Job</b>
          </span>{" "}
          or <br></br>
          <span
            style={{
              backgroundColor: "#1d4ed8",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>internship</b>
          </span>{" "}
          for you.
        </Typography>

        <div
          style={{
            display: "flex",
            fontFamily: "ubuntu",
            flexDirection: "column",
            marginLeft: "50px",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2>Suggested Searches</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Human Resources
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Engineering
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Project Manager
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              SQA
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Accountant
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Marketing
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Operations
            </Button>
            <Button
              size="large"
              sx={{
                border: "1px solid blue",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              Developer
            </Button>
          </div>
        </div>
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
          marginTop: "150px",
        }}
      >
        <Typography
          style={{
            fontSize: "40px",
            marginBottom: "30px",
          }}
        >
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
