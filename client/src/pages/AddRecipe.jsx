import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!name.trim()) {
      alert('Recipe name is required.');
      return;
    }

    const ingredients = ingredientsText
      .split('\n')
      .map(i => i.trim())
      .filter(i => i);
    if (ingredients.length === 0) {
      alert('Please add at least one valid ingredient.');
      return;
    }

    const steps = stepsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s);
    if (steps.length === 0) {
      alert('Please add at least one valid step.');
      return;
    }

    const newRecipe = { name, ingredients, steps };

    try {
      const res = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) {
        throw new Error('Failed to save recipe');
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('There was an error saving the recipe.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Recipe Name:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chocolate Cake"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Ingredients (one per line):</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-28"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="e.g. 2 cups flour"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Steps (one per line):</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-28"
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
            placeholder="e.g. Preheat the oven to 350°F"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Save Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
