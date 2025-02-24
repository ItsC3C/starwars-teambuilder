import { useState, useMemo } from "react";
import CardComponent from "./CardComponent";
import Pagination from "./PaginationComponent";
import styles from "../css/grid.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { Character } from "../types/StarwarsApi.types";

interface GridComponentProps {
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean; // Pass isInTeam function to check if character is in the team
}

const GridComponent: React.FC<GridComponentProps> = ({
  onAddToTeam,
  isInTeam,
}) => {
  const { data, error, isLoading } = useStarWarsCharacters();
  const [pageSize, setPageSize] = useState(20); // Default to 20 cards per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(""); // Search input state

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (searchValue) {
      return data.filter((character: Character) =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return data;
  }, [data, searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  // Loading and error handling
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load characters</p>;

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCharacters = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <>
      <div className={styles.header}>
        <h1>Star Wars Battles</h1>
        <input
          type="text"
          placeholder="SEARCH CHARACTER..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.mainGrid}>
        {currentCharacters.map((character: Character) => (
          <CardComponent
            key={character.id}
            character={character}
            onAddToTeam={onAddToTeam}
            isInTeam={isInTeam}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default GridComponent;
