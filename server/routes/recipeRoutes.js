const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a recipe
router.post('/', async (req, res) => {
  const { name, ingredients, steps } = req.body;
  if (!name || !ingredients.length || !steps.length) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const recipe = new Recipe({ name, ingredients, steps });
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update recipe by ID
router.put('/:id', async (req, res) => {
  const { name, ingredients, steps } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, ingredients, steps },
      { new: true } // Mengembalikan data yang sudah diperbarui
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
