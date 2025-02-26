import styles from "../css/card.module.css";
import { Character } from "../types/StarwarsApi.types";
import logoSith from "../assets/Sith-Logo.png";
import logoJedi from "../assets/Jedi-logo.svg";
import { Link } from "react-router-dom";

interface CardComponentProps {
  character: Character;
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  onRemove?: (id: number) => void;
  selectedId?: number;
  customClass?: string;
}

// Updated isSithOrJedi function: If not Sith, assume Jedi
const isSithOrJedi = (character: Character) => {
  const lowerName = character.name.toLowerCase();
  const affiliations =
    character.affiliations?.map((a) => a.toLowerCase()) || [];
  const master = character.masters || "";

  // Check for Sith (based on name, affiliations, and master's name)
  const isSith =
    lowerName.includes("darth") ||
    lowerName.includes("sith") ||
    affiliations.some((a) => a.includes("darth") || a.includes("sith")) ||
    master.includes("darth");

  // If not Sith, automatically set as Jedi
  const isJedi =
    !isSith &&
    (lowerName.includes("jedi") ||
      affiliations.some((a) => a.includes("jedi")));

  return { isSith, isJedi };
};

const CardComponent: React.FC<CardComponentProps> = ({
  character,
  onAddToTeam,
  isInTeam,
  customClass,
}) => {
  const { isSith, isJedi } = isSithOrJedi(character); // Determine if character is Sith or Jedi
  const cardClass = isSith ? styles.sithCard : styles.jediCard;
  const logoClass = isSith ? styles.logoSith : styles.logoJedi;
  const cardNameClass = isSith ? styles.sithName : styles.jediName;
  const cardId = character.id;
  const cardDisabledClass =
    isInTeam(cardId) && !customClass?.includes(styles.inTeam)
      ? styles.disabled
      : "";
  const flipCardBackClass = isInTeam(cardId) ? styles.hidden : "";
  const flipCardFrontClass = isInTeam(cardId) ? styles.noRotation : "";

  return (
    <Link to={`/character/${cardId}`} state={{ character, isSith, isJedi }}>
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
              {/* Only show button if not a Sith */}
              {!isSith && (
                <button
                  className={styles.cardButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToTeam(cardId);
                  }}
                >
                  {isInTeam(cardId) ? "ALREADY IN TEAM" : "ADD TO TEAM"}
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
