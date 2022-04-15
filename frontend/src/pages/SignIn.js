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
import { collection, getDocs, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userProfile = collection(db, "UserProfile");
  const [checkUser, setCheckUser] = useState([]);

  let verifyEmail, verifyRole;

  const verifyUser = (item, index) => {
    verifyEmail = item.Email;
    verifyRole = item.Role;

    if (email == verifyEmail && verifyRole == "User") {
      navigate("/UserHomepage");
      // console.log("/userHomepage");
    }

    if (email == verifyEmail && verifyRole == "Company") {
      navigate("/CompanyHomepage");
      // console.log("/CompanyHomepage");
    }

    if (email == verifyEmail && verifyRole == "Admin") {
      navigate("/AdminDashboard");

      // console.log("/AdminDashboard");
    }
  };

  const getData = async () => {
    const data = await getDocs(userProfile);
    setCheckUser(data.docs.map((doc) => ({ ...doc.data() })));
  };

  const login = async () => {
    try {
      const LoggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      checkUser.forEach(verifyUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Generalheader />

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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={getData}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ marginRight: 32, marginTop: 2 }}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
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
