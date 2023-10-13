// components/allergens/AllergensComponent.js

import React, { useEffect, useState } from 'react';
import { getAllAllergens } from '../../helpers/db-util';

const AllergensComponent = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allergensData = await getAllAllergens();
        setAllergens(allergensData);
      } catch (error) {
        console.error('Error fetching allergens:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Allergens</h2>
      <ul>
        {allergens.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllergensComponent;
