import { useParams } from 'react-router-dom';
import { Character } from '../types/StarwarsApi.types';
import styles from "../css/detail.module.css";

const CharacterDetail: React.FC = () => {
  const { id } = useParams(); 

  return (
    <>
        <section className={styles.detailholder}>
            <div><img src="" alt="" className={styles.image}/></div>
            <div className={styles.infoHolder}>
                <ul>
                    <li className={styles.name}></li>
                    <li className={styles.height}></li>
                    <li className={styles.mass}></li>
                    <li className={styles.homeworld}></li>
                    <li className={styles.species}></li>
                    <li className={styles.born}></li>
                    <li className={styles.died}></li>
                    <li className={styles.affiliations}></li>
                </ul>
            </div>
            <div><img src="" alt="" className={styles.logo}/></div>
        </section>
        <section className={styles.teamHolderDetail}></section>
    </>
  );
};

export default CharacterDetail;