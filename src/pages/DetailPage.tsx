import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCharacter } from "../hooks/useCharacter";
import { isSithOrJedi } from "../utils/helpers";
import GridComponentDetail from "../components/detail-page-componets/GridComponentDetail.tsx";
import TeamComponentDetail from "../components/detail-page-componets/TeamComponentDetail.tsx";
import Pagination from "../components/PaginationComponent";
import styles from "../css/detail-page-css/DetailPage.module.css";
import { usePagination } from "../hooks/usePagination";
import { useStarWarsCharacters } from "../utils/api.ts";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the current character's id from the URL
  const location = useLocation();
  const { character: locationCharacter } = location.state || {}; // Safe access to state
  const navigate = useNavigate();

  const [characterToDisplay, setCharacterToDisplay] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Use useCharacter to fetch character data
  const { character, isLoading, error } = useCharacter(id);

  // Fetch all characters to determine totalPages dynamically
  const {
    data: allCharacters,
    isLoading: isLoadingAllCharacters,
    error: errorAllCharacters,
  } = useStarWarsCharacters();

  // Initialize pagination hook
  const { currentPage, setCurrentPage } = usePagination(Number(id));

  // Update the characterToDisplay after fetching or using location data
  useEffect(() => {
    setCharacterToDisplay(locationCharacter || character);
  }, [locationCharacter, character]);

  // Set totalPages dynamically after data is fetched
  useEffect(() => {
    if (allCharacters) {
      const maxId = Math.max(...allCharacters.map((char: any) => char.id)); // Find the highest ID
      setTotalPages(maxId);
    }
  }, [allCharacters]);

  // Show loading or error state if necessary
  if (isLoading || isLoadingAllCharacters || !characterToDisplay) {
    return <div>Loading character data...</div>;
  }

  if (error || errorAllCharacters) {
    return <div>Error loading character data.</div>;
  }

  const { isSith } = isSithOrJedi(characterToDisplay);
  const gridDetailClass = isSith ? styles.sith : styles.jedi;

  const checkCharacterExists = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://akabab.github.io/starwars-api/api/id/${id}.json`
      );

      // If the status code is 404, it means the character doesn't exist
      if (response.status === 404) {
        return false;
      }

      // If the response is OK (200), it means the character exists
      if (!response.ok) {
        console.error("Failed to fetch character data", response.status);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking character existence:", error);
      return false;
    }
  };

  // Find the nearest valid character ID above
  const findNextValidId = async (startId: number, direction: number) => {
    let newId = startId;

    while (newId >= 1 && newId <= totalPages) {
      if (await checkCharacterExists(newId)) {
        return newId;
      }
      newId += direction;
    }

    return direction > 0 ? totalPages : 1; // If no valid ID is found, go to the first or last ID
  };

  const handlePreviousClickWithNavigate = async () => {
    const prevId = await findNextValidId(Number(id) - 1, -1); // Check in reverse direction
    navigate(`/character/${prevId}`);
  };

  const handleNextClickWithNavigate = async () => {
    const nextId = await findNextValidId(Number(id) + 1, 1); // Check in forward direction
    navigate(`/character/${nextId}`);
  };

  return (
    <>
      <div className={styles.mainDetailHolder}>
        <section className={`${styles.gridDetailHolder} ${gridDetailClass}`}>
          <GridComponentDetail character={characterToDisplay} />
        </section>
        <section className={styles.teamDetailHolder}>
          <TeamComponentDetail isSith={isSith} />
        </section>
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalPages={totalPages} // Dynamic totalPages based on the API data
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPrevious={handlePreviousClickWithNavigate} // Updated handler
          onNext={handleNextClickWithNavigate} // Updated handler
        />
      </div>
    </>
  );
};

export default DetailPage;
