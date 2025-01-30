import { useState } from "react";
import ChefBody from "./components/chefbody";
import { NameContext } from "./components/context";
import Header from "./components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Component() {
  const [name, setName] = useState("Chef Claude");
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NameContext.Provider value={{ name, setName }}>
        <Header />
        <ChefBody />
      </NameContext.Provider>
    </QueryClientProvider>
  );
}

export default Component;
