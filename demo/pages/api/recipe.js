// pages/api/recipe.js
import { getAllRecipes } from '../../helpers/db-util';

export default async (req, res) => {
  const { categoryId } = req.query;

  try {
    const recipesData = await getAllRecipes(0, 10, categoryId);
    res.status(200).json(recipesData);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
