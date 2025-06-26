// netlify/functions/makeFavorite.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let conn = null;
async function connectDB() {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI);
  }
}

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  createdRecipes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'Recipe' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', userSchema);


export async function handler(event) {
    

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    await connectDB();
    const { userSub, recipeId } = JSON.parse(event.body);

    if (!userSub || !recipeId) {
      return { statusCode: 400, body: 'Missing user or recipe ID' };
    }

    const recipeObjectId = new mongoose.Types.ObjectId(recipeId);

    const user = await User.findOne({ auth0Id: userSub });

    if (!user) {
      return { statusCode: 404, body: 'User not found' };
    }

    const alreadyFavorited = user.favorites.some(
      (id) => id.toString() === recipeObjectId.toString()
    );

    const updatedUser = await User.findOneAndUpdate(
  { auth0Id: userSub },
  alreadyFavorited
    ? { $pull: { favorites: recipeObjectId } }
    : { $addToSet: { favorites: recipeObjectId } },
  { new: true }
);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: alreadyFavorited ? 'Removed from favorites' : 'Added to favorites',
        user: updatedUser
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message }),
    };
  }
}