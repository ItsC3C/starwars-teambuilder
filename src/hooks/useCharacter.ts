import useSWR from "swr";
import { fetcher } from "../utils/helpers";
import { Character } from "../types/StarwarsApi.types";

export const useCharacter = (id: string | undefined) => {
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
