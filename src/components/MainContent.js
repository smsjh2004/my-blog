import React, { useState } from 'react';
import mockData from '../mockData.json'; // JSON 파일 import
import Pagination from './Pagenation'; // Pagination 컴포넌트 import
import styles from './MainContent.module.css';

const ITEMS_PER_PAGE = 6;

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 데이터 가져오기
  const currentData = mockData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.subtitle}>Stay in the loop with the latest about our products</p>

      <div className={styles.grid}>
        {currentData.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.img} alt={item.title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination 컴포넌트 연결 */}
      <Pagination
        totalItems={mockData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
