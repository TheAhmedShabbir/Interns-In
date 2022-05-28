import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ViewApplicants({ companyId, open, close, applicant }) {
  const [warningOpen, setWarningOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const shortlistCollectionRef = collection(
    db,
    `UserProfile/${companyId}/shortlisted`
  );

  const userCollection = collection(db, "UserProfile");

  const handleWarningClick = () => {
    setWarningOpen(true);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const shortlist = async (id) => {
    const d = await getDocs(userCollection);
    const profiles = d.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userData = profiles.filter((i) => i.id == applicant[0]?.applicantid);

    const data = await getDocs(shortlistCollectionRef);
    const shortlisted = data.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const shortlistedFilter = shortlisted.filter(
      (i) => i.applicantid == userData[0].id
    );

    if (applicant[0]?.applicantid == shortlistedFilter[0]?.applicantid) {
      handleWarningClick();
    } else {
      const a = await addDoc(
        collection(db, `UserProfile/${companyId}/shortlisted`),
        {
          applicantEmail: userData[0]?.Email,
          firstname: userData[0]?.FirstName,
          lastname: userData[0]?.LastName,
          pfp: userData[0]?.pfp,
          resume: userData[0]?.cv,
          bio: userData[0]?.bio,
          address: userData[0]?.address,
          about: userData[0]?.about,
          city: userData[0]?.city,
          province: userData[0]?.province,
          applicantid: applicant[0]?.applicantid,
        }
      );

      handleSuccessClick();
    }
  };

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
                      {app?.firstname + " " + app?.lastname}
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
                      onClick={() => shortlist(app.id)}
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
                variant="contained"
                color="error"
                onClick={close}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={warningOpen}
        autoHideDuration={2000}
        onClose={handleWarningClose}
      >
        <Alert
          onClose={handleWarningClose}
          sx={{ width: "100%" }}
          severity="warning"
        >
          You have already Shortlisted this Candidate
        </Alert>
      </Snackbar>

      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          sx={{ width: "100%" }}
          severity="success"
        >
          Applicant Shortlisted
        </Alert>
      </Snackbar>
    </div>
  );
}
