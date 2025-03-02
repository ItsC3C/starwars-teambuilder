import styles from "../../css/main-page-css/card.module.css";
import { Character } from "../../types/StarwarsApi.types";
import logoSith from "../../assets/Sith-Logo.png";
import logoJedi from "../../assets/Jedi-logo.svg";
import { Link } from "react-router-dom";

const isSithOrJedi = (character: Character) => {
  const lowerName = character.name.toLowerCase();
  const affiliations =
    character.affiliations?.map((a) => a.toLowerCase()) || [];
  const master = character.masters || "";

  const isSith =
    lowerName.includes("darth") ||
    lowerName.includes("sith") ||
    affiliations.some((a) => a.includes("darth") || a.includes("sith")) ||
    master.includes("darth");

  return {
    isSith,
    isJedi: !isSith && affiliations.some((a) => a.includes("jedi")),
  };
};

interface CardComponentProps {
  character: Character;
  onAddToTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  onRemove?: (id: number) => void;
  selectedId?: number;
  customClass?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  character,
  onAddToTeam,
  isInTeam,
  customClass,
}) => {
  const { isSith, isJedi } = isSithOrJedi(character);
  const cardId = character.id;

  const cardClass = isSith ? styles.sithCard : styles.jediCard;
  const logoClass = isSith ? styles.logoSith : styles.logoJedi;
  const cardNameClass = isSith ? styles.sithName : styles.jediName;
  const cardDisabledClass =
    isInTeam(cardId) && !customClass?.includes(styles.inTeam)
      ? styles.disabled
      : "";
  const flipCardBackClass = isInTeam(cardId) ? styles.hidden : "";
  const flipCardFrontClass = isInTeam(cardId) ? styles.noRotation : "";

  const handleAddToTeamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToTeam(cardId);
  };

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
              {!isSith && (
                <button
                  className={styles.cardButton}
                  onClick={handleAddToTeamClick}
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
