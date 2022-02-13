import React, { useState } from "react";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Userpfp from "../../assets/images/Userpfp.jpg";

export default function CompanyHomePage() {
  const [startDate, setStartDate] = useState(null);
  return (
    <div style={{ backgroundColor: "#f3f2ef" }}>
      <CompanyHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          height: "1100px",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
            minHeight: "500px",
            maxHeight: "1050px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "250px",
              height: "200px",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <img
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "100px",
                border: "2px solid #548CCB",
              }}
              src={Userpfp}
              alt="img"
            />
            <Button>Username</Button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "250px",
              height: "330px",
              backgroundColor: "#548CCB",
              marginTop: "50px",
              borderRadius: "20px",
            }}
          >
            <h4>Active Posts</h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>Active post 1</h5>
              <Button>View Applicants</Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>Active post 2</h5>
              <Button>View Applicants</Button>
            </div>
            <div>
              <Button style={{ color: "white" }}>View All</Button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "250px",
              height: "440px",
              backgroundColor: "#548CCB",
              marginTop: "20px",
              borderRadius: "20px",
            }}
          >
            <h4>Previous Posts</h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>Previous post 1</h5>
              <Button>View Applicants</Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>Previous post 2</h5>
              <Button>View Applicants</Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <h5>Previous post 3</h5>
              <Button>View Applicants</Button>
            </div>
            <div>
              <Button style={{ color: "white" }}>View All</Button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "800px",
            height: "650px",
            backgroundColor: "white",
          }}
        >
          <h3>Add A New Post</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              height: "600px",
            }}
          >
            <TextField required fullWidth label="Job Title" />
            <TextField required fullWidth label="Job Description" />
            <h4>Job Type</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Full Time" />
                  <FormControlLabel control={<Checkbox />} label="Part Time" />
                </FormGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Internship" />
                  <FormControlLabel control={<Checkbox />} label="Job" />
                </FormGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Online" />
                  <FormControlLabel control={<Checkbox />} label="Physical" />
                </FormGroup>
              </div>
            </div>
            <h4>Set Salary</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TextField label="Minimum Salary" />
              <TextField label="Maximum Salary" />
            </div>
            <h4>Set Location and Deadline</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TextField label="City Name" />
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div style={{ paddingTop: "30px" }}>
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
