import { useData } from "./DataContext";

const Pagination = ({type}) => {
  const {
    searchContent,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    movieCurrentPage,
    setMovieCurrentPage,
    tvSeriesCurrentPage,
    setTvSeriesCurrentPage,
  } = useData();

  const findCurrentPage = () => {
    if (type === "movies") return movieCurrentPage
    if (type === "tvseries") return tvSeriesCurrentPage
    return currentPage
  }

  const setPage = (number) => {
    if (type === "movies") setMovieCurrentPage(number)
    else if (type === "tvseries") setTvSeriesCurrentPage(number)
        else setCurrentPage(number)
  }

const totalItems = type === "movies"
? searchContent.filter(show => show.category === "Movie").length
: type === "tvseries"
? searchContent.filter(show => show.category === "TV Series").length
: searchContent.length


const pageNumbers = [];

for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
  pageNumbers.push(i);
}

  const getPageNumbers = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const current = findCurrentPage()
    let pages = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    }  else {
    pages.push(1)
   if (current > 3) {
    pages.push("...")
   }  
   const start = Math.max(2, current - 1)
   const end = Math.min (totalPages - 1, current + 1)
   for (let i = start; i <= end; i++) {
    pages.push(i)
   }
   if (current < totalPages -2) {
    pages.push("...")
   }
   pages.push(totalPages)
  }
  return pages
  }

  const page = findCurrentPage()

  return (
    <>
      {totalItems < 12 ? null : (
        <div className="flex justify-center items-center gap-[1rem] text-figma-white pt-[2rem] figma-body-m">
          <button
          aria-label="Previous page"
            className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
              page === 1
                ? "bg-figma-greyish-blue hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-500"
                : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
            }`}
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            Previous
          </button>

          {getPageNumbers().map((number,index) => (
            <button
            aria-label = "Page number"
              className={`tablet:min-w-[3rem] phone:min-w-[2rem]  h-[3rem]  rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
                number === "..."
                  ? "border-none bg-transparent"
                  : page === number
                  ? "bg-figma-greyish-blue hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-500"
                  : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
              }`}
              key={index}
              onClick={() => {
                setPage(number);
              }}
              disabled={page === number || number === "..."}
            >
              {number}
            </button>
          ))}
          <button
          aria-label="Next Page"
            className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
              page === pageNumbers.length
                ? "bg-figma-greyish-blue hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-500"
                : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
            }`}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === pageNumbers.length}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
