import React from "react";
import styles from "../css/pagination.module.css";
import next from "../assets/next.svg";
import previous from "../assets/previous.svg";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
  onPrevious,
  onNext,
}) => {
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.navigation}>
      <div className="wrapper">
        <div className={styles.pagination}>
          <img
            src={previous}
            alt="Previous button"
            className={`${styles.previous} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={onPrevious}
          />
          {/* Next Button */}
          <img
            src={next}
            alt="Next button"
            className={`${styles.next} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
