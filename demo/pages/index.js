import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllRecipes } from '../helpers/db-util';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesData = await getAllRecipes(0, 10);
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <Link href={`/preview/${index}`}>
              <a>{`Preview Recipe ${index + 1}`}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
