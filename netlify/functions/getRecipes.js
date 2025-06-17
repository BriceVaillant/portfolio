import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const RecipeSchema = new mongoose.Schema({}, { collection: 'recipelist' });
const Recipe = mongoose.model('Recipe', RecipeSchema);

export async function handler(request, context) {
  try {
    const recipes = await Recipe.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(recipes),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipes' }),
    };
  }
}