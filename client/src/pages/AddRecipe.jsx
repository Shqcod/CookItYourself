import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Recipe name is required.');
      return;
    }

    const ingredients = ingredientsText.split('\n').map(i => i.trim()).filter(i => i);
    const steps = stepsText.split('\n').map(s => s.trim()).filter(s => s);

    if (ingredients.length === 0 || steps.length === 0) {
      alert('Please add at least one valid ingredient and step.');
      return;
    }

    const newRecipe = { name, ingredients, steps };

    try {
      const res = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) throw new Error('Failed to save recipe');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error saving the recipe.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-orange-50 to-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">🍰 Add New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">Recipe Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chocolate Cake"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">Ingredients (one per line)</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-3 rounded-xl h-32 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="e.g. 2 cups flour"
          />
        </div>

        {/* Steps */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">Steps (one per line)</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-3 rounded-xl h-32 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
            placeholder="e.g. Preheat the oven to 350°F"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2 rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5"
          >
            Save Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl shadow-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
