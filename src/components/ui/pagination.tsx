import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-4">
      <ul className="flex list-none space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            &lt;
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1 ? "bg-indigo-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
