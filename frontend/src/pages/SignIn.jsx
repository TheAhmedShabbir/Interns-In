import React, { useState, useEffect } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Generalheader from "../Components/Common/header";
import { db, auth } from "../firebase-config";
import { collection, getDocs, doc, query, where } from "firebase/firestore";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userProfile = collection(db, "UserProfile");
  const [checkUser, setCheckUser] = useState({});
  const [error, setError] = useState("");

  const verifyUser = () => {
    console.log(checkUser);
    let verifyRole = checkUser.Role;

    if (verifyRole == "User") {
      localStorage.setItem("page", "UserHomepage");
      navigate("/UserHomepage");
      // console.log("/userHomepage");
    }

    if (verifyRole == "Company") {
      localStorage.setItem("page", "CompanyHomepage");
      navigate("/CompanyHomepage");
      // console.log("/CompanyHomepage");
    }

    if (verifyRole == "Admin") {
      localStorage.setItem("page", "AdminDashboard");
      navigate("/AdminDashboard");
      // console.log("/AdminDashboard");
    }
  };

  const getData = async (email) => {
    const q = query(userProfile, where("Email", "==", email.toLowerCase()));
    const data = await getDocs(q);
    let docsData = data.docs.map((doc) => ({ ...doc.data() }));
    setCheckUser(docsData[0]);
  };

  useEffect(() => {
    verifyUser();
  }, [checkUser]);

  const login = async () => {
    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((res) => {
        console.log(res.user);
        localStorage.setItem("access_token", res.user.accessToken);
        sendEmailVerification(res.user)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        if (!res.user.emailVerified) {
          navigate("/unverified");
        } else {
          getData(res.user.email);
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    setError("");
    ValidatorForm.addValidationRule("isPassword6Char", (value) => {
      if (password.length < 6) {
        return false;
      }
      return true;
    });
  }, [password]);

  return (
    <ThemeProvider theme={theme}>
      <Generalheader />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ValidatorForm className="space-y-6" onSubmit={login}>
              <TextValidator
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                autoComplete="current-email"
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextValidator
                margin="normal"
                required
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
                sx={{ marginRight: 32, marginTop: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ color: "red", textAlign: "left" }}>{error}</div>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ marginRight: 32, marginTop: 2 }}
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </ValidatorForm>
            <Grid container>
              <Grid item sx={{ marginRight: 9 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/UserSignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
