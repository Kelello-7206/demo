// components/preview.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllRecipes, getAllAllergens } from '../helpers/db-util';
import RecipeItemComponent from './recipe/recipe-item';
import { Button, Grid } from '@mui/material';
import styled from '@emotion/styled';

const LoadMoreButton = styled(Button)`
  margin-top: 20px;
`;

const PreviewComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [recipes, setRecipes] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10; // Number of items to fetch per page

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipesData = await getAllRecipes(currentPage, pageSize);
        const allergensData = await getAllAllergens();

        setRecipes((prevRecipes) => [...prevRecipes, ...recipesData]);
        setAllergens(allergensData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchRecipeData();
    }
  }, [id, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Recipe Preview</h2>
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <RecipeItemComponent recipe={recipe} allergens={allergens} />
          </Grid>
        ))}
      </Grid>
      {recipes.length >= pageSize && (
        <LoadMoreButton variant="outlined" color="primary" onClick={handleLoadMore}>
          Load More
        </LoadMoreButton>
      )}
    </div>
  );
};

export default PreviewComponent;
