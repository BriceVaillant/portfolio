import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGO_URI);

const RecipeSchema = new mongoose.Schema({}, { collection: 'recipelist' });
const Recipe = mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Recipe not found' }),
      };
    }

    if (recipe.imagePublicId) {
      await cloudinary.uploader.destroy(recipe.imagePublicId);
    }

    await Recipe.findByIdAndDelete(id);

    return { statusCode: 200, body: JSON.stringify({ message: 'Recipe deleted' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
}