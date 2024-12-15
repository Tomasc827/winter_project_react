import { useData } from "./DataContext";

const Pagination = () => {
    const {searchContent,currentPage,setCurrentPage,itemsPerPage,location} = useData()

    const totalItems = location.pathname === "/" 
    ? searchContent.length 
    : location.pathname === "/movies" 
    ? searchContent.filter(show => show.category === "Movie").length 
    : location.pathname === "/tvseries" 
    ? searchContent.filter(show => show.category === "TV Series").length 
    : searchContent.length;
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }


    return ( 
        <>
        {totalItems === 0 ? null : <div className="flex justify-center items-center gap-[1rem] text-figma-white pt-[2rem] figma-body-m">
            <button 
            className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${currentPage === 1 ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500" : "bg-figma-red text-figma-white hover:bg-figma-white hover:text-figma-dark-blue duration-700"}`}
            onClick={() => {
                setCurrentPage(currentPage -1)
                window.scrollTo({top: 0, behavior:"smooth"})
            }}
                disabled= {currentPage === 1}>
                    Previous
            </button>

            {pageNumbers.map(number => (
                <button 
                className={`border tablet:min-w-[3rem] phone:min-w-[2rem]  h-[3rem]  rounded-[0.375rem] figma-body-m mb-[1.5rem] ${currentPage === number ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500" : "bg-figma-red text-figma-white hover:bg-figma-white hover:text-figma-dark-blue duration-700"}`}
                key={number}
                onClick={() => {
                    setCurrentPage(number)
                    window.scrollTo({top:0,behavior:"smooth"})
                }}
                >
                    {number}
                </button>
            ))}
        <button 
                    className={`tablet:w-[8rem] h-[3rem] phone:w-[4rem] rounded-[0.375rem] figma-body-m mb-[1.5rem] ${currentPage === pageNumbers.length ? "bg-figma-greyish-blue hover:bg-figma-semi-dark-blue duration-500" : "bg-figma-red text-figma-white hover:bg-figma-white hover:text-figma-dark-blue duration-700"}`}
        onClick={() => {
            setCurrentPage(currentPage + 1)
            window.scrollTo({top:0,behavior:"smooth"})
        }}
            disabled={ currentPage === pageNumbers.length}>
                Next

        </button>
        </div>}
        </>
     );
}
 
export default Pagination;