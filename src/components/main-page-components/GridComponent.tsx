import { useState, useMemo } from "react";
import CardComponent from "./CardComponent";
import Pagination from "../PaginationComponent";
import styles from "../../css/main-page-css/grid.module.css";
import { useStarWarsCharacters } from "../../utils/api";
import { Character } from "../../types/StarwarsApi.types";

interface GridComponentProps {
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
}

const GridComponent: React.FC<GridComponentProps> = ({
  onAddToTeam,
  isInTeam,
}) => {
  const { data, error, isLoading } = useStarWarsCharacters();
  const [pageSize] = useState(20); // 20 characters per page
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
    setCurrentPage(1); // Reset to page 1 on search change
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load characters</p>;
  if (filteredData.length === 0)
    return <p>No characters found for your search criteria</p>;

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
          return (
            <CardComponent
              key={character.id}
              character={character}
              onAddToTeam={onAddToTeam}
              isInTeam={isInTeam}
            />
          );
        })}
      </div>

      <Pagination
        totalPages={totalPages} // Dynamically calculate totalPages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  );
};

export default GridComponent;
