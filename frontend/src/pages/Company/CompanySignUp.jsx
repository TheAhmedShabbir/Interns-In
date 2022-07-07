import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Generalheader from "../../Components/Common/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const theme = createTheme();

export default function CompanySignUp() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const userProfile = collection(db, "UserProfile");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user != null) {
        await sendEmailVerification(user.user);
        addDoc(userProfile, {
          CompanyName: companyName,
          TaxNumber: taxNumber,
          Email: email,
          Role: "Company",
          pfp: "",
          bio: "",
          city: "",
          about: "",
          province: "",
        });
      }
      navigate("/verify");
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      console.log("error creating user");
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPassword6Char", (value) => {
      if (password.length < 6) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [password, confirmPassword]);

  return (
    <ThemeProvider theme={theme}>
      <Generalheader />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Company SignUp
          </Typography>
          <Box sx={{ mt: 6 }}>
            <ValidatorForm className="space-y-6" onSubmit={signUp}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    autoComplete="given-name"
                    name="companyname"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    fullWidth
                    id="companyname"
                    label="Company Name"
                    autoFocus
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    fullWidth
                    id="tax"
                    label="Tax Number"
                    name="taxnumber"
                    value={taxNumber}
                    onChange={(e) => {
                      setTaxNumber(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "This field is required",
                      "Email is not valid",
                    ]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    validators={["required", "isPassword6Char"]}
                    errorMessages={[
                      "This field is required",
                      "Password must be 6 characters long",
                    ]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type={"submit"}
              >
                Sign Up
              </Button>
            </ValidatorForm>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
