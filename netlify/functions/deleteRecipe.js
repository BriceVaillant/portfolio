import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const RecipeSchema = new mongoose.Schema({}, { collection: 'recipelist' });
const Recipe = mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);
    await Recipe.findByIdAndDelete(id);
    return { statusCode: 200, body: JSON.stringify({ message: 'Recipe deleted' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}