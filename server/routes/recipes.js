const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// GET recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: 'Invalid recipe ID' });
  }
});

// POST new recipe
router.post('/', async (req, res) => {
  try {
    const { name, ingredients, steps } = req.body;
    if (!name || !ingredients?.length || !steps?.length) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newRecipe = new Recipe({ name, ingredients, steps });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT update recipe
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Recipe not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update recipe' });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Recipe not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
