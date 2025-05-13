const RecipeCard = ({ recipe, onEdit, onDelete }) => (
  <div className="resep-card">
    <h3>{recipe.name}</h3>
    <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
    <p><strong>Steps:</strong> {recipe.steps.join(' ➜ ')}</p>
    <button onClick={() => onEdit(recipe)}>Edit</button>
    <button onClick={() => onDelete(recipe._id)}>Delete</button>
  </div>
);

export default RecipeCard;
