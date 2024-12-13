import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import mockData from '../mockData.json';
import styles from './MainContent.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 검색 필터 적용
  const filteredData = data.filter((item) =>
    item.title?.replace(/ /g, '').toLowerCase().includes(search.replace(/ /g, '').toLowerCase())
  );

  // 총 페이지 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // 현재 페이지 데이터
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };


  const handleCardClick = (id) => {
    navigate(`/posts/${id}`); // 상세 페이지로 이동
  };

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

 

  return (
    <div className={styles.mainContent}>
      <Typography variant="h1" className={styles.title}>
        Blog
      </Typography>
      <Typography className={styles.subtitle}>
        Persistence that knows no giving up.
      </Typography>

      {/* Search Field */}
      <Box className={styles.searchBox}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          value={search}
        />
      </Box>

      {/* Data Grid */}
      <div className={styles.grid}>
        {totalPages === 0 ? (
          <div>작성 된 글이 없습니다. </div>
        ): (
          currentData.map((card, index) => (
            <Card key={index} className={styles.card}>
              <CardMedia
                component="img"
                alt={card.title}
                image={card.mainImg}
                className={styles.cardImage}
                onClick={() => handleCardClick(card.id)}
              />
              <CardContent className={styles.cardContent}>
                <Typography variant="caption" className={styles.tag}>
                  {card.tag}
                </Typography>
                <Typography variant="h6" className={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={styles.description}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
        
      </div>

      {/* Pagination */}
      <Box className={styles.pagination}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
        />
      </Box>
    </div>
  );
}
