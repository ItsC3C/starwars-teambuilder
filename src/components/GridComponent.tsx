import { useState, useMemo } from "react";
import CardComponent from "./CardComponent";
import Pagination from "./PaginationComponent";
import styles from "../css/grid.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { Character } from "../types/StarwarsApi.types";

interface GridComponentProps {
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  onSelectCharacter: (
    character: Character,
    isSith: boolean,
    isJedi: boolean
  ) => void;
}

const GridComponent: React.FC<GridComponentProps> = ({
  onAddToTeam,
  isInTeam,
  onSelectCharacter,
}) => {
  const { data, error, isLoading } = useStarWarsCharacters();
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    return searchValue
      ? data.filter((character: Character) =>
          character.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : data;
  }, [data, searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const getAffiliation = (character: Character) => {
    const lowerName = character.name.toLowerCase();
    const affiliations =
      character.affiliations?.map((a) => a.toLowerCase()) || [];

    const isSith =
      lowerName.includes("darth") ||
      lowerName.includes("sith") ||
      affiliations.some((a) => a.includes("darth") || a.includes("sith"));

    const isJedi =
      !isSith &&
      (lowerName.includes("jedi") ||
        affiliations.some((a) => a.includes("jedi")));

    return { isSith, isJedi };
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load characters</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const currentCharacters = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Star Wars Battles</h1>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="SEARCH CHARACTER..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.mainGrid}>
        {currentCharacters.map((character: Character) => {
          const { isSith, isJedi } = getAffiliation(character);
          return (
            <CardComponent
              key={character.id}
              character={character}
              onAddToTeam={onAddToTeam}
              isInTeam={isInTeam}
              onSelectCharacter={() =>
                onSelectCharacter(character, isSith, isJedi)
              }
            />
          );
        })}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  );
};

export default GridComponent;
