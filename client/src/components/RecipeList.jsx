const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <div>
      {recipes.map(recipe => (
        <div className="resep-card" key={recipe._id}>
          <div className="recipe-name">{recipe.name}</div>

          <p><strong>Ingredients:</strong><br />
            {recipe.ingredients.map((item, idx) => (
              <span key={idx}>• {item}<br /></span>
            ))}
          </p>

          <p><strong>Steps:</strong><br />
            {recipe.steps.map((step, idx) => (
              <span key={idx}>{idx + 1}. {step}<br /></span>
            ))}
          </p>

          <button className="edit-btn" onClick={() => onEdit(recipe)}>Edit</button>
          <button className="remove-btn" onClick={() => onDelete(recipe._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


export default RecipeList;
