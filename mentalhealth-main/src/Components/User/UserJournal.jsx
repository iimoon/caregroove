import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './userjournal.css'
const UserJournal = () => {
  const [journalEntry, setJournalEntry] = useState("");

  const modules = {
    // Add or remove desired Quill modules here
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "blockquote",
    "code-block",
    "script",
    "direction",
  ];

  const handleChange = (content) => {
    setJournalEntry(content);
  };

  return (
    <div>
        <div className="journalintro">
            <Typography variant="h5">New diary entry</Typography>
        </div>
      <div className="journalmain-container">
        <div className="journal-header">
          <Typography variant="h5">Header Image</Typography>
          <input type="file" />
        </div>
        <div className="journal-intro">
          <Typography variant="h5">Enter approriate title</Typography>
          <TextField
            variant="outlined"
            placeholder="Title"
            color="secondary"
            sx={{ width: 1000 }}
          />
          <br />
        </div>
        <div className="quill-container">
          <Typography variant="h5">Entry</Typography>
          <ReactQuill
            value={journalEntry}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <div className="tags">
          <Typography variant="h5">Tags</Typography>
          <TextField variant="outlined" placeholder="tags" color="secondary" />
        </div>
        <div className="journal-submit">
            <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UserJournal;
