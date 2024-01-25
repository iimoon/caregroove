import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import caregroove from '../images/register-page/logo.png';

const defaultTheme = createTheme();

const Register = () => {
  const baseUrl = "http://localhost:3007/user/newuser";

  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
    gender: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (!passwordsMatch) {
      setNotification("Passwords don't match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post(`${baseUrl}`, { ...dataToSend, usertype: "user" });

      if (response.data && response.data.error === "User exists") {
        setNotification("User with this email already exists");
      } else {
        setNotification("User registration successful!");
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.error("Axios error:", err);
      console.error("Axios response:", err.response);

      if (err.response && err.response.data && err.response.data.error === "User exists") {
        setNotification("User with this email already exists. Please use a different email.");
      } else {
        setNotification("An error occurred during registration");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0.2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={caregroove}/>
          <Typography component="h1" variant="h5">
            Register to get started!
          </Typography>
          <Typography variant="subtitle1" color='secondary'>
            It's quick and easy.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  color='secondary'
                  autoFocus
                  value={formData.fname}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="sname"
                  label="Surname"
                  name="sname"
                  color='secondary'
                  autoComplete="family-name"
                  value={formData.sname}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  color='secondary'
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  color='secondary'
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ borderColor: passwordsMatch ? "" : "red" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  color='secondary'
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{ borderColor: passwordsMatch ? "" : "red" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Date of birth</Typography>
                <TextField
                  type="date"
                  name="date"
                  fullWidth
                  id="date"
                  color='secondary'
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Gender</Typography>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Grid>
            </Grid>
            {!passwordsMatch && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Passwords don't match
              </Typography>
            )}
            <div className="register-notification">
              {notification && <Typography variant="body2">{notification}</Typography>}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
            >
              Submit
            </Button>
            <Link href="/login" variant="body2" >
                    <Typography color='secondary'>Already a member? {"Log In"}</Typography>
                  </Link>
            <Typography variant="body2" sx={{ mt: 1 }}>
              &#x1F6C8; By clicking on submit, you are agreeing with the{' '}
              <Link href="/">terms and services</Link> of our product.
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
