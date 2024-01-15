import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles'
import axios from 'axios';

const baseUrl = 'http://localhost:3007/admin/viewblogs';

const useStyles = makeStyles({
  card: {
    marginBottom: '20px',
  },
});

const AdminBlogView = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  const renderBlogs = () => {
    return blogs.map(blog => (
      <Grid item key={blog._id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {blog.category}
            </Typography>
            <Typography variant="body2" component="p">
              {blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <div>
      <Typography variant='h3'>Admin Blog View</Typography>
      <Grid container spacing={3}>
        {renderBlogs()}
      </Grid>
    </div>
  );
};

export default AdminBlogView;
