import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Container, Typography, Box, CircularProgress, Chip, IconButton, Grid2 } from '@mui/material';
import OtherPosts from '../components/OtherPost';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import TableOfContents from '../components/TableofContents';
// import { generateTableOfContents } from '../components/generateTableofContents';

export default function BlogView() {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate(); // 네비게이션 훅
  const [post, setPost] = useState(null);
  // const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        const postContent = response.data;

        setPost(postContent);

        // Markdown에서 목차 추출
        // const headings = await generateTableOfContents(postContent.content);
        // setToc(headings);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();

    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5">Post not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={4}>
        {/* 본문 */}
        <Grid2 item xs={12} md={8}>
          {/* 뒤로가기 버튼 */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'black' }}>
              <ArrowBackIcon />
            </IconButton>
          </Box>

          {/* 제목 */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            textAlign="center"
            mt={10}
            sx={{ fontWeight: 'bold' }}
          >
            {post.title}
          </Typography>

          {/* 태그와 작성일 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
              mb: 3,
              mt: 10,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              <b>파트라슈 - </b>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            <Chip label={post.tag} color="primary" />
          </Box>

          {/* 이미지 */}
          <Box
            component="img"
            src={post.mainImg}
            alt={post.title}
            sx={{
              width: '100%',
              maxWidth: '1280px',
              height: 'auto',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
              boxShadow: 3,
            }}
          />

          {/* 본문 렌더링 */}
          <Box
            sx={{
              typography: 'body1',
              lineHeight: 1.8,
              color: 'text.primary',
              mt: 4,
            }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Box>

          <OtherPosts currentPostId={id} />
        </Grid2>

        {/* 목차 */}
        {/* <Grid2 item xs={12} md={4}>
          <TableOfContents toc={toc} />
        </Grid2> */}
      </Grid2>
    </Container>
  );
}
