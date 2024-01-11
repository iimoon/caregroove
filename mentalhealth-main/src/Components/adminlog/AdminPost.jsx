import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Input,
  Alert,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPost = () => {
  const baseurl = "http://localhost:3007/admin/newpost";
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  // Remove disabled prop from Button as there's no loading state

  const handleChangeCaption = (event) => {
    setCaption(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !imageFile) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", imageFile);

      const response = await axios.post(baseurl, formData);
      if (response.status === 400) {
        alert("An error occured:" + response.data);
      } else {
        alert("Post successfully uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };

    const handleNavigate = () => {
      navigate('/admin/viewposts');
    };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 5,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload Blog
      </Typography>
      <TextField
      color="secondary"
        label="Post Caption"
        multiline
        rows={4}
        value={caption}
        onChange={handleChangeCaption}
        sx={{ backgroundColor: "white", borderRadius: 5, margin: "10px 0" }}
      />
      <br />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          component="label"
          variant="outlined"
          sx={{ color: "black", border: `1px solid`, borderRadius: 5 }}
        >
          <Input
            type="file"
            accept="image/jpeg,image/png"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {imageFile && (
          <Typography sx={{ marginLeft: 2 }}>{imageFile.name}</Typography>
        )}
      </Box>
      <Button
        variant="contained"
        // Remove disabled prop
        sx={{
          backgroundColor: "black",
          color: "white",
          borderRadius: 5,
          margin: "10px 0",
        }}
        onClick={handleSubmit}
      >
        Publish Post
      </Button>
      <br />
      <Button
        variant="contained"
        // Remove disabled prop
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: 5,
          margin: "10px 0",
        }}
        onClick={handleNavigate}
      >
        View Post
      </Button>
    </Box>
  );
};

export default AdminPost;
