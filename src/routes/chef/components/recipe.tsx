import { Accordion, AccordionTab } from "primereact/accordion";
import type { RecipeProps } from "./type";

function Recipe({ recipeShown, data }: RecipeProps) {
  console.log(data);
  return (
    recipeShown && (
      <div className="card -mt-20 ">
        <Accordion activeIndex={0}>
          <AccordionTab header={data?.recipeName}>
            <p className="m-0">
              <ul>
                {data.ingredients.map((item, index) => (
                  <li key={index}>
                    {item.name} : {item.quantity}
                  </li>
                ))}
              </ul>
            </p>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    )
  );
}

export default Recipe;
