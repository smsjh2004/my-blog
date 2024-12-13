import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function TableOfContents({ toc }) {
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        position: 'sticky',
        top: '10px',
      }}
    >
      <Typography variant="h6" gutterBottom>
        목차
      </Typography>
      <List>
        {toc.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              padding: 0,
              marginBottom: 1,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <ListItemText primary={`${'  '.repeat(item.depth - 1)}${item.text}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
