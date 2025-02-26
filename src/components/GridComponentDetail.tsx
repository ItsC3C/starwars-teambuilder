import { type Character } from "../types/StarwarsApi.types";
import styles from "../css/GridDetail.module.css";
import { Link } from "react-router-dom";

interface GridComponentDetailProps {
  character: Character;
}

const GridComponentDetail: React.FC<GridComponentDetailProps> = ({
  character,
}) => {
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
          <h1 className={styles.title}>DETAILS:</h1>
          <ul className={styles.cardDetails}>
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
          <h1 className={styles.title}>AFFILIATIONS:</h1>
          <ul className={styles.affiliations}>
            {character.affiliations?.length ? (
              character.affiliations.map((affiliation, index) => (
                <li key={index}>{affiliation}</li>
              ))
            ) : (
              <li>unknown</li>
            )}
          </ul>
          <button className={styles.AddToTeamButton}>ADD TO TEAM</button>
        </div>
      </div>
    </>
  );
};

export default GridComponentDetail;
