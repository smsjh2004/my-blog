import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Input } from '@mui/material';

export default function BlogAdd() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a Markdown file.');
      return;
    }

    const formData = new FormData();
    formData.append('markdown', file);

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Post added successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 4,
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Post
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Input
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: '.md' }} // Markdown 파일만 허용
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Post'}
      </Button>
    </Box>
  );
}
