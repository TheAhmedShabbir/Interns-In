// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { Button, Modal, TextField, Typography } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { FormControl } from "@mui/material";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import { updateDoc, collection, doc, addDoc,} from "firebase/firestore";
// import { db } from "../../firebase-config";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { forwardRef } from "react";
// import moment from "moment";


// export default function CallCodeModal({ open, close, User_ID }) {

//   const CallCollection = collection(db, "CallCodes");
//   const [U_ID, setU_ID] = useState("")
//   () => {
//     setU_ID(User_ID)
//   }

//   const getCodes = async () => {
//     const data = query(CallCollection,where("ID", "==" ,U_ID), orderBy("Time", "desc"));
//     await getDocs(data)
//       .then((doc) => {
//         const Fdata = doc.docs.map((forums) => ({
//           ...forums.data(),
//           id: forums.id,
//         }));
//         setForums(Fdata);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // setForums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   };

//   return (
//     <div>
//       {/* {console.log(email)} */}
//       <Modal open={open}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             borderRadius: "8px",
//             boxShadow: 0,
//             p: 4,
//             width: "80vh",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <TextField
//               fullWidth
//               style={{ margin: "10px" }}
//               label="Call Code"
//                 onChange={(e) => setCode(e.target.value)}
//             ></TextField>
//             <div>
//               <Button
//                 sx={{ marginTop: "30px" }}
//                 color="success"
//                 variant="contained"
//                 onClick={AddData}
//               >
//                 send
//               </Button>
//               <Button
//                 sx={{ marginTop: "30px", marginLeft: "20px" }}
//                 variant="outlined"
//                 onClick={close}
//               >
//                 close
//               </Button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
