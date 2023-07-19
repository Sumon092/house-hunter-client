// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages === 1) {
        return null;
      }
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-8">
           <ul className="flex space-x-2">
        <li className={`rounded-lg ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-l-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
        </li>
        <li className="flex items-center px-4 py-2 text-blue-500 font-bold">
          {currentPage}
        </li>
        <li className={`rounded-lg ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
      </div>
    );
  };
  
  export default Pagination;
  