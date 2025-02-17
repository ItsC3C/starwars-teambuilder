import useSWR from "swr";

const API_URL = "https://akabab.github.io/starwars-api/api/all.json";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// Hook for automatic fetching
export function useStarWarsCharacters() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);
  return { data, error, isLoading };
}

// Function for manual fetching
export async function fetchStarWarsCharacters() {
  return fetcher(API_URL);
}
