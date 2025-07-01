import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let conn = null;
async function connectDB() {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI);
  }
}

const IngredientSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  unit: String,
  _id: false
});

const RecipeSchema = new mongoose.Schema({
  title: String,
  type: String,
  ingredients: [IngredientSchema],
  instructions: String,
  image: String,
  imagePublicId: String,
  createdBy: { type: String, required: true }
}, { collection: 'recipelist' });
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {

  try {

    await connectDB();

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    const { sub, favorites } = JSON.parse(event.body || '{}');

    if (!sub) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing user ID' }),
      };
    }

    const createdRecipes = await Recipe.find({ createdBy: sub });

    let favoritedRecipes = [];
    if (Array.isArray(favorites) && favorites.length > 0) {
      const favoriteObjectIds = favorites.map(id => new mongoose.Types.ObjectId(id));
      favoritedRecipes = await Recipe.find({ _id: { $in: favoriteObjectIds } });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        createdRecipes: createdRecipes || [],
        favoritedRecipes: favoritedRecipes || [],
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