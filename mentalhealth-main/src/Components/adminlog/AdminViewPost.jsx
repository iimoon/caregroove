import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
 Box,
 Typography,
 Card,
 CardContent,
 CardMedia,
 Grid,
 Avatar,
 Divider,
 InputLabel,
 TextField,
 Button,
 Alert,
} from '@mui/material';

// ... (import statements)

const AdminViewPost = () => {
  const baseurl = "http://localhost:3007/admin/viewposts";
  const deleteBaseUrl = "http://localhost:3007/admin/deletepost"; // Add the delete post base URL
  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(baseurl);
        setPosts(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error.message);
      }
    };
 
    fetchPosts();
  }, []);
 
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${baseurl}/${searchId}`);
      setPosts([response.data]); // Display only the searched post
    } catch (error) {
      setError(error.message);
    }
  };
 
  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`${deleteBaseUrl}/${postId}`);
      console.log(response.data); // Log the success message
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
 
  if (error) {
    return <Typography variant="h5">Error fetching posts: {error}</Typography>;
  }
 
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <InputLabel id="post-search-label">Search Post by ID:</InputLabel>
        <TextField
          id="post-search"
          labelId="post-search-label"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {posts.map((post) => (
        <Card key={post._id}>
          <CardMedia
            component="img"
            alt={post.caption}
            image={post.imageURL} 
            sx={{ height: 300 }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Avatar src={post.imageURL} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">{post.caption}</Typography>
                <Divider />
                <Typography variant="body2">{post.createdBy}</Typography>
                {/* Add the delete button */}
                <br/>
                <Button variant="outlined" color='secondary' onClick={() => handleDeletePost(post._id)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      {posts.map((post) => console.log('Image URL:', post.imageURL))}
    </Box>
  );
 };
 
 export default AdminViewPost;
 