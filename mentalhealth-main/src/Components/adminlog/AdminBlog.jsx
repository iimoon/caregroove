import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Button, TextField, Typography } from '@mui/material';
import './styles/AdminBlog.css';
import { useNavigate } from 'react-router-dom';

const AdminBlog = () => {
  const baseUrl = 'http://localhost:3007/admin/addblog';
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");

  useEffect(() => {
    // Fetch categories on component mount
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleUpload = () => {
    // Perform upload logic here using postTitle, content, and postCategory
    axios.post(baseUrl, {
      title: postTitle,
      content: content,
      category: postCategory,
    })
      .then(response => console.log("Upload successful:", response.data))
      .catch(error => console.error("Error uploading blog:", error));
  };

  const handlenavigation = () =>{
    navigate('/admin/viewblogs')
  }

  return (
    <div className='blog-container'>
      <Typography variant='h3'>Upload Blog</Typography>
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
