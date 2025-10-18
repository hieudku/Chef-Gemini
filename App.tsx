
import React, { useState, useCallback } from 'react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { generateRecipe } from './services/geminiService';
import { RecipeOptions } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [options, setOptions] = useState<RecipeOptions>({
    diet: 'None',
    cuisine: 'Any',
    mealType: 'Dinner',
  });
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const result = await generateRecipe(ingredients, options);
      setRecipe(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, options]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
            Chef Gemini
          </h1>
          <p className="text-slate-400 text-lg">What's in your fridge? Let's cook something amazing!</p>
        </header>

        <main className="space-y-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">1. Add Your Ingredients</h2>
            <IngredientInput ingredients={ingredients} onIngredientsChange={setIngredients} />
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">2. Set Your Preferences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="diet" className="block text-sm font-medium text-slate-300 mb-1">Dietary Restriction</label>
                <select 
                  id="diet" 
                  value={options.diet} 
                  onChange={(e) => setOptions(prev => ({ ...prev, diet: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>None</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                  <option>Keto</option>
                </select>
              </div>
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-slate-300 mb-1">Cuisine Type</label>
                <select 
                  id="cuisine" 
                  value={options.cuisine}
                  onChange={(e) => setOptions(prev => ({ ...prev, cuisine: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Any</option>
                  <option>Italian</option>
                  <option>Mexican</option>
                  <option>Indian</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                  <option>Mediterranean</option>
                </select>
              </div>
              <div>
                <label htmlFor="mealType" className="block text-sm font-medium text-slate-300 mb-1">Meal Type</label>
                <select 
                  id="mealType"
                  value={options.mealType}
                  onChange={(e) => setOptions(prev => ({ ...prev, mealType: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Dessert</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
            >
              <SparklesIcon />
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 min-h-[200px]">
             <h2 className="text-2xl font-bold mb-4 text-emerald-400">3. Your Recipe</h2>
             <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
