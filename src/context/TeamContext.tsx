import React, { createContext, useState, ReactNode, useContext } from "react";
import { Character } from "../types/StarwarsApi.types";

interface TeamContextType {
  currentTeam: Character[];
  setCurrentTeam: React.Dispatch<React.SetStateAction<Character[]>>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

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
