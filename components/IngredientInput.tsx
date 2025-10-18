
import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onIngredientsChange }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    const trimmedIngredient = currentIngredient.trim();
    if (trimmedIngredient && !ingredients.some(i => i.toLowerCase() === trimmedIngredient.toLowerCase())) {
      onIngredientsChange([...ingredients, trimmedIngredient]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    onIngredientsChange(ingredients.filter(ing => ing !== ingredientToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., chicken breast, bell peppers"
          className="flex-grow bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleAddIngredient}
          className="flex-shrink-0 bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 transition-colors duration-200"
          aria-label="Add ingredient"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center gap-2 bg-slate-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="text-slate-400 hover:text-red-400"
              aria-label={`Remove ${ingredient}`}
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
