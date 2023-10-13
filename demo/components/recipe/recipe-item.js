// components/recipe/recipe-item.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
`;

useEffect(() => {
  const fetchData = async () => {
    try {
      // Modify the getAllRecipes call to include categoryId
      const recipesData = await getAllRecipes(0, 10, categoryId);
      const allergensData = await getAllAllergens();
      setRecipes(recipesData);
      setAllergens(allergensData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [categoryId]); // Add categoryId to the dependency array


const RecipeItemComponent = ({ recipe, allergens }) => {
  const hasAllergen = allergens.some((allergen) => recipe.tags.includes(allergen));

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Description: {recipe.description}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Prep Time: {recipe.prep} min
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Cook Time: {recipe.cook} min
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Category: {recipe.category}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Servings: {recipe.servings}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Published: {new Date(recipe.published).toLocaleDateString()}
        </Typography>

        <Typography color="text.secondary" gutterBottom>
          Tags:
        </Typography>
        <StyledList>
          {recipe.tags.map((tag, index) => (
            <StyledListItem key={index}>
              {tag} {hasAllergen && <span>(Contains allergen)</span>}
            </StyledListItem>
          ))}
        </StyledList>
      </CardContent>
      {recipe.images && recipe.images.length > 0 && (
        <StyledImage src={recipe.images[0]} alt={recipe.title} />
      )}
      {/* Display other recipe information like ingredients, instructions, nutrition, etc. */}
      {/* Add appropriate UI components to display these details */}
      {/* Example: */}
      {/* <Typography color="text.secondary" gutterBottom>
        Ingredients: {recipe.ingredients.join(', ')}
      </Typography> */}
    </StyledCard>
  );
};

export default RecipeItemComponent;
