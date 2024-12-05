import { useEffect } from "react";
import { useData } from "./DataContext";
import IconCategoryMovie from "./formatted_svg/IconCategoryMovie";

const MoviesPage = () => {
  const { movies, setMovies } = useData();
  useEffect(() => {
    fetch("http://localhost:5000/content")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="text-figma-white">

{/* Search bar will be here */}

        <h1>Movies</h1>

        <div className="grid grid-cols-2 phone:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 justify-center phone:w-[21.4375rem] phone:h-[30.875rem] gap-y-[1.0625rem] gap-x-[1.125rem]">
  {movies
    .filter((movie) => movie.category === "Movie")
    .map((movie) => (
      <div
key={movie.id}
        className=" rounded-lg overflow-hidden shadow-lg phone:w-[10.25rem] phone:h-[9.625rem] "
      >
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={movie.thumbnail.regular.large}
          />
          <source
            media="(min-width: 768px)"
            srcSet={movie.thumbnail.regular.medium}
          />
          <img
            src={movie.thumbnail.regular.small}
            alt={movie.title}
            className=" w-full h-[6.875rem] rounded-lg"
          />
        </picture>
 
{/* Bookmark icon will be here */}
 
        <div className="bottom-0 left-0 flex flex-col gap-1 w-full px-2 py-2 bg-gradient-to-t to-transparent rounded-b-lg">

          <div className="flex items-center gap-2 text-[0.6875rem] font-['Outfit'] opacity-75">
            <span>{movie.year}</span>
            <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
            <div className="flex items-center gap-1">
              <IconCategoryMovie />
              <span>{movie.category}</span>
            </div>
            <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
            <span>{movie.rating}</span>
          </div>
 
          <div className="text-white text-sm font-medium font-['Outfit']">
            {movie.title}
          </div>
        </div>
      </div>
    ))}
</div>
      </div>
    </>
  );
};

export default MoviesPage;
