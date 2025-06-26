import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const RecipeSchema = new mongoose.Schema({}, { collection: 'recipelist' });
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {
  
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { sub, favorites } = body;

    if (!sub) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing user ID' }),
      };
    }

    const createdRecipes = await Recipe.find({ createdBy: sub });

    let favoritedRecipes = [];
    if (Array.isArray(favorites) && favorites.length > 0) {
      const favoriteObjectIds = favorites.map(id => new Types.ObjectId(id));
      favoritedRecipes = await Recipe.find({ _id: { $in: favoriteObjectIds } });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        createdRecipes,
        favoritedRecipes
      }),
    };
  } catch (err) {
    console.error('getRecipes error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipes', details: err.message }),
    };
  }
}