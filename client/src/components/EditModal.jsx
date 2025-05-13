import { useState, useEffect } from 'react';

const EditModal = ({ recipe, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    setName(recipe.name);
    setIngredients(recipe.ingredients.join('\n'));
    setSteps(recipe.steps.join('\n'));
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      _id: recipe._id,
      name: name.trim(),
      ingredients: ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    };

    onUpdate(updated);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          <label>Ingredients:</label>
          <textarea rows="5" value={ingredients} onChange={e => setIngredients(e.target.value)} />
          <label>Steps:</label>
          <textarea rows="5" value={steps} onChange={e => setSteps(e.target.value)} />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
