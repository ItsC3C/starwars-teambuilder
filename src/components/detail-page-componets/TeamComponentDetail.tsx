import { useTeam } from "../../context/TeamContext";
import styles from "../../css/detail-page-css/teamDetail.module.css";
import test from "../../assets/Jedi-logo.svg";
import removeButton from "../../assets/remove-button.svg";
import { showErrorToast } from "../../utils/toastUtils";

const TeamComponentDetail: React.FC<{ isSith: boolean }> = () => {
  const { currentTeam, setCurrentTeam } = useTeam();

  const handleRemoveFromTeam = (id: number) => {
    setCurrentTeam((prevTeam) => prevTeam.filter((member) => member.id !== id));
    showErrorToast("Character removed from your team!");
  };

  return (
    <div className={styles.mainHolder}>
      <h1 className={styles.myTeam}>MY TEAM:</h1>

      {currentTeam.length > 0 ? (
        currentTeam.map((member) => (
          <div
            key={member.id}
            className={`${styles.inTeamHolder} ${styles.jedi}`}
          >
            <div className={styles.characterCard}>
              <div className={styles.imageHolder}>
                <img
                  src={member.image || test}
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
                  onClick={() => handleRemoveFromTeam(member.id)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No characters in the team</p>
      )}
    </div>
  );
};

export default TeamComponentDetail;
