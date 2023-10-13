// helpers/db-util.js

import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function connectDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return cachedClient;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Unable to connect to the database');
  }
}

export async function getAllAllergens() {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const allergens = db.collection('allergens');

    const documents = await allergens.find().toArray();
    return documents;
  } catch (error) {
    console.error('Error getting allergens from MongoDB:', error);
    throw new Error('Unable to retrieve allergens');
  }
}

export async function getAllCategories() {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const categories = db.collection('categories');

    const documents = await categories.find().toArray();
    return documents;
  } catch (error) {
    console.error('Error getting categories from MongoDB:', error);
    throw new Error('Unable to retrieve categories');
  }
}

export async function getAllRecipes(page, pageSize) {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const recipes = db.collection('recipes');

    const documents = await recipes.find().skip(page * pageSize).limit(pageSize).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting recipes from MongoDB:', error);
    throw new Error('Unable to retrieve recipes');
  }
}
