// components/PreviewComponent.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllRecipes, getAllAllergens } from '../helpers/db-util';
import RecipeItemComponent from './recipe/RecipeItemComponent';

const PreviewComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState(null);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipesData = await getAllRecipes(0, 10);
        const allergensData = await getAllAllergens();

        if (id >= 0 && id < recipesData.length) {
          setRecipe(recipesData[id]);
          setAllergens(allergensData);
        } else {
          console.error('Invalid recipe ID:', id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  return (
    <div>
      <h2>Recipe Preview</h2>
      {recipe ? <RecipeItemComponent recipe={recipe} allergens={allergens} /> : <p>Loading recipe...</p>}
    </div>
  );
};

export default PreviewComponent;
