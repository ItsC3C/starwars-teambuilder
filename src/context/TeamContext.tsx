// context/TeamContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import { Character } from "../types/StarwarsApi.types";

// Define the context type
interface TeamContextType {
  currentTeam: Character[]; // Array of characters in the current team
  setCurrentTeam: React.Dispatch<React.SetStateAction<Character[]>>; // Function to update the current team
}

// Create the context with the type
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

// Create a provider for the context
interface TeamProviderProps {
  children: ReactNode;
}

const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [currentTeam, setCurrentTeam] = useState<Character[]>([]);

  return (
    <TeamContext.Provider value={{ currentTeam, setCurrentTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export { TeamProvider, TeamContext };
