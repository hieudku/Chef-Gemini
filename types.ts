
export interface RecipeOptions {
  diet: 'None' | 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Keto' | string;
  cuisine: 'Any' | 'Italian' | 'Mexican' | 'Indian' | 'Chinese' | 'Japanese' | 'Mediterranean' | string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | string;
}
