import useSWR from "swr";
import { useState, useEffect } from "react";

const API_URL = "https://akabab.github.io/starwars-api/api/all.json";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export function useStarWarsCharacters() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);
  return { data, error, isLoading };
}

export function useStarWarsCharacterById(id: number | null) {
  const { data, error, isLoading } = useStarWarsCharacters();

  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (!id || !data) return;

    const foundCharacter = data.find((character: any) => character.id === id);
    setCharacter(foundCharacter);
  }, [id, data]);

  return { character, error, isLoading };
}
