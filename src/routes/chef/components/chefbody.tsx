import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js"; // Import the Icon component
import Recipe from "./recipe";

import { IngredientType } from "./type";
import useGetRecipeFromGemini from "./query";

function ChefBody() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "",
    },
  });

  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [recipeShown, setRecipeShown] = useState<boolean>(false);
  const [enbledQuery, setEnbledQuery] = useState<boolean>(false);
  const { data, isLoading } = useGetRecipeFromGemini(ingredients, enbledQuery);

  console.log("Data response : ", data);
  function toggleRecipeShown() {
    setRecipeShown((prevShown) => !prevShown);
  }

  function onSubmit(data: IngredientType) {
    setIngredients([...ingredients, data]);
    console.log(data);
  }

  return (
    <div className="bg-cyan-950 h-screen p-8 flex flex-col relative overflow-hidden">
      {/* Background Icon */}
      <Icon
        icon="simple-icons:codechef" // Replace with your desired icon
        width="100%"
        height="70%"
        className="absolute top-5 left-0 opacity-50 z-0 pointer-events-none"
        style={{ color: "rgba(0, 0, 0, 0.1)" }} // Adjust opacity and color
      />

      {/* Form and Content */}
      <div className="relative z-10 flex-grow">
        <form className="flex gap-4 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-2/3">
            <FloatLabel>
              <Controller
                name="name"
                rules={{ required: "Ingredient name is required" }}
                control={control}
                render={({ field }) => (
                  <InputText
                    className="w-full focus:ring-1 focus:ring-cyan-300 border-cyan-200"
                    id="name"
                    {...field}
                  />
                )}
              />
              <label htmlFor="name">e.g add 4 Ingredients at least</label>
            </FloatLabel>
            {errors.name && (
              <span className="text-red-400 text-sm">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="w-2/3">
            <FloatLabel>
              <Controller
                name="quantity"
                rules={{ required: "quantity is required" }}
                control={control}
                render={({ field }) => (
                  <InputText
                    className="w-full focus:ring-1 focus:ring-cyan-300 border-cyan-200"
                    id="quantity"
                    {...field}
                  />
                )}
              />
              <label htmlFor="quantity">e.g Count</label>
            </FloatLabel>
            {errors.quantity && (
              <span className="text-red-400 text-sm">
                {errors.quantity.message as string}
              </span>
            )}
          </div>
          <Button
            label="Add ingredient"
            pt={{
              root: {
                className:
                  "bg-gradient-to-r from-cyan-300 to-blue-500 w-1/3 border-none focus:ring-1",
              },
            }}
            type="submit"
            style={{ height: "50px" }}
            icon="pi pi-plus"
            iconPos="left"
          />
        </form>

        <div className="mb-4 flex flex-col gap-5">
          <h1 className="text-2xl text-white font-thin">
            Ingredients on hand:
          </h1>
          <ul className="flex gap-5 flex-wrap justify-center">
            {ingredients.map((ingredient, index) => (
              <li
                className="font-bold bg-white p-5 rounded-xl hover:bg-gradient-to-r from-cyan-300 to-blue-500"
                key={index}
              >
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-r p-5 flex justify-between mb-20 from-cyan-300 to-blue-500 rounded-xl  relative z-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-white font-thin">Ready for a recipe?</h1>
          <p className="text-sm">
            Generate a recipe from your list of ingredients.
          </p>
        </div>
        <Button
          label="Generate a recipe"
          icon="pi pi-send"
          loading={isLoading}
          loadingIcon="pi pi-spin pi-spinner"
          disabled={ingredients.length > 3 ? false : true}
          onClick={() => {
            setEnbledQuery(true);
            toggleRecipeShown();
          }}
          pt={{
            root: {
              className:
                "h-25 gradient-to-r bg-gradient-to-r from-cyan-300 to-blue-500 border-white focus:ring-1 focus:ring-pink-300",
            },
          }}
        />
      </div>

      {data && <Recipe data={data} recipeShown={recipeShown} />}
    </div>
  );
}

export default ChefBody;
