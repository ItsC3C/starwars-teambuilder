import useSWR from "swr";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { type Character } from "../types/StarwarsApi.types";
import { fetcher } from "../utils/helpers";
import styles from "../css/DetailPage.module.css";
import GridComponentDetail from "../components/GridComponentDetail.tsx";
import TeamComponentDetail from "../components/TeamComponentDetail.tsx";
import Pagination from "../components/PaginationComponent";
import { useState, useEffect } from "react";

// Import the utility function from CardComponent to keep consistency
const isSithOrJedi = (character: Character) => {
  const lowerName = character.name.toLowerCase();
  const affiliations =
    character.affiliations?.map((a) => a.toLowerCase()) || [];
  const master = character.masters || "";

  // Check for Sith (based on name, affiliations, and master's name)
  const isSith =
    lowerName.includes("darth") ||
    lowerName.includes("sith") ||
    affiliations.some((a) => a.includes("darth") || a.includes("sith")) ||
    master.includes("darth");

  // If not Sith, automatically set as Jedi
  const isJedi =
    !isSith &&
    (lowerName.includes("jedi") ||
      affiliations.some((a) => a.includes("jedi")));

  return { isSith, isJedi };
};

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { character: locationCharacter, isSith: locationIsSith = false } =
    location.state || {};
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(id));

  const {
    data: characterFromAPI,
    isLoading,
    error,
  } = useSWR<Character>(
    `https://akabab.github.io/starwars-api/api/id/${id}.json`,
    fetcher
  );

  // Use the character from location state or API
  const characterToDisplay = locationCharacter || characterFromAPI;

  // Determine isSith based on the character data using the shared utility function
  const { isSith, isJedi } = characterToDisplay
    ? isSithOrJedi(characterToDisplay)
    : { isSith: locationIsSith, isJedi: !locationIsSith };

  const gridDetailClass = isSith ? styles.sith : styles.jedi;

  useEffect(() => {
    if (!isLoading && error) {
      findValidId(Number(id));
    }
  }, [isLoading, error, id]);

  // Check if ID exists and return the character data
  const checkIdExists = async (
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

  // Find a valid ID (either forward or backward)
  const findValidId = async (startId: number, searchLimit = 5) => {
    // Try forward first
    for (let i = 1; i <= searchLimit; i++) {
      const character = await checkIdExists(startId + i);
      if (character) {
        const { isSith } = isSithOrJedi(character);
        navigate(`/character/${startId + i}`, {
          state: { character, isSith },
        });
        return;
      }
    }

    // Then try backward
    for (let i = 1; i <= searchLimit; i++) {
      const prevId = startId - i;
      if (prevId > 0) {
        const character = await checkIdExists(prevId);
        if (character) {
          const { isSith } = isSithOrJedi(character);
          navigate(`/character/${prevId}`, {
            state: { character, isSith },
          });
          return;
        }
      }
    }

    navigate("/"); // Fallback to home if nothing found
  };

  const handlePreviousClick = async () => {
    if (currentPage <= 1) return;

    const prevId = currentPage - 1;
    const character = await checkIdExists(prevId);
    if (character) {
      const { isSith } = isSithOrJedi(character);
      setCurrentPage(prevId);
      navigate(`/character/${prevId}`, {
        state: { character, isSith },
      });
    }
  };

  const handleNextClick = async () => {
    const nextId = currentPage + 1;
    const character = await checkIdExists(nextId);
    if (character) {
      const { isSith } = isSithOrJedi(character);
      setCurrentPage(nextId);
      navigate(`/character/${nextId}`, {
        state: { character, isSith },
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!characterToDisplay) return <div>Loading character data...</div>;
  return (
    <>
      <div className={styles.mainDetailHolder}>
        <section className={`${styles.gridDetailHolder} ${gridDetailClass}`}>
          <GridComponentDetail character={characterToDisplay} />
        </section>
        <section className={styles.teamDetailHolder}>
          <TeamComponentDetail />
        </section>
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalPages={88}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
        />
      </div>
    </>
  );
};

export default DetailPage;
