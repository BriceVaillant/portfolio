//netlify/functions/addRecipe.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//MongoDB connection
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
  favorite: { type: Boolean, default: false },
  instructions: String,
  image: String,
  imagePublicId: String,
  createdBy: { type: String, required: true }
}, { collection: 'recipelist' });

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    await connectDB();

    const { type, title, ingredients, instructions, image = '', imagePublicId = '', userSub } = JSON.parse(event.body);

    if (!title || !type || !ingredients || !instructions) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields',
        }),
      };
    }

    const newRecipe = await Recipe.create({ type, title, ingredients, instructions, image, imagePublicId,  createdBy: userSub });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Recipe saved', recipe: newRecipe }),
    };
  } catch (err) {
    console.error('Error saving recipe:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message }),
    };
  }
};