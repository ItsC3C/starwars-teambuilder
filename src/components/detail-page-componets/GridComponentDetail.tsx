import { type Character } from "../../types/StarwarsApi.types";
import styles from "../../css/detail-page-css/GridDetail.module.css";
import { Link } from "react-router-dom";
import { useTeam } from "../../context/TeamContext";
import { showErrorToast } from "../../utils/toastUtils"; // Import toast utility

interface GridComponentDetailProps {
  character: Character;
}

const GridComponentDetail: React.FC<GridComponentDetailProps> = ({
  character,
}) => {
  const { currentTeam, setCurrentTeam } = useTeam();

  // Handle adding a character to the team
  const handleAddToTeam = () => {
    const isCharacterInTeam = currentTeam.some(
      (member) => member.id === character.id
    );

    if (isCharacterInTeam) {
      showErrorToast("This character is already in your team!");
      return;
    }

    if (currentTeam.length >= 5) {
      showErrorToast("Your team can only have 5 members!");
      return;
    }

    setCurrentTeam((prevTeam) => [...prevTeam, character]);
  };

  const isInTeam = currentTeam.some((member) => member.id === character.id);
  const isSith = character.affiliations?.some(
    (affiliation) => affiliation.toLowerCase() === "sith"
  );

  return (
    <>
      <Link to="/" className={styles.home}>
        <h1>Star Wars Battles</h1>
      </Link>
      <div className={styles.mainHolder}>
        <div className={styles.imageHolder}>
          <img src={character.image} alt={character.name} />
        </div>
        <div className={styles.detailHolder}>
          <ul className={styles.cardDetails}>
            <h1 className={styles.title}>DETAILS:</h1>
            <li>
              <h2 className={styles.cardTitle}>SPECIES:</h2>
              <p className={styles.cardText}>
                {character.species || "unknown"}
              </p>
            </li>
            <li>
              <h2 className={styles.cardTitle}>HOMEWORLD:</h2>
              <p className={styles.cardText}>
                {character.homeworld || "unknown"}
              </p>
            </li>
            <li>
              <h2 className={styles.cardTitle}>BORN:</h2>
              <p className={styles.cardText}>
                {character.born
                  ? `${character.born}, ${character.bornLocation}`
                  : "unknown"}
              </p>
            </li>
            <li>
              <h2 className={styles.cardTitle}>DIED:</h2>
              <p className={styles.cardText}>
                {character.died
                  ? `${character.died}, ${character.diedLocation}`
                  : "unknown"}
              </p>
            </li>
          </ul>
          <ul className={styles.affiliations}>
            <h1 className={styles.title}>AFFILIATIONS:</h1>
            {character.affiliations?.length ? (
              character.affiliations.map((affiliation, index) => (
                <li key={index}>{affiliation}</li>
              ))
            ) : (
              <li>unknown</li>
            )}
          </ul>
          {!isSith && (
            <button
              className={styles.AddToTeamButton}
              onClick={handleAddToTeam}
              disabled={isInTeam}
            >
              {isInTeam ? "ALREADY IN TEAM" : "ADD TO TEAM"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GridComponentDetail;
