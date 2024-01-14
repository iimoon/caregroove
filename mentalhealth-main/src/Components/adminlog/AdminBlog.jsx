import React, { useRef, useState } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';
import { Button, TextField, Typography, styled } from '@mui/material';
import './styles/AdminBlog.css'
const AdminBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  return (
    <div className='blog-container'>
      <Typography variant='h3'>Upload Blog</Typography>
      <Typography variant='h6'>Post title</Typography>
      <TextField color='secondary' id="outlined-basic" label="Post title" variant="outlined" />
      <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)}
      />
      <br/>
      <Typography variant='h6'>Post Category</Typography>
      <TextField color='secondary' id="outlined-basic" label="Post Category" variant="outlined" />
      <Button variant='contained' color='secondary'>Upload</Button>
      <Button variant='outlined' color='secondary'>View Blogs</Button>
    </div>
  );
};

export default AdminBlog;
