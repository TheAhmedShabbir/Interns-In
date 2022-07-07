import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../Components/Common/header";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const theme = createTheme();

export default function UserSignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userProfile = collection(db, "UserProfile");
  const [user, setUser] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user != null) {
        await sendEmailVerification(user.user);
        addDoc(userProfile, {
          FirstName: firstName,
          LastName: lastName,
          Email: email.toLowerCase(),
          Role: "User",
          Pfp: "",
          cv: "",
          bio: "",
          address: "",
          about: "",
          city: "",
          province: "",
        });
      }
      console.log(user);
      navigate("/verify");
    } catch (error) {
      setError(error.message);
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
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <ValidatorForm className="space-y-6" onSubmit={signUp}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    autoComplete="given-name"
                    name="firstName"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
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
                <Link href="/Signin" variant="body2">
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
