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
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { character: locationCharacter } = location.state || {};
  const navigate = useNavigate();

  const [characterToDisplay, setCharacterToDisplay] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { character, isLoading, error } = useCharacter(id);

  const {
    data: allCharacters,
    isLoading: isLoadingAllCharacters,
    error: errorAllCharacters,
  } = useStarWarsCharacters();

  const { currentPage, setCurrentPage } = usePagination(Number(id));

  useEffect(() => {
    setCharacterToDisplay(locationCharacter || character);
  }, [locationCharacter, character]);

  useEffect(() => {
    if (allCharacters) {
      const maxId = Math.max(...allCharacters.map((char: any) => char.id));
      setTotalPages(maxId);
    }
  }, [allCharacters]);

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
      if (response.status === 404) {
        return false;
      }
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

  const findNextValidId = async (startId: number, direction: number) => {
    let newId = startId;
    while (newId >= 1 && newId <= totalPages) {
      if (await checkCharacterExists(newId)) {
        return newId;
      }
      newId += direction;
    }
    return direction > 0 ? totalPages : 1;
  };

  const handlePreviousClickWithNavigate = async () => {
    const prevId = await findNextValidId(Number(id) - 1, -1);
    navigate(`/character/${prevId}`);
  };

  const handleNextClickWithNavigate = async () => {
    const nextId = await findNextValidId(Number(id) + 1, 1);
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
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPrevious={handlePreviousClickWithNavigate}
          onNext={handleNextClickWithNavigate}
        />
      </div>
    </>
  );
};

export default DetailPage;
