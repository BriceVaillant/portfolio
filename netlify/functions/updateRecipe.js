import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let conn = null;
async function connectDB() {
  if (!conn) conn = await mongoose.connect(process.env.MONGO_URI);
}

const RecipeSchema = new mongoose.Schema({
  title: String,
  type: String,
  ingredients: [String],
  favorite: { type: Boolean, default: false },
  instructions: String,
}, { collection: 'recipelist' });

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    await connectDB();

    const { _id, title, instructions, ingredients, type } = JSON.parse(event.body);

    if (!_id || !title || !instructions || !ingredients || !type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients.trim().split(/\s+/);

    const updatedRecipe = await Recipe.findByIdAndUpdate(_id, {
      title,
      instructions,
      ingredients: ingredientsArray,
      type,
    }, { new: true });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Recipe updated', recipe: updatedRecipe }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}