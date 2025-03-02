import { useContext, useState, useEffect } from "react";
import styles from "../../css/main-page-css/team.module.css";
import closebutton from "../../assets/close-button.svg";
import menuButton from "../../assets/menu-button.svg";
import CardComponent from "./CardComponent";
import { Character } from "../../types/StarwarsApi.types";
import removeButton from "../../assets/remove-button.svg";
import { TeamContext } from "../../context/TeamContext";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

interface TeamComponentProps {
  onRemoveFromTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  characters: Character[];
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const TeamComponent: React.FC<TeamComponentProps> = ({
  onRemoveFromTeam,
  isInTeam,
  characters,
  setIsSidebarOpen,
}) => {
  const { currentTeam, setCurrentTeam } = useContext(TeamContext) || {};

  if (!currentTeam || !setCurrentTeam) {
    throw new Error("TeamContext is not provided");
  }

  const teamCharacters = characters.filter((character) =>
    currentTeam.some((teamMember) => teamMember.id === character.id)
  );

  const [isBattleEnabled, setIsBattleEnabled] = useState<boolean>(
    teamCharacters.length === 5
  );
  const [battleResult, setBattleResult] = useState<string | null>(null);

  const handleBattle = () => {
    if (!isBattleEnabled) {
      showErrorToast(
        "⚠️ You must assemble a full squad of 5 warriors before battling!"
      );
      return;
    }

    const randomChance = Math.random();
    if (randomChance < 0.75) {
      showSuccessToast("🔥 The Force is strong with you! Victory is yours! 💫");
      setBattleResult("success");
    } else {
      showErrorToast("☠️ You fought bravely, but the Dark Side prevails... 🌑");
      setBattleResult("fail");
    }
  };

  const handleResetTeam = () => {
    setCurrentTeam([]);
    setBattleResult(null);
    showSuccessToast("Your team has been reset! Choose new members.");
  };

  useEffect(() => {
    setIsBattleEnabled(teamCharacters.length === 5);
  }, [teamCharacters]);

  return (
    <div className={styles.teamComponent}>
      <img
        src={menuButton}
        alt="menu button"
        className={styles.menuButton}
        onClick={() => setIsSidebarOpen(true)}
      />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <img
            src={closebutton}
            alt="close button"
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
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
            <p>
              No characters selected for your team. Select characters to build
              your team!
            </p>
          )}
        </div>
        <div className={styles.buttonHolder}>
          <button
            className={styles.battleButton}
            onClick={handleBattle}
            disabled={!isBattleEnabled}
          >
            {isBattleEnabled ? "BATTLE" : "Assemble a full squad first"}
          </button>

          {battleResult === "success" && (
            <button className={styles.resetButton} onClick={handleResetTeam}>
              Reset Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
