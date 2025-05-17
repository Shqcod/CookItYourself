import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  // Truncate ingredients list to show only first few
  const truncatedIngredients = recipe.ingredients.slice(0, 3).join(', ');
  const hasMoreIngredients = recipe.ingredients.length > 3;

  return (
    <div className="resep-card h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <h3 className="recipe-name text-xl font-semibold mb-2">{recipe.name}</h3>
        <p className="text-sm text-amber-800 mb-2">
          {recipe.ingredients.length} ingredients • {recipe.steps.length} steps
        </p>
        <p className="mb-4 text-gray-700">
          Ingredients: {truncatedIngredients}
          {hasMoreIngredients ? '...' : ''}
        </p>
        <button
          onClick={() => navigate(`/recipe/${recipe._id}`)}
          className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;