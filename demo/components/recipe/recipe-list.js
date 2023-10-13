// components/recipe/RecipeListComponent.js

import React, { useEffect, useState } from 'react';
import { getAllRecipes, getAllAllergens } from '../../helpers/db-util';
import RecipeItemComponent from './recipe-item';
import Link from 'next/link';

const RecipeListComponent = ({ categoryId, categoryName }) => {
  const [recipes, setRecipes] = useState([]);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesData = await getAllRecipes(0, 10);
        const allergensData = await getAllAllergens();
        setRecipes(recipesData);
        setAllergens(allergensData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Recipes for Category: {categoryName}</h2>
      {recipes.map((recipe, index) => (
        <Link key={index} href={`/preview/${index}`}>
          <a>
            <RecipeItemComponent recipe={recipe} allergens={allergens} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default RecipeListComponent;
