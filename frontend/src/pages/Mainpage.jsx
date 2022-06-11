import { Button, Typography } from "@mui/material";
import React from "react";
import Generalheader from "../Components/Common/header";
import TextField from "@mui/material/TextField";
import img from "../assets/images/mainpage_img.jpg";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function Mainpage() {
  const navigate = useNavigate();

  return (
    <div>
      <Generalheader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "50px",
          flexWrap: "nowrap",
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
                    .typeString('<span style="color: #2563eb">Job</span>')
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString(
                      '<span style="color: #2563eb">internship</span>'
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
        <Typography
          style={{ fontSize: "45px", fontFamily: "ubuntu", width: "600px" }}
        >
          Explore topics you are interested{" "}
          <span
            style={{
              backgroundColor: "#2563eb",
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
              backgroundColor: "#2563eb",
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
              backgroundColor: "#2563eb",
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
          alignItems: "center",
          backgroundColor: "#2563eb",
          padding: "40px",
          color: "white",
          minHeight: "700px",
        }}
      >
        <Typography
          style={{
            fontSize: "50px",
            fontFamily: "ubuntu",
            width: "800px",
            margin: "40px",
          }}
        >
          Who is interns{" "}
          <span
            style={{
              backgroundColor: "white",
              color: "#2563eb",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>in</b>{" "}
          </span>
          for?
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            padding: "100px",
          }}
        >
          Anyone looking to start a professional career. <br></br> Interns in is
          a job and internship portal where numerous users can apply for jobs
          and internships that are posted by numerous companies. The users will
          have to create their profile and upload their cv. The companies can
          easily pick applicants based on their qualifications and send them
          interview calls.
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "40px",
          minHeight: "700px",
        }}
      >
        <Typography style={{ fontSize: "35px", fontFamily: "ubuntu" }}>
          Post your{" "}
          <span
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>Jobs</b>
          </span>{" "}
          or{" "}
          <span
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <b>internships</b>
          </span>{" "}
          for millions of people to see
        </Typography>
        <Button
          size="large"
          variant="outlined"
          style={{
            border: "1px solid #2563eb",
            color: "#1e40af",
          }}
          onClick={() => navigate("/SignIn")}
        >
          <b>Post Now</b>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          backgroundColor: "#2563eb",
          color: "white",
        }}
      >
        <h5 style={{ fontFamily: "ubuntu" }}>
          Copyright @ interns-in. All Rights Reserved
        </h5>
      </div>
    </div>
  );
}
