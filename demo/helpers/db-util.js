import { MongoClient } from 'mongodb';

const DATABASE_URL = process.env.MONGO_URI;

let cachedClient = null;

export async function connectDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return cachedClient;
  }

  try {
    const client = await MongoClient.connect(DATABASE_URL, {
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

export async function getAllAllergens(page, pageSize) {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const allergens = db.collection('allergens');

    const documents = await allergens.find().skip(page * pageSize).limit(pageSize).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting allergens from MongoDB:', error);
    throw new Error('Unable to retrieve allergens');
  }
}

export async function getAllCategories(page, pageSize) {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const categories = db.collection('categories');

    const documents = await categories.find().skip(page * pageSize).limit(pageSize).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting categories from MongoDB:', error);
    throw new Error('Unable to retrieve categories');
  }
}

export async function getAllRecipes(page, pageSize, categoryId) {
  try {
    const client = await connectDatabase();
    const db = client.db();
    const recipes = db.collection('recipes');

    let query = {};  // Initial query

    if (categoryId) {
      query.categoryId = categoryId;  // Modify the query to include categoryId
    }

    const documents = await recipes.find(query).skip(page * pageSize).limit(pageSize).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting recipes from MongoDB:', error);
    throw new Error('Unable to retrieve recipes');
  }
}
