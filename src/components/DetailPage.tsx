import { useParams } from "react-router-dom";
import styles from "../css/detail.module.css"; // Make sure styles are scoped only for this component

const CharacterDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className={styles.characterDetailContainer}>
      <h1>Character Detail for ID: {id}</h1>

      {/* Temporarily only render the name */}
      <div className={styles.name}>
        <h2>Name: Some Character</h2>
      </div>

      {/* Add the image and other elements step by step */}
      <div className={styles.image}>
        <img src="path/to/image" alt="Character Image" />
      </div>

      {/* Add more content gradually */}
      <div className={styles.details}>
        <p>Details will go here...</p>
      </div>
    </div>
  );
};

export default CharacterDetail;
