import styles from "../css/card.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { useState, useEffect } from "react";
import { Character } from "../types/StarwarsApi.types";
import logo from "../assets/Sith-Logo.png"

const CardComponent: React.FC = () => {
  const { data, error, isLoading } = useStarWarsCharacters();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const randomCharacter = data[Math.floor(Math.random() * data.length)];
      setCharacter(randomCharacter);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;
  if (!character) return null;

  return (
    <div className={styles["main-card-holder"]}>
      <div className={styles["card-front"]}>
        <img src={logo} alt="logo-jedi" className={styles["logo-jedi"]} />
        <div className={styles["card-picture-holder"]}>
          <img src={character.image} alt={character.name} className={styles["personal-photo-front"]} />
          <h1 className={styles["card-name"]}>{character.name}</h1>
        </div>
      </div>
      <div className={styles["card-back"]}>
      <img src={logo} alt="logo-jedi" className={styles["logo-jedi"]} />
        <div className={styles["card-information"]}>
          <h1 className={styles["card-name"]}>{character.name}</h1>
          <div className={styles["information-card-back"]}>
            <img src={character.image} alt={character.name} className={styles["personal-photo-back"]} />
            <h2>SPECIES:</h2>
            <p className={styles["card-species"]}>{character.species || "Unknown"}</p>
            <h2>HEIGHT:</h2>
            <p className={styles["card-height"]}>{character.height || "Unknown"}</p>
            <h2>WEIGHT:</h2>
            <p className={styles["card-weight"]}>{character.mass || "Unknown"}</p>
            <h2>BORN:</h2>
            <p className={styles["card-born"]}>{character.born || "Unknown"}</p>
            <h2>DIED:</h2>
            <p className={styles["card-died"]}>{character.died || "Unknown"}</p>
          </div>
          <button className={styles["add-to-team"]}>ADD TO TEAM</button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
