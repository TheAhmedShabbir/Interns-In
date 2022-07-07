
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { updateDoc, doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import moment from "moment";


export default function ReportPost({
  open,
  close,
  id,
}) {
  const [Reason, setReason] = useState("");
  const ReportCollection = collection(db, "Reports"); 

  
  const Addreport = async () => {
        await addDoc(ReportCollection, {
          ID: id,
          Reason: Reason,
          Time: moment().format("MMMM Do YYYY, h:mm a"),
        });
      };


  return (
    <div>
      <Modal
        open={open}
        onClose={close}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    // alignItems: "center",
                    backgroundColor: "white",
                    padding: '15px',
                  }}
                    >
          <div style = {{display : 'flex', justifyContent: 'initial',}}>
          <h2>Why are you reporting?</h2>
          </div>
          <FormControl>
                    <RadioGroup
                      name="nameRadio"
                      value={Reason}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        margin : '25px',
                      }}
                    >
                      <FormControlLabel
                        value={"Recism/Descrimination/Insult"}
                        control={<Radio required={true} />}
                        label={"Recism/Descrimination"}
                        onChange={(event) => {
                            setReason(event.target.value);
                        }}
                        // sx={{ marginRight: "150px" }}
                      />
                      <FormControlLabel
                        value={"Hate speech/Violence/Threat"}
                        control={<Radio required={true} />}
                        label={"Hate speech/Violence/Threat"}
                        onChange={(event) => {
                            setReason(event.target.value);
                        }}
                        // sx={{ marginRight: "150px" }}
                      />
                      <FormControlLabel
                        value={"Verbal abuse/Harassment/Bullying"}
                        control={<Radio required={true} />}
                        label={"Verbal abuse/Harassment/Bullying"}
                        onChange={(event) => {
                            setReason(event.target.value);
                        }}
                        // sx={{ marginRight: "350px" }}
                      />
                      <FormControlLabel
                        value={"Fraud/Spam/misleading"}
                        control={<Radio required={true} />}
                        label={"Fraud/Spam/Misleading"}
                        onChange={(event) => {
                            setReason(event.target.value);
                        }}
                        // sx={{ marginRight: "350px" }}
                      />
                    </RadioGroup>
                  </FormControl>
          <div style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: "10px",
                    }}>
          <Button style={{
                        backgroundColor: "red",
                        color: "white",
                        boxShadow: "0px 0px 5px black",
                        marginRight: "5px",
                      }} onClick={close}>Cancel</Button>
          <Button style={{
                        backgroundColor: "orange",
                        color: "white",
                        boxShadow: "0px 0px 5px black",
                        marginRight: "5px",
                      }} onClick={() => Addreport()}>Report</Button>
          </div>
        </div>
        </div>
      </Modal>
    </div>
  );
}
