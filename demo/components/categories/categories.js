import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../helpers/db-util';
import { Button } from '@mui/material';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories(currentPage, pageSize);
      setCategories((prevCategories) => [...prevCategories, ...categoriesData]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => console.log('Category clicked:', category)}>
            {category.category}
          </li>
        ))}
      </ul>
      {categories.length >= pageSize && (
        <Button variant="outlined" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default CategoriesComponent;
