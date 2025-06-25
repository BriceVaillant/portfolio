import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let conn = null;
async function connectDB() {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI);
  }
}

// Define schema outside function
const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: String,
  name: String,
  savedRecipes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'Recipe' },
  createdRecipes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'Recipe' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    await connectDB();

    const { email, name, sub } = JSON.parse(event.body);

    let user = await User.findOne({ auth0Id: sub });

    if (!user) {
      user = await User.create({
        auth0Id: sub,
        email,
        name
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ user })
    };
  } catch (err) {
    console.error("Error syncing user:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get or create user' })
    };
  }
}