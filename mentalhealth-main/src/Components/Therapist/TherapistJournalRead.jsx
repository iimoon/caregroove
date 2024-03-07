import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"; // Import DOMPurify

const TherapistJournalRead = () => {
  const { diaryEntryId } = useParams(); // Get the diaryEntryId from the URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch diary entry content based on the diaryEntryId
    axios
      .get(`http://localhost:3007/therapist/diary/${diaryEntryId}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((error) =>
        console.error("Error fetching diary entry content:", error)
      );
  }, [diaryEntryId]);

  return (
    <div className="journal-read-container">
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></div>
    </div>
  );
};

export default TherapistJournalRead;
