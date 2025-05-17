const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
    validate: v => Array.isArray(v) && v.length > 0
  },
  steps: {
    type: [String],
    required: [true, 'Steps are required'],
    validate: v => Array.isArray(v) && v.length > 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
