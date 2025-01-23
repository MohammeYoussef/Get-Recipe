import { createContext, useContext } from "react";
type NameContextType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
export const NameContext = createContext<NameContextType | undefined>(
  undefined
);

export function useNameContext() {
  const context = useContext(NameContext);
  if (context === undefined) {
    throw new Error("useNameContext must be used within a NameContextProvider");
  }
  return context;
}
