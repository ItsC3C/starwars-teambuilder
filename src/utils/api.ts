import useSWR from "swr";
import { useState, useEffect } from "react";

const API_URL = "https://akabab.github.io/starwars-api/api/all.json";

// Fetcher function for handling data fetching
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// Hook for automatic fetching of all characters using SWR
export function useStarWarsCharacters() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);
  return { data, error, isLoading };
}

// Custom hook to fetch a character by ID
export function useStarWarsCharacterById(id: number | null) {
  const { data, error, isLoading } = useStarWarsCharacters();

  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (!id || !data) return;

    // Find the character by ID from fetched data
    const foundCharacter = data.find((character: any) => character.id === id);
    setCharacter(foundCharacter);
  }, [id, data]); // Re-run when ID or data changes

  return { character, error, isLoading };
}
