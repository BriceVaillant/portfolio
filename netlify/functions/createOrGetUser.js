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
// Define schema outside function
const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  favorites: [mongoose.Schema.Types.ObjectId],
  createdRecipes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'Recipe' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

export async function handler(event) {
  const auth0User = JSON.parse(event.body);
  const auth0Id = auth0User.sub;

  if (!auth0Id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing user ID" }) };
  }

  try {
    await connectDB();

    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = await User.create({ auth0Id, favorites: [], createdRecipes: [] });

      console.log("Created new user:", user);
    } else {
      console.log("User already exists:", user);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ user })
    };
  } catch (err) {
    console.error("Database error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to sync user' })
    };
  }
}