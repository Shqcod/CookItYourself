import { useEffect, useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import EditModal from './components/EditModal';
import './styles.css';

const API_URL = 'http://localhost:3000/api/recipes';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSave = async (recipe) => {
    const method = recipe._id ? 'PUT' : 'POST';
    const url = recipe._id ? `${API_URL}/${recipe._id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    setSelectedRecipe(null);
    fetchRecipes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchRecipes();
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const closeModal = () => setEditingRecipe(null);

  const handleUpdate = async (updatedRecipe) => {
    await fetch(`${API_URL}/${updatedRecipe._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe),
    });
    closeModal();
    fetchRecipes();
  };

  return (
    <div className="container">
      <h1>Cook It Yourself</h1>

      <div className="form-container">
        <RecipeForm onSave={handleSave} selectedRecipe={selectedRecipe} />
      </div>

      <div className="list-container">
        <h2>Recipe List</h2>
        <RecipeList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {editingRecipe && (
        <EditModal
          recipe={editingRecipe}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default App;
