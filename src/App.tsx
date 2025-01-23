import { useState } from "react";
import "./App.css";
import ChefBody from "./components/chefbody";
import Header from "./components/header";
import { NameContext } from "./context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
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

export default App;
