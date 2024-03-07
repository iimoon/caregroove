import React, { useRef, useState } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Button, TextField, Typography } from '@mui/material';
import './styles/AdminBlog.css';
import { useNavigate } from 'react-router-dom';

const AdminBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImages(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', content);
    formData.append('category', postCategory);
    // Append selected images to formData
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('image', selectedImages[i]);
      }
    }

    axios.post('http://localhost:3007/admin/addblog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("Upload successful:", response.data);
        navigate('/admin/viewblogs'); // Redirect to view after success
      })
      .catch(error => console.error("Error uploading blog:", error));
  };

  const handlenavigation = () => {
    navigate('/admin/viewblogs');
  };

  return (
    <div className='blog-container'>
      <Typography variant='h3'>Upload Blog</Typography>
      <Typography variant='h6'>Header Image</Typography>
      <input
        type="file"
        onChange={handleImageChange}
        multiple
      />
      <Typography variant='h6'>Post title</Typography>
      <TextField
        color='secondary'
        id="outlined-basic"
        label="Post title"
        variant="outlined"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)}
      />
      <br />
      <Typography variant='h6'>Post Category</Typography>
      <TextField
        color='secondary'
        id="outlined-basic"
        label="Post Category"
        variant="outlined"
        value={postCategory}
        onChange={(e) => setPostCategory(e.target.value)}
      />
      <Button variant='contained' color='secondary' onClick={handleUpload}>Upload</Button>
      <Button variant='outlined' color='secondary' onClick={handlenavigation}>View Blogs</Button>
    </div>
  );
};

export default AdminBlog;
