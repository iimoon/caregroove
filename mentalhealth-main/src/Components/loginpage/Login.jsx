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
import { Backdrop, MenuItem, Modal } from "@mui/material";
import caregroove from "../images/register-page/logo.png";
import "./login.css";
import Register from "../userreg/Register";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        CareGroove
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    console.log(loginData);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const loginRoute =
      loginData.usertype === "admin"
        ? "http://localhost:3007/admin/login"
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

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      const adminpath = "/admin"; // Adjust the path as needed
      navigate(adminpath);
      console.log(response.data.message);
      console.log(response.data.data);
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
                <MenuItem value="admin">Admin</MenuItem>
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
                  <Link href="/register" variant="body2" onClick={handleOpen}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Modal open={open} onClose={handleClose}>
                      <Backdrop sx={{ background: "rgba(0, 0, 0, 0.3)" }} />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Box p={3}>
                          <Register /> Your sign-up form component
                        </Box>
                      </Box>
                    </Modal>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
