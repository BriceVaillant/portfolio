const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const RecipeSchema = new mongoose.Schema({}, { collection: 'recipelist' });
const Recipe = mongoose.model('Recipe', RecipeSchema);

exports.handler = async function(request, context) {
  try {
    const recipes = await Recipe.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(recipes)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipes' })
    };
  }
};