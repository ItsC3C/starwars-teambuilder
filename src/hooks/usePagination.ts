import { useState } from "react";

export const usePagination = (initialPage: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePreviousClick = (onNavigate: (id: number) => void) => {
    if (currentPage > 1) {
      onNavigate(currentPage - 1);
    }
  };

  const handleNextClick = (onNavigate: (id: number) => void) => {
    onNavigate(currentPage + 1);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePreviousClick,
    handleNextClick,
  };
};
