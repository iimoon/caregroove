import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Button, TextField, Typography } from '@mui/material';
import './styles/AdminBlog.css';
import { useNavigate, useParams } from 'react-router-dom';

const AdminBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { blogId } = useParams(); // Extract blog ID from URL
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch categories on component mount
    axios.get(`http://localhost:3007/admin/${isEditing ? 'blog/:id' : 'addblog'}`)
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));

    // Fetch blog data if editing
    if (blogId) {
      axios.get(`http://localhost:3007/admin/${isEditing ? `blog/${blogId}` : 'addblog'}`)
        .then(response => {
          setPostTitle(response.data.title);
          setContent(response.data.content);
          setPostCategory(response.data.category);
          setIsEditing(true);
        })
        .catch(error => console.error("Error fetching blog:", error));
    }
  }, [blogId]);

  const handleUpload = () => {
    const method = isEditing ? 'put' : 'post'; // Adjust for update or create
    const url = isEditing ? `http://localhost:3007/admin/blog/${blogId}` : 'http://localhost:3007/admin/addblog';

    axios[method](url, {
      title: postTitle,
      content: content,
      category: postCategory,
    })
      .then(response => {
        console.log("Upload/Update successful:", response.data);
        navigate('/admin/viewblogs'); // Redirect to view after success
      })
      .catch(error => console.error("Error uploading/updating blog:", error));
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
