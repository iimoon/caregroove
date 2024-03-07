import React, { useState, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditBlog = () => {
  const { blogId } = useParams(); // Extract blog ID from URL
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    // Fetch blog data if blogId exists
    if (blogId) {
      axios
        .get(`http://localhost:3007/admin/getblog/${blogId}`)
        .then((response) => {
          const { title, content, category } = response.data;
          setBlogData({
            title,
            content,
            category,
          });
        })
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [blogId]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);

    console.log("Form Data:", formData); // Log the form data before sending

    axios
      .put(`http://localhost:3007/admin/updateblog/${blogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Update successful:", response.data);
        navigate("/admin/viewblogs"); // Redirect to view after success
      })
      .catch((error) => console.log("Error updating blog:", error));
  };

  const handleCancel = () => {
    navigate("/admin/viewblogs"); // Redirect to view without updating
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="blog-container">
      <Typography variant="h3">Edit Blog</Typography>
      <Typography variant="h6">Post title</Typography>
      <TextField
        color="secondary"
        id="title"
        name="title"
        label="Post title"
        variant="outlined"
        value={blogData.title}
        onChange={handleInputChange}
      />
      <JoditEditor
        value={blogData.content}
        onChange={(newContent) =>
          setBlogData((prevData) => ({
            ...prevData,
            content: newContent,
          }))
        }
      />
      <br />
      <Typography variant="h6">Post Category</Typography>
      <TextField
        color="secondary"
        id="category"
        name="category"
        label="Post Category"
        variant="outlined"
        value={blogData.category}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default AdminEditBlog;
