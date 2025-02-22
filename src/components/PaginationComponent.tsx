import React from "react";
import styles from "../css/pagination.module.css";

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

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.navigation}>
      <div className="wrapper">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={styles.paginationItem}
            >
              <a
                href="#"
                className={styles.paginationLink}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;