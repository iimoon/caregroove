import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAddtherapist = () => {
  const baseUrl = 'http://localhost:3007/admin/addtherapist';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    location: '',
  });

  const [notification, setNotification] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlenavigate = () => {
    navigate('/admin/viewtherapist');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}`, {...formData});

      if (response.data && response.data.error === 'Therapist exists') {
        setNotification('Therapist with this email already exists');
      } else {
        setNotification('Therapist registration successful!');
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.error('Axios error:', err);
      console.error('Axios response:', err.response);

      if (err.response && err.response.data && err.response.data.error === 'Therapist exists') {
        setNotification('Therapist with this email already exists. Please use a different email.');
      } else {
        setNotification('An error occurred during registration');
      }
    }
  };

  return (
    <div>
      <Typography variant="h3">Enter therapist details</Typography>
      <p>Enter therapist name</p>
      <TextField id="outlined-basic" label="Name" name='fname' variant="outlined" color="secondary" value={formData.fname} onChange={inputHandler} />
      <p>Enter therapist email</p>
      <TextField id="outlined-basic" label="Email" name='email' variant="outlined" color="secondary"value={formData.email} onChange={inputHandler} />
      <p>Enter therapist location</p>
      <TextField id="outlined-basic" label="Location" name='location' variant="outlined" color="secondary" value={formData.location} onChange={inputHandler} />
      <br />
      <br />
      {notification && <p style={{ color: 'green' }}>{notification}</p>}
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Submit
      </Button>
      <br />
      <br />
      <Button variant="outlined" color="secondary" onClick={handlenavigate}>
        View therapists
      </Button>
    </div>
  );
};

export default AdminAddtherapist;
