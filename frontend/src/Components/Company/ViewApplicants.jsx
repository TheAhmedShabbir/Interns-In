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

export default function ViewApplicants({ companyId, open, close, applicant }) {
  const shortlistCollectionRef = collection(
    db,
    `UserProfile/${companyId}/shortlisted`
  );

  const shortlist = async (id) => {
    const data = await getDocs(shortlistCollectionRef);
    const shortlisted = data.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // if (applicantFilter[0]?.applicantEmail == user?.email) {
    //   handleWarningClick();
    // } else {
    //   const a = await addDoc(collection(db, `Job/${id}/applicants`), {
    //     applicantEmail: user?.email,
    //     firstname: userData[0]?.FirstName,
    //     lastname: userData[0]?.LastName,
    //     pfp: userData[0]?.Pfp,
    //     resume: userData[0]?.cv,
    //     bio: userData[0]?.Main,
    //     address: userData[0]?.Address,
    //     about: userData[0]?.About,
    //     city: userData[0]?.City,
    //     province: userData[0]?.Province,
    //   });

    //   handleSuccessClick();
    // }

    console.log(id);
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
    </div>
  );
}
