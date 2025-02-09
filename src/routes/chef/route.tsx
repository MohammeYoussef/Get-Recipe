import { useState } from "react";
import ChefBody from "./components/chefbody";
import { NameContext } from "./components/context";
import Header from "./components/header";

function Component() {
  const [name, setName] = useState("Chef Claude");

  return (
    <NameContext.Provider value={{ name, setName }}>
      <Header />
      <ChefBody />
    </NameContext.Provider>
  );
}

export default Component;
