// components/categories/CategoriesComponent.js

import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../helpers/db-util';
import RecipeListComponent from '../recipe/recipe-list';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleCategoryClick(category)}>
            {category.category}
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <RecipeListComponent categoryId={selectedCategory._id} categoryName={selectedCategory.category} />
      )}
    </div>
  );
};

export default CategoriesComponent;
