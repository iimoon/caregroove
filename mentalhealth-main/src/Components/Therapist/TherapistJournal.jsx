import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

const TherapistJournal = () => {
  const [formData, setFormData] = useState({
    therapistId: "",
    title: "",
    content: "",
    tags: "",
  });
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/therapist/journal/view")
  };
  const handleUpload = () => {
    const therapistId = localStorage.getItem("therapist_id");
    setFormData({ ...formData, therapistId: therapistId });
    axios
      .post("http://localhost:3007/therapist/addentry", formData)
      .then((response) => {
        alert("Entry saved!");
        setFormData({
          title: "",
          content: "",
          tags: "",
        });
      })
      .catch((error) => console.error("Error uploading journal entry:", error));
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
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>
        <div className="journal-submt">
          <Button variant="contained" onClick={handleUpload} color="secondary">
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleNavigate}>
            View Entries
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistJournal;
