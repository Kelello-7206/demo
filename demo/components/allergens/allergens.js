import React, { useEffect, useState } from 'react';
import { getAllAllergens } from '../../helpers/db-util';
import { Button } from '@mui/material';

const AllergensComponent = () => {
  const [allergens, setAllergens] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const fetchAllergens = async () => {
    try {
      const allergensData = await getAllAllergens(currentPage, pageSize);
      setAllergens((prevAllergens) => [...prevAllergens, ...allergensData]);
    } catch (error) {
      console.error('Error fetching allergens:', error);
    }
  };

  useEffect(() => {
    fetchAllergens();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Allergens</h2>
      <ul>
        {allergens.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>
      {allergens.length >= pageSize && (
        <Button variant="outlined" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default AllergensComponent;
