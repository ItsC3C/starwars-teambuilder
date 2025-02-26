import useSWR from "swr";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { type Character } from "../types/StarwarsApi.types";
import { fetcher } from "../utils/helpers";
import styles from "../css/DetailPage.module.css";
import GridComponentDetail from "../components/GridComponentDetail.tsx";
import TeamComponentDetail from "../components/TeamComponentDetail.tsx";
import Pagination from "../components/PaginationComponent";
import { useState, useMemo } from "react";

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { character, isSith = false } = location.state || {}; // Default to false if not found

  const isJedi = !isSith;

  const {
    data: characterFromAPI,
    isLoading,
    error,
  } = useSWR<Character>(
    `https://akabab.github.io/starwars-api/api/id/${id}.json`,
    fetcher
  );

  const [pageSize] = useState(1); // Only one character per page in DetailPage
  const [currentPage, setCurrentPage] = useState(Number(id)); // Initial currentPage from the URL (id)

  const filteredData = useMemo(() => {
    return characterFromAPI ? [characterFromAPI] : [];
  }, [characterFromAPI]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const navigate = useNavigate();

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`/character/${prevPage}`); // Update URL to /character/{prevPage}
    }
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    navigate(`/character/${nextPage}`); // Update URL to /character/{nextPage}
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character data.</div>;

  const characterToDisplay = character || characterFromAPI;

  const gridDetailClass = isSith ? styles.sith : isJedi ? styles.jedi : "";

  return (
    <>
      <Link to="/" className={styles.home}>
        <h1>Star Wars Battles</h1>
      </Link>
      <div className={styles.mainDetailHolder}>
        <section className={`${styles.gridDetailHolder} ${gridDetailClass}`}>
          <GridComponentDetail character={characterToDisplay} />
        </section>
        <section className={styles.teamDetailHolder}>
          <TeamComponentDetail character={characterToDisplay} />
        </section>
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPrevious={handlePreviousClick}
          onNext={handleNextClick}
        />
      </div>
    </>
  );
};

export default DetailPage;
