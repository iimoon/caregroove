import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const UserBlogRead = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3007/admin/getblog/${blogId}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.imagePath); // Assuming your API returns the image path
        console.log("Data received:", res.data);
      })
      .catch((error) => console.error("Error fetching blog content:", error));
  }, [blogId]);

  return (
    <div className="blog-body">
      <img src={`http://localhost:3007/${image}`} alt={title} style={{ width: "60%" }} />
      <br/><br/><br/><br/><br/>
      <h2>{title}</h2>
      {/* Displaying the image */}
      {/* Displaying sanitized content */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
    </div>
  );
};

export default UserBlogRead;
