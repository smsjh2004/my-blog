import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          margin: '0 5px',
          padding: '10px 15px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        {'<'}
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          style={{
            margin: '0 5px',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: currentPage === index + 1 ? '#1976d2' : '#fff',
            color: currentPage === index + 1 ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          margin: '0 5px',
          padding: '10px 15px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        {'>'}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
