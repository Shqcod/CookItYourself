import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h2 className="text-lg font-semibold">{recipe.name}</h2>
      <p className="text-sm text-gray-600">
        {recipe.ingredients.length} ingredients • {recipe.steps.length} steps
      </p>
      <p className="text-sm mt-2 text-gray-700 line-clamp-2">
        Ingredients: {recipe.ingredients.join(', ')}
      </p>
      <button
        onClick={() => navigate(`/recipe/${recipe._id}`)}
        className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
      >
        View Recipe
      </button>
    </div>
  );
};

export default RecipeCard;
