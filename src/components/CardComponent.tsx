import styles from "../css/card.module.css";
import { Character } from "../types/StarwarsApi.types";
import logoSith from "../assets/Sith-Logo.png";
import logoJedi from "../assets/Jedi-Logo.png";

interface CardComponentProps {
  character: Character;
}

const CardComponent: React.FC<CardComponentProps> = ({ character }) => {
  // Check if the character has any affiliation with Sith or Jedi
  const isSith = character.affiliations?.every((affiliation) =>
    !["Resistance", "Lars family","Jedi Order", "Jedi High Council", "Grand Army of the Republic", "Alliance to Restore the Republic"].some((item) => affiliation.toLowerCase().includes(item.toLowerCase()))
  );
  
  const isJedi = character.affiliations?.length === 0 || character.affiliations?.some((affiliation) =>
    affiliation.toLowerCase().includes("jedi")
  );

  // Set the classes conditionally based on affiliations
  const cardClass = isSith ? styles.sithCard : styles.jediCard;
  const logoClass = isSith ? styles.logoSith : styles.logoJedi;
  const cardNameClass = isSith ? styles.sithName : styles.jediName;

  return (
    <div className={`${styles.mainCardHolder} ${cardClass}`}>
      <div className={styles.flipCardInner}>
        <div className={`${styles.cardFront} ${styles.flipCardFront}`}>
          <img
            src={isSith ? logoSith : logoJedi} // Apply Sith or Jedi logo
            alt={isSith ? "Sith Logo" : "Jedi Logo"}
            className={`${styles.logo} ${logoClass}`}
          />
          <div className={styles.cardPictureHolder}>
            <img
              src={character.image}
              alt={character.name}
              className={styles.personalPhotoFront}
            />
            <h1 className={`${styles.cardName} ${cardNameClass}`}>{character.name}</h1>
          </div>
        </div>
        <div className={`${styles.cardBack} ${styles.flipCardBack}`}>
          
        </div>
      </div>
    </div>
  );
};

export default CardComponent;