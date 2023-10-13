import React, { useEffect, useState } from 'react';
import { getAllRecipes, getAllAllergens } from '../../helpers/db-util';
import RecipeItemComponent from './recipe-item';
import { Grid } from '@mui/material';
import Link from 'next/link';

const RecipeListComponent = ({ categoryId, categoryName }) => {
  const [recipes, setRecipes] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesData = await getAllRecipes(currentPage, pageSize, categoryId);
        const allergensData = await getAllAllergens();
        setRecipes((prevRecipes) => [...prevRecipes, ...recipesData]);
        setAllergens(allergensData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryId, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Recipes for Category: {categoryName}</h2>
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link href={`/preview/${index}`}>
              <a>
                <RecipeItemComponent recipe={recipe} allergens={allergens} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      {recipes.length >= pageSize && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default RecipeListComponent;
