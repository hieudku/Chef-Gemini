
import { GoogleGenAI } from "@google/genai";
import { RecipeOptions } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(ingredients: string[], options: RecipeOptions): string {
  const ingredientsList = ingredients.map(ing => `- ${ing}`).join('\n');

  let prompt = `You are a world-class chef who creates simple, delicious recipes for home cooks. Your task is to generate a recipe based on the ingredients provided and user preferences.

Please follow these instructions:
1.  **Analyze the Ingredients**: The primary ingredients are listed below. Use as many of them as possible.
2.  **Assume Staples**: Assume the user has common kitchen staples like salt, pepper, oil, water, and basic spices. You can include these in the recipe.
3.  **Adhere to Preferences**: Strictly follow the dietary, cuisine, and meal type preferences.
4.  **Format the Output**: The entire response must be in Markdown format. Use headings, bold text, and lists to make it easy to read.

Here are the details for the recipe request:

**Available Ingredients:**
${ingredientsList}

**Preferences:**
- **Dietary Restriction:** ${options.diet}
- **Cuisine Type:** ${options.cuisine}
- **Meal Type:** ${options.mealType}

**Required Markdown Output Structure:**

# [Creative Recipe Title]

**Description:** A brief, enticing paragraph about the dish.

**Prep Time:** [e.g., 15 minutes]
**Cook Time:** [e.g., 25 minutes]
**Total Time:** [e.g., 40 minutes]
**Servings:** [e.g., 4 servings]

## Ingredients
- [Quantity] [Unit] [Ingredient Name]
- ...

## Instructions
1.  [First step]
2.  [Second step]
3.  ...

## Chef's Notes (Optional)
- A tip for variation or serving suggestion.

Now, generate the recipe.
`;

  return prompt;
}

export async function generateRecipe(ingredients: string[], options: RecipeOptions): Promise<string> {
  const prompt = buildPrompt(ingredients, options);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating recipe from Gemini API:", error);
    throw new Error("Failed to generate recipe. The model may be unavailable or the request was invalid.");
  }
}
