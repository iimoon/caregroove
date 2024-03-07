import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Userblogs.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const baseUrl = "http://localhost:3007/admin/viewblogs";

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => setBlogs(res.data), console.log(setBlogs))
      
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const getFirstFewLines = (content, lines = 2) => {
    return content.split("\n").slice(0, lines).join("\n");
  };
  const handleRead = (blogId) => {
    navigate(`/user/blogread/${blogId}`);
  };
  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <Card sx={{width: 300}} key={blog._id}>
          <CardActionArea>
            <CardMedia sx={{height:100,}}
              component="img"
              height="200"
              image={`http://localhost:3007/${blog.imagePath}`}
            />
            <CardContent sx={{marginTop:13}}>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              {/* Render HTML content safely */}
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getFirstFewLines(blog.content)) }} />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleRead(blog._id)}>
              Read
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default UserBlogs;
