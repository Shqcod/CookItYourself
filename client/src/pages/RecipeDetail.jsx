import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3001/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    // Use window.confirm instead of global confirm
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await fetch(`http://localhost:3001/recipes/${recipe._id}`, {
          method: 'DELETE',
        });
        navigate('/');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  if (!recipe) return <div className="text-center mt-10">Loading...</div>;

  return (
  <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-6 font-sans">
    <div className="bg-amber-50 max-w-2xl w-full rounded-3xl shadow-lg p-8 border border-yellow-300">
      <h2 className="text-4xl font-extrabold text-orange-500 mb-8 text-center uppercase tracking-wide">
        {recipe.name}
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-1">Bahan-bahan</h3>
        <div className="bg-white border border-yellow-200 rounded-md p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap">
          {recipe.ingredients.map((item, index) => `- ${item}\n`)}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-1">Langkah-langkah</h3>
        <div className="bg-white border border-yellow-200 rounded-md p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap">
          {recipe.steps.map((step, index) => `${index + 1}. ${step}\n`)}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate('/')}
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
        >
          Back to List
        </button>
        <button
          onClick={() => navigate(`/edit/${recipe._id}`)}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-full transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

};

export default RecipeDetail;
