import { useState } from "react";
import styles from "../css/team.module.css";
import closebutton from "../assets/close-button.svg";
import menuButton from "../assets/menu-button.svg";
import CardComponent from "./CardComponent";
import { Character } from "../types/StarwarsApi.types";
import removeButton from "../assets/remove-button.svg";

interface TeamComponentProps {
  selectedId: string | null;
  team: number[]; // Array of character IDs
  onRemoveFromTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  characters: Character[]; // Full list of characters
}

const TeamComponent: React.FC<TeamComponentProps> = ({
  selectedId,
  team,
  onRemoveFromTeam,
  isInTeam,
  characters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [battleResult, setBattleResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Filter only selected team members
  const teamCharacters = characters.filter((character) =>
    team.includes(character.id)
  );

  // Function to determine battle result
  const handleBattle = () => {
    if (teamCharacters.length !== 5) {
      setError(
        "⚠️ You must assemble a full squad of 5 warriors before battling!"
      );
      setTimeout(() => setError(null), 4000);
      return;
    }

    setError(null); // Clear previous errors

    const randomChance = Math.random(); // Generates a number between 0 and 1
    if (randomChance < 0.75) {
      setBattleResult("🔥 The Force is strong with you! Victory is yours! 💫");
    } else {
      setBattleResult(
        "☠️ You fought bravely, but the Dark Side prevails... 🌑"
      );
    }

    setTimeout(() => setBattleResult(null), 4000);
  };

  return (
    <div className={`${styles.teamComponent} ${isOpen ? styles.open : ""}`}>
      {!isOpen && (
        <img
          src={menuButton}
          alt="menu button"
          className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(true)}
        />
      )}
      {isOpen && (
        <div className={styles.header}>
          <img
            src={closebutton}
            alt="close button"
            className={styles.closebutton}
            onClick={() => setIsOpen(false)}
          />
          <h1 className={styles.myTeamtitle}>MY TEAM</h1>
        </div>
      )}

      {isOpen && (
        <>
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
                      selectedId={selectedId}
                    />
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => onRemoveFromTeam(character.id)}
                  >
                    <img
                      src={removeButton}
                      alt="remove button"
                      className={styles.closebutton}
                    />
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
          {battleResult && (
            <p className={styles.battleResult}>{battleResult}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TeamComponent;
