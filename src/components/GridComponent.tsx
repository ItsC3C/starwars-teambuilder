import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import Pagination from "./PaginationComponent"; // Import the Pagination component
import styles from "../css/grid.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { Character } from "../types/StarwarsApi.types"; // Import the Character type

const GridComponent = () => {
  const { data, error, isLoading } = useStarWarsCharacters();
  const [pageSize, setPageSize] = useState(20); // Default to 20 cards per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(""); // Search input state
  const [filteredData, setFilteredData] = useState<Character[]>([]); // Filtered data based on search

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  // Handle search filter
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase(); // Get the search value in lowercase
    setSearchValue(value);
  
    // Filter characters based on the search query
    const filtered = data.filter((character: Character) =>
      character.name.toLowerCase().includes(value) // Check if the character's name includes the search value
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after search to ensure proper pagination
  };

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
          <CardComponent key={character.id} character={character} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default GridComponent;