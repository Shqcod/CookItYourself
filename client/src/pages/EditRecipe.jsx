import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3001/recipes/${id}`);
        const data = await res.json();
        setName(data.name);
        setIngredientsText(data.ingredients.join('\n'));
        setStepsText(data.steps.join('\n'));
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Recipe name is required.');
      return;
    }

    const ingredients = ingredientsText
      .split('\n')
      .map(i => i.trim())
      .filter(i => i);
    if (ingredients.length === 0) {
      alert('Please provide at least one valid ingredient.');
      return;
    }

    const steps = stepsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s);
    if (steps.length === 0) {
      alert('Please provide at least one valid step.');
      return;
    }

    const updatedRecipe = { name, ingredients, steps };

    try {
      const res = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });

      if (!res.ok) throw new Error('Failed to update recipe');

      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('There was an error updating the recipe.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Recipe Name:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Ingredients (one per line):</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-28"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Steps (one per line):</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-28"
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipe/${id}`)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
