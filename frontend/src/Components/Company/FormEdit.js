import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function FormEdit({ open, close, title }) {
  return (
    <div>
      <Modal open={open} onClose={close}>
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
            width: "500px",
            height: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField style={{ margin: "10px" }} label="Job Title">
              {console.log(title)}
              {/* {console.log(title)} */}
            </TextField>
            <TextField
              style={{ margin: "10px" }}
              label="Job Description"
            ></TextField>
            <h3>Job Type</h3>
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
                <FormGroup
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Full Time"
                    value="Full Time"
                  />
                  <FormControlLabel
                    sx={{ marginLeft: "80px" }}
                    control={<Checkbox />}
                    label="Part Time"
                    value="Part Time"
                  />
                </FormGroup>
              </div>
            </div>

            <h3>Mode</h3>
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
                <FormGroup
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remote"
                    value="Remote"
                  />
                  <FormControlLabel
                    sx={{ marginLeft: "80px" }}
                    control={<Checkbox />}
                    label="On-site"
                    value="On-site"
                  />
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
              <TextField type="number" label="Salary" />
            </div>

            <h4>Set Location and Deadline</h4>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
