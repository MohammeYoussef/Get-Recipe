import { Accordion, AccordionTab } from "primereact/accordion";
import type { RecipeProps } from "./type";

function Recipe({ recipeShown, data }: RecipeProps) {
  console.log(data);
  return (
    recipeShown && (
      <div className="card ">
        <Accordion activeIndex={0}>
          <AccordionTab
            header={
              data?.recipeName +
              ", Preparation Time : " +
              data.preparationTime +
              ", Is serve for " +
              data.servingSize
            }
          >
            <h2 className="text-2xl">Ingredients and Quantities : </h2>
            <ul className="mt-1">
              {data.ingredients.map((item, index) => (
                <li className="" key={index}>
                  {item.name} : {item.quantity}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl">Instructions: </h2>
            <ul className="mt-1">
              {data.instructions.map((item, index) => (
                <li className="" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </AccordionTab>
        </Accordion>
      </div>
    )
  );
}

export default Recipe;
