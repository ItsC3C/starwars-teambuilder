import styles from "../css/card.module.css";
import { Character } from "../types/StarwarsApi.types";
import logoSith from "../assets/Sith-Logo.png";
import logoJedi from "../assets/Jedi-logo.svg";
import { Link } from "react-router-dom"; // Import Link to handle navigation

interface CardComponentProps {
  character: Character;
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  onRemove: () => void;
  selectedId: string | null;
  customClass?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  character,
  onAddToTeam,
  isInTeam,
  onRemove,
  selectedId,
  customClass,
}) => {
  const isSith =
    character.name.toLowerCase().includes("darth") ||
    character.name.toLowerCase().includes("sith") ||
    character.affiliations?.some(
      (affiliation) =>
        affiliation.toLowerCase().includes("darth") ||
        affiliation.toLowerCase().includes("sith")
    );

  const isJedi =
    !isSith &&
    (character.name.toLowerCase().includes("jedi") ||
      character.affiliations?.some((affiliation) =>
        affiliation.toLowerCase().includes("jedi")
      ));

  const cardClass = isSith ? styles.sithCard : styles.jediCard;
  const logoClass = isSith ? styles.logoSith : styles.logoJedi;
  const cardNameClass = isSith ? styles.sithName : styles.jediName;

  const cardId = character.id;

  const cardDisabledClass =
    isInTeam(cardId) && !customClass?.includes(styles.inTeam)
      ? styles.disabled
      : "";

  // Apply hidden class if character is in team
  const flipCardBackClass = isInTeam(cardId) ? styles.hidden : "";
  const flipCardFrontClass = isInTeam(cardId) ? styles.noRotation : "";

  return (
    // Wrap the card in a Link to navigate to the character detail page
    <Link to={`/character/${cardId}`} className={styles.cardLink}>
      <div
        className={`${
          styles.mainCardHolder
        } ${cardClass} ${cardDisabledClass} ${customClass || ""}`}
      >
        <div className={`${styles.flipCardInner} ${flipCardFrontClass}`}>
          <div className={`${styles.flipCardFront} ${flipCardFrontClass}`}>
            <img
              src={isSith ? logoSith : logoJedi}
              alt={isSith ? "Sith Logo" : "Jedi Logo"}
              className={`${styles.logo} ${logoClass}`}
            />
            <div className={styles.cardPictureHolder}>
              <img
                src={character.image}
                alt={character.name}
                className={styles.personalPhotoFront}
              />
              <h1 className={`${styles.cardName} ${cardNameClass}`}>
                {character.name}
              </h1>
            </div>
          </div>
          <div className={`${styles.flipCardBack} ${flipCardBackClass}`}>
            <ul className={styles.cardDetails}>
              <div className={styles.backCardFoto}>
                <img
                  src={character.image}
                  alt={character.name}
                  className={styles.personalPhotoFrontBack}
                />
              </div>
              <li>
                <h2 className={styles.cardTitle}>SPECIES:</h2>
                <p className={styles.cardText}>
                  {character.species || "unknown"}
                </p>
              </li>
              <li>
                <h2 className={styles.cardTitle}>HEIGHT:</h2>
                <p className={styles.cardText}>
                  {character.height || "unknown"}
                </p>
              </li>
              <li>
                <h2 className={styles.cardTitle}>MASS:</h2>
                <p className={styles.cardText}>{character.mass || "unknown"}</p>
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
              <button
                className={styles.cardButton}
                onClick={(e) => {
                  e.preventDefault(); // Prevent the link navigation to allow button action
                  onAddToTeam(cardId);
                }}
              >
                {isInTeam(cardId) ? "ALREADY IN TEAM" : "ADD TO TEAM"}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
