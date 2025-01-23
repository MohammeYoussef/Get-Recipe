import { QueryKeys } from "./../../utils/constants/QueryEnums";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { IngredientType, RecipeType } from "./type";

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const useGetRecipeFromGemini = (
  ingredients: IngredientType[],
  enabled: boolean
): UseQueryResult<RecipeType> => {
  const toast = useRef<Toast>(null);
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail:
        "An error occurred while processing your request. Please try again later.",
      life: 3000,
    });
  };
  // Construct the ingredients string with name and quantity
  const ingredientsString = ingredients
    .map((ingredient) => `${ingredient.quantity} ${ingredient.name}`)
    .join(", ");
  const prompt =
    "I have the following ingredients with quantity: " +
    ingredientsString +
    " " +
    "Can you suggest a recipe that uses these ingredients?\n" +
    "Please provide the response in the following JSON format without additional text like ```json:\n" +
    "{\n" +
    '  "recipeName": "Name of the recipe",\n' +
    '  "ingredients": [\n' +
    '    { "name": "Ingredient 1", "quantity": "Quantity" },\n' +
    '    { "name": "Ingredient 2", "quantity": "Quantity" }\n' +
    "  ],\n" +
    '  "instructions": [\n' +
    '    "Step 1: ...",\n' +
    '    "Step 2: ..."\n' +
    "  ],\n" +
    '  "servingSize": "Number of servings",\n' +
    '  "preparationTime": "Estimated time"\n' +
    "};";

  console.log(prompt);
  return useQuery({
    enabled: enabled,
    queryKey: [QueryKeys.RECIPES, ingredients], // Include ingredients in the query key
    queryFn: async () => {
      const genAI = new GoogleGenerativeAI(VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log("Raw API Response:", responseText); // Log the raw response for debugging

      // Remove Markdown formatting (e.g., ```json and ```)
      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();

      // Parse the cleaned response into JSON
      try {
        const jsonResponse = JSON.parse(cleanedResponse);
        return jsonResponse; // Return the parsed JSON
      } catch {
        showError();
      }
    },
  });
};

export default useGetRecipeFromGemini;
