import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import axios from 'axios';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // 화살표 아이콘

export default function OtherPosts({ currentPostId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        // 현재 글은 제외하고 다른 글만 필터링
        const filteredPosts = response.data.filter((post) => post.id !== parseInt(currentPostId));
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPostId]);

  return (
    <Box sx={{ mt: 20 }}>
      <Typography variant="h6" gutterBottom>
        다른글 보러가기기
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            component={Link}
            to={`/posts/${post.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <ListItemText primary={post.title} secondary={new Date(post.created_at).toLocaleDateString()} />
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
