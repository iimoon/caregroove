import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  Paper,
  Typography
} from '@mui/material';

const UserDiaryView = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    // Fetch diary entries from your data source
    // Example using a mock API:
    fetch('/api/diaries')
      .then(response => response.json())
      .then(data => setDiaryEntries(data))
      .catch(error => console.error('Error fetching diary entries:', error));
  }, []);

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
            <TableRow key={entry.id}>
              <TableCell>{entry.title}</TableCell>
              <TableCell align="right">{entry.date}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary">
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

export default UserDiaryView;
