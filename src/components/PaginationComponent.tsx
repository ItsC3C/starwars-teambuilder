import React from "react";
import styles from "../css/pagination.module.css";
import next from "../assets/next.svg";
import previous from "../assets/previous.svg";
import currentPageIcon from "../assets/current-page.svg";
import otherPageIcon from "../assets/other-page.svg";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.navigation}>
      <div className="wrapper">
        <div className={styles.pagination}>
          <img
            src={previous}
            alt="previous button"
            className={`${styles.previous} ${currentPage === 1 ? styles.disabled : ""}`}
            onClick={handlePreviousClick}
          />
          {pages.map((page) => (
            <div key={page} className={styles.paginationItem}>
              <a
                href="#"
                className={`${styles.paginationLink} ${currentPage === page ? styles.active : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page);
                }}
              >
                <img
                  src={currentPage === page ? currentPageIcon : otherPageIcon}
                  alt={currentPage === page ? "current page" : "other page"}
                />
              </a>
            </div>
          ))}
          <img
            src={next}
            alt="next button"
            className={`${styles.next} ${currentPage === totalPages ? styles.disabled : ""}`}
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;