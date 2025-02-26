import styles from "../css/teamDetail.module.css";
import test from "../assets/Jedi-logo.svg";
import removeButton from "../assets/remove-button.svg";

const TeamComponentDetail = () => {
  return (
    <div className={styles.mainHolder}>
      <h1 className={styles.myTeam}>MY TEAM:</h1>
      <div className={styles.inTeamHolder}>
        <div className={styles.imageHolder}>
          <img src={test} alt="Team Logo" className={styles.image} />
        </div>
        <h1 className={styles.name}>NAAM</h1>
        <div className={styles.deleteHolder}>
          <img
            src={removeButton}
            alt="remove button"
            className={styles.delete}
          />
        </div>
      </div>
    </div>
  );
};
export default TeamComponentDetail;
