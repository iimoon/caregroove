import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import "./userjournal.css";

const UserJournal = () => {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    content: "",
    tags: ""
  });

  const handleUpload = () => {
    const userId = localStorage.getItem("user_id");
    setFormData({ ...formData, userId: userId });
    console.log("Form data:",formData)
    axios
      .post("http://localhost:3007/user/addentry", formData)
      .then((response) => {
        alert("Entry saved!")
        console.log("Upload successful:", response.data);
        // Reset form fields after successful submission
        setFormData({
          title: "",
          content: "",
          tags: ""
        });
      })
      .catch((error) =>
        console.error("Error uploading journal entry:", error)
      );
  };

  return (
    <div>
      <div className="journalintro">
        <Typography variant="h5">New diary entry</Typography>
      </div>
      <div className="journalmain-container">
        <div className="journal-intro">
          <Typography variant="h5">Enter appropriate title</Typography>
          <TextField
            variant="outlined"
            placeholder="Title"
            color="secondary"
            sx={{ width: 1000 }}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <br />
        </div>
        <div className="quill-container">
          <Typography variant="h5">Entry</Typography>
          <JoditEditor
            value={formData.content}
            onChange={(newContent) =>
              setFormData({ ...formData, content: newContent })
            }
          />
        </div>
        <div className="tags">
          <Typography variant="h5">Tags</Typography>
          <TextField
            variant="outlined"
            placeholder="Tags"
            color="secondary"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
          />
        </div>
        <div className="journal-submit">
          <button onClick={handleUpload}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UserJournal;
