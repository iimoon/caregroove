import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
    usertype: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const userType = data.get("usertype");
    const loginRoute =
      loginData.usertype === "therapist"
        ? "http://localhost:3007/therapist/login"
        : "http://localhost:3007/user/login";

    try {
      const response = await axios.post(
        loginRoute,
        {
          email,
          password,
          usertype: "",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user_id, fname , therapist_id} = response.data; // Extract fname from response
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user_id", user_id); // Store user_id in local storage
      localStorage.setItem("therapist_id", therapist_id); // Store user_id in local storage
      localStorage.setItem("fname", fname); // Store fname in local storage

      if (userType === "therapist") {
        navigate("/therapist");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error:", error);
      // Adjust error handling as needed
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundImage: "url(../images/login-bg.jpg)",
            height: 700,
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ color: "purple" }}>
              Caregroove
            </Typography>

            <Typography component="h1" variant="h5">
              Sign in to continue
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={loginData.email}
                color="secondary"
                onChange={inputHandler}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={loginData.password}
                label="Password"
                color="secondary"
                type="password"
                id="password"
                onChange={inputHandler}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="usertype"
                label="User Type"
                color="secondary"
                select
                value={loginData.usertype}
                onChange={inputHandler}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="therapist">Therapist</MenuItem>
              </TextField>
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
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
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
