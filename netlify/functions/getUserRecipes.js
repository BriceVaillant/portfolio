import mongoose from 'mongoose';
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
    const sub = body.sub;

    if (!sub) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing user ID' }),
      };
    }

    const recipes = await Recipe.find({ createdBy: sub });

    return {
      statusCode: 200,
      body: JSON.stringify(recipes),
    };
  } catch (err) {
    console.error('getRecipes error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipes', details: err.message }),
    };
  }
}