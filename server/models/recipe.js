const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  steps: [String]
}, { timestamps: true });

module.exports = mongoose.model('recipe', recipeSchema);
