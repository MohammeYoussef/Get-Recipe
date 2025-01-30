export type RecipeType = {
  recipeName: string; // Name of the recipe
  ingredients: IngredientType[]; // Array of ingredients
  instructions: string[]; // Array of instructions (steps)
  servingSize: string; // Serving size (e.g., "2 servings")
  preparationTime: string; // Preparation time (e.g., "30 minutes")
};
export type IngredientType = {
  name: string; // Name of the ingredient
  quantity: string; // Quantity of the ingredient (e.g., "2 medium", "1 cup")
};

export type RecipeProps = {
  recipeShown: boolean;
  data: RecipeType;
};
