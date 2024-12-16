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
    location,
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

  const page = findCurrentPage()

  return (
    <>
      {totalItems < 10 ? null : (
        <div className="flex justify-center items-center gap-[1rem] text-figma-white pt-[2rem] figma-body-m">
          <button
            className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
              page === 1
                ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500"
                : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
            }`}
            onClick={() => {
              setPage(page - 1);
              window.scrollTo( { top: type === "tvseries" ? 1000 : 0, behavior: "smooth" });
            }}
            disabled={page === 1}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              className={`tablet:min-w-[3rem] phone:min-w-[2rem]  h-[3rem]  rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
                page === number
                  ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500"
                  : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
              }`}
              key={number}
              onClick={() => {
                setPage(number);
                window.scrollTo( { top: type === "tvseries" ? 1000 : 0, behavior: "smooth" });
              }}
              disabled={page === number}
            >
              {number}
            </button>
          ))}
          <button
            className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${
              page === pageNumbers.length
                ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500"
                : "bg-figma-red text-figma-white hover:bg-figma-white hover:shadow-lg hover:shadow-white hover:text-figma-dark-blue duration-700"
            }`}
            onClick={() => {
              setPage(page + 1);
              window.scrollTo( { top: type === "tvseries" ? 1000 : 0, behavior: "smooth" });
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
