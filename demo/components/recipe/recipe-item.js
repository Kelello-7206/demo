// components/recipe/RecipeItemComponent.js

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
          Published: {recipe.published}
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
    </StyledCard>
  );
};

export default RecipeItemComponent;
