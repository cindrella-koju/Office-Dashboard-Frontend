import type { Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  limit: number;
  totalPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  currentPage,
  limit,
  totalPage,
  setCurrentPage,
  setLimit,
}: PaginationProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPage;

  const handlePrevious = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (!isFirstPage) {
      setCurrentPage(1);
    }
  };

  const handleLast = () => {
    if (!isLastPage) {
      setCurrentPage(totalPage);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPage <= maxVisible) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPage - 3; i <= totalPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPage);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Rows per page */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Rows per page:</span>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        {/* First page button */}
        <button
          onClick={handleFirst}
          disabled={isFirstPage}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isFirstPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          title="First page"
        >
          <HiChevronDoubleLeft className="w-5 h-5" />
        </button>

        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={isFirstPage}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isFirstPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          title="Previous page"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-400">
                {page}
              </span>
            )
          )}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={isLastPage}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isLastPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          title="Next page"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>

        {/* Last page button */}
        <button
          onClick={handleLast}
          disabled={isLastPage}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isLastPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          title="Last page"
        >
          <HiChevronDoubleRight className="w-5 h-5" />
        </button>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-500">
        Page <span className="font-semibold text-gray-700">{currentPage}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalPage}</span>
      </div>
    </div>
  );
};