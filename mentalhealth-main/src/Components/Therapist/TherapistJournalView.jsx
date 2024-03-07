import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TherapistJournalView = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const therapistId = localStorage.getItem("therapist_id");
    if (!therapistId) return;

    fetch(`http://localhost:3007/therapist/diaries/${therapistId}`)
      .then((response) => response.json())
      .then((data) => setDiaryEntries(data))
      .catch((error) => console.error("Error fetching diary entries:", error));
  }, []);

  const handleView = (diaryEntryId) => {
    navigate(`/therapist/journal/read/${diaryEntryId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diaryEntries.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.title}</TableCell>
              <TableCell align="right">
                {new Date(entry.created_at).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleView(entry._id)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!diaryEntries.length && (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          No diary entries found.
        </Typography>
      )}
    </TableContainer>
  );
};

export default TherapistJournalView;
