import { useState } from "react";
import styles from "../css/team.module.css";
import closebutton from "../assets/close-button.svg";
import menuButton from "../assets/menu-button.svg";
import CardComponent from "./CardComponent";
import { Character } from "../types/StarwarsApi.types";
import removeButton from "../assets/remove-button.svg";

interface TeamComponentProps {
  team: number[]; // Array of character IDs
  onRemoveFromTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  characters: Character[]; // Full list of characters
  setIsSidebarOpen: (isOpen: boolean) => void; // Pass setter for opening the sidebar
}

const TeamComponent: React.FC<TeamComponentProps> = ({
  team,
  onRemoveFromTeam,
  isInTeam,
  characters,
  setIsSidebarOpen, // Get the setter function
}) => {
  const [battleResult, setBattleResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const teamCharacters = characters.filter((character) =>
    team.includes(character.id)
  );

  const handleBattle = () => {
    if (teamCharacters.length !== 5) {
      setError(
        "⚠️ You must assemble a full squad of 5 warriors before battling!"
      );
      setTimeout(() => setError(null), 4000);
      return;
    }

    setError(null);
    const randomChance = Math.random();
    setBattleResult(
      randomChance < 0.75
        ? "🔥 The Force is strong with you! Victory is yours! 💫"
        : "☠️ You fought bravely, but the Dark Side prevails... 🌑"
    );
    setTimeout(() => setBattleResult(null), 4000);
  };

  return (
    <div className={styles.teamComponent}>
      <img
        src={menuButton}
        alt="menu button"
        className={styles.menuButton}
        onClick={() => setIsSidebarOpen(true)} // Open sidebar
      />

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <img
            src={closebutton}
            alt="close button"
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar
          />
          <h1 className={styles.myTeamTitle}>MY TEAM</h1>
        </div>

        <div className={styles.myTeamHolder}>
          {teamCharacters.length > 0 ? (
            teamCharacters.map((character) => (
              <div key={character.id} className={styles.myTeamCard}>
                <div className={styles.cardContent}>
                  <CardComponent
                    onAddToTeam={onRemoveFromTeam}
                    character={character}
                    onRemove={() => onRemoveFromTeam(character.id)}
                    isInTeam={isInTeam}
                  />
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => onRemoveFromTeam(character.id)}
                >
                  <img src={removeButton} alt="remove button" />
                </button>
              </div>
            ))
          ) : (
            <p>No characters selected</p>
          )}
        </div>

        <button className={styles.battleButton} onClick={handleBattle}>
          BATTLE
        </button>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {battleResult && <p className={styles.battleResult}>{battleResult}</p>}
      </div>
    </div>
  );
};

export default TeamComponent;
