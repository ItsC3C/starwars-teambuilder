// MainPage.tsx
import { useState } from "react";
import GridComponent from "../components/main-page-components/GridComponent";
import TeamComponent from "../components/main-page-components/TeamComponent";
import styles from "../css/main-page-css/MainPage.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { showErrorToast } from "../utils/toastUtils"; // Import the toast utility
import { useTeam } from "../context/TeamContext"; // Import TeamContext
import { Character } from "../types/StarwarsApi.types";

const MainPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: characters, error, isLoading } = useStarWarsCharacters();
  const { currentTeam, setCurrentTeam } = useTeam();

  const handleAddToTeam = (id: number) => {
    if (currentTeam.length >= 5) {
      showErrorToast("Your team can only have 5 members!"); // Correct usage
      return;
    }

    if (!currentTeam.some((char: Character) => char.id === id)) {
      const newCharacter = characters.find((char: Character) => char.id === id);
      if (newCharacter) {
        setCurrentTeam([...currentTeam, newCharacter]);
      }

      if (currentTeam.length + 1 === 5) {
        setIsSidebarOpen(true);
      }
    } else {
      showErrorToast("This character is already in your team!");
    }
  };

  const handleRemoveFromTeam = (id: number) => {
    setCurrentTeam(currentTeam.filter((char: Character) => char.id !== id));
  };

  const isInTeam = (id: number) =>
    currentTeam.some((char: Character) => char.id === id);

  if (isLoading) return <p>Loading characters...</p>;
  if (error) return <p>Failed to load characters. Please try again later.</p>;

  return (
    <div className={styles.layout}>
      <GridComponent onAddToTeam={handleAddToTeam} isInTeam={isInTeam} />

      <div
        className={`${styles.teamHolder} ${isSidebarOpen ? styles.open : ""}`}
      >
        <TeamComponent
          onRemoveFromTeam={handleRemoveFromTeam}
          isInTeam={isInTeam}
          characters={characters}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default MainPage;
