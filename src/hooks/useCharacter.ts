import useSWR from "swr";
import { fetcher } from "../utils/helpers";
import { Character } from "../types/StarwarsApi.types";

// Hook to fetch character data by ID
export const useCharacter = (id: string | undefined) => {
  // Ensure that id is defined before fetching
  const { data, error, isLoading } = useSWR<Character | null>(
    id ? `https://akabab.github.io/starwars-api/api/id/${id}.json` : null,
    fetcher
  );

  return {
    character: data,
    isLoading,
    error,
  };
};
