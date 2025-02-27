import { Character } from "../types/StarwarsApi.types";

// Export fetcher function
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Export isSithOrJedi function
export const isSithOrJedi = (character: Character) => {
  const lowerName = character.name.toLowerCase();
  const affiliations =
    character.affiliations?.map((a) => a.toLowerCase()) || [];
  const master = character.masters || "";

  const isSith =
    lowerName.includes("darth") ||
    lowerName.includes("sith") ||
    affiliations.some((a) => a.includes("darth") || a.includes("sith")) ||
    master.includes("darth");

  const isJedi =
    !isSith &&
    (lowerName.includes("jedi") ||
      affiliations.some((a) => a.includes("jedi")));

  return { isSith, isJedi };
};

// Export checkIdExists function
export const checkIdExists = async (
  idToCheck: number
): Promise<Character | null> => {
  try {
    const response = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${idToCheck}.json`
    );
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
};

// Export findValidId function
export const findValidId = async (startId: number, searchLimit = 5) => {
  for (let i = 1; i <= searchLimit; i++) {
    const character = await checkIdExists(startId + i);
    if (character) {
      return { character, id: startId + i };
    }
  }

  for (let i = 1; i <= searchLimit; i++) {
    const prevId = startId - i;
    if (prevId > 0) {
      const character = await checkIdExists(prevId);
      if (character) {
        return { character, id: prevId };
      }
    }
  }

  return null;
};
