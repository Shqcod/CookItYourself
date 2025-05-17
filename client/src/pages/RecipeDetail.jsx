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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>

      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Steps:</h3>
      <ol className="list-decimal list-inside mb-6">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to List
        </button>

        <button
          onClick={() => navigate(`/edit/${recipe._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
