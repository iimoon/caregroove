import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Button,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const baseUrl = "http://localhost:3007/admin/viewblogs";

const AdminBlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleUpdate = (blogId) => {
    navigate(`/admin/editblog/${blogId}`);
  };

  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3007/admin/blogs/${blogId}`)
        .then((response) => {
          console.log("Blog deleted successfully:", response.data);
          window.location.reload();
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead width="100%">
          <TableRow>
            <TableCell>Title</TableCell>
            {/* <TableCell align="right">Actions</TableCell> */}
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody width="100%">
          {blogs.map((blog) => (
            <Accordion  width="100%" key={blog._id}>
              <AccordionSummary width="100%" expandIcon={<ExpandMoreIcon />}>
                <TableCell>{blog.title}</TableCell>
              </AccordionSummary>
              <AccordionDetails>
                <TableRow>
                  <TableCell>
                    {/* Render HTML content safely */}
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      component={Button}
                      variant="contained"
                      onClick={() => handleUpdate(blog._id)}
                    >
                      Update
                    </Link>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Render category within the AccordionDetails */}
                <TableCell>{blog.category}</TableCell>
              </AccordionDetails>
            </Accordion>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminBlogView;
