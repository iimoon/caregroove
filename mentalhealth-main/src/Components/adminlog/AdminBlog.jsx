// import { useState } from 'react';
// import { Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
// import { EditorState, RichUtils } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import axios from 'axios';
// import stateToHTML from 'draft-js-export-html';

// const initialEditorState = EditorState.createEmpty();

// const AdminBlog = () => {
//  const [title, setTitle] = useState('');
//  const [editorState, setEditorState] = useState(initialEditorState);
//  const [image, setImage] = useState(null);
//  const [category, setCategory] = useState('');
//  const [isLoading, setIsLoading] = useState(false);
//  const [error, setError] = useState(null);

//  const handleContentChange = (contentState) => {
//     setEditorState(contentState);
//  };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       const contentHTML = stateToHTML(editorState.getCurrentContent());
//       formData.append('content', contentHTML);
//       formData.append('category', category);
//       if (image) {
//         formData.append('image', image);
//       }

//       const response = await axios.post('/createblog', formData);

//       if (response.data.success) {
//         clearFormFields();
//         alert('Blog added successfully!');
//       } else {
//         setError(response.data.message || 'Adding blog failed');
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//  };

//  const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//  };

//  const clearFormFields = () => {
//     setTitle('');
//     setEditorState(initialEditorState);
//     setImage(null);
//     setCategory('');
//  };

//  return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>Add Blog</Typography>
//       {error && <Alert severity="error">{error}</Alert>}
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Editor
//               editorState={editorState}
//               toolbar={{
//                 options: ['inline', 'fontSize', 'fontFamily', 'list'],
//               }}
//               onChange={handleContentChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel id="category-label">Category</InputLabel>
//               <Select
//                 labelId="category-label"
//                 id="category-select"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 label="Category"
//               >
//                 <MenuItem value="">Select Category</MenuItem>
//                 <MenuItem value="Technology">Technology</MenuItem>
//                 <MenuItem value="Lifestyle">Lifestyle</MenuItem>
//                 <MenuItem value="Business">Business</MenuItem>
//                 {/* Add more categories as needed */}
//               </Select>
//            </FormControl>
//            </Grid>
//            <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel id="category-label">Category</InputLabel>
//               <Select
//                 labelId="category-label"
//                 id="category-select"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 label="Category"
//               >
//                 <MenuItem value="">Select Category</MenuItem>
//                 <MenuItem value="Technology">Technology</MenuItem>
//                 <MenuItem value="Lifestyle">Lifestyle</MenuItem>
//                 <MenuItem value="Business">Business</MenuItem>
//                 {/* Add more categories as needed */}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <input
//               accept="image/*"
//               id="image-upload"
//               type="file"
//               onChange={handleImageChange}
//               style={{ display: 'none' }}
//             />
//             <label htmlFor="image-upload">
//               <Button variant="outlined" component="span">
//                 Upload Image
//               </Button>
//             </label>
//             {image && (
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                 Image selected: {image.name}
//               </Typography>
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//             >
//               {isLoading ? <CircularProgress size={24} /> : 'Add Blog'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default AdminBlog;
