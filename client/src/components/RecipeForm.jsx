import { useState, useEffect } from 'react';

const RecipeForm = ({ onSave, selectedRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    if (selectedRecipe) {
      setName(selectedRecipe.name);
      setIngredients(selectedRecipe.ingredients.join('\n'));
      setSteps(selectedRecipe.steps.join('\n'));
    } else {
      setName('');
      setIngredients('');
      setSteps('');
    }
  }, [selectedRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
      name: name.trim(),
      ingredients: ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    };

    if (selectedRecipe?._id) {
      recipe._id = selectedRecipe._id;
    }

    onSave(recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} required />
      <label>Ingredients (one per line):</label>
      <textarea rows="5" value={ingredients} onChange={e => setIngredients(e.target.value)} />
      <label>Steps (one per line):</label>
      <textarea rows="5" value={steps} onChange={e => setSteps(e.target.value)} />
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;
