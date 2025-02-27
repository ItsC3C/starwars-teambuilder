import { useTeam } from "../../context/TeamContext";
import styles from "../../css/detail-page-css/teamDetail.module.css";
import test from "../../assets/Jedi-logo.svg";
import removeButton from "../../assets/remove-button.svg";
import { showErrorToast } from "../../utils/toastUtils"; // Import toast utility

const TeamComponentDetail: React.FC<{ isSith: boolean }> = () => {
  const { currentTeam, setCurrentTeam } = useTeam();

  // Handle removing a character from the team
  const handleRemoveFromTeam = (id: number) => {
    setCurrentTeam((prevTeam) => prevTeam.filter((member) => member.id !== id));
    showErrorToast("Character removed from your team!"); // Optional: Add toast for removal
  };

  return (
    <div className={styles.mainHolder}>
      <h1 className={styles.myTeam}>MY TEAM:</h1>

      {/* If the team has characters, display them, otherwise show a fallback message */}
      {currentTeam.length > 0 ? (
        currentTeam.map((member) => (
          <div
            key={member.id}
            className={`${styles.inTeamHolder} ${styles.jedi}`}
          >
            <div className={styles.characterCard}>
              <div className={styles.imageHolder}>
                <img
                  src={member.image || test} // Use fallback image
                  alt={member.name}
                  className={styles.image}
                />
              </div>
              <h1 className={styles.name}>{member.name}</h1>
              <div className={styles.deleteHolder}>
                <img
                  src={removeButton}
                  alt="remove button"
                  className={styles.delete}
                  onClick={() => handleRemoveFromTeam(member.id)} // Handle remove click
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No characters in the team</p> // Fallback message if the team is empty
      )}
    </div>
  );
};

export default TeamComponentDetail;
