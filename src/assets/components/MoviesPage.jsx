import { useEffect, useState } from "react";
import { useData } from "./DataContext";
import IconCategoryMovie from "./formatted_svg/IconCategoryMovie";
import IconPlay from "./formatted_svg/IconPlay";
import SearchBar from "./SearchBar";
import BookmarkButton from "./BookmarkButton";

const MoviesPage = () => {
  const { movies, setMovies } = useData();
  const [searchMovies, setSearchMovies] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/content")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setSearchMovies(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="text-figma-white phone:px-4 tablet:px-6 desktop:pr-9 desktop:pl-[10.25rem] pb-4">
        <SearchBar
          placeholder="Search for movies"
          icon="src/assets/svg/icon-search.svg"
          data={movies}
          setSearchData={setSearchMovies}
        />

        <h1
          className="figma-heading-l phone:text-xl phone:font-normal
        pb-[1.5rem]
        desktop:pb-8
        "
        >
          Movies
        </h1>

        <div
          className="grid grid-cols-2 justify-center
        phone:grid-cols-2 phone:gap-y-[1rem] phone:gap-x-[0.94rem]
        tablet:grid-cols-3 tablet:gap-y-6 tablet:gap-x-[1.81rem]
        desktop:grid-cols-4 desktop:gap-y-8 desktop:gap-x-10
        "
        >
          {searchMovies
            .filter((movie) => movie.category === "Movie")
            .map((movie) => (
              <div
                key={movie.id}
                className="relative rounded-lg overflow-hidden
                phone:w-[10.25rem] phone:h-[9.625rem]
                tablet:w-[13.75rem] tablet:h-[12rem]
                desktop:w-[17.5rem] desktop:h-[14.125rem]
                "
              >
                <div className="group relative">
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
                      className="w-full rounded-lg"
                    />
                  </picture>

                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-200 transition-opacity desktop:pl-[4.81rem] desktop:pr-[5.37rem] desktop:py-[3.94rem]
               tablet:pl-[3rem] tablet:pr-[4rem] tablet:py-[3rem] phone:pl-[1.5rem] phone:pr-[2.5rem] phone:py-[2rem] rounded-lg
               "
                  >
                    <button className="flex desktop:gap-[1.19rem] bg-white bg-opacity-25 rounded-[1.78125rem] pl-[0.56rem] pr-[1.5rem] tablet:gap-[0.935rem] phone:gap-[0.698rem]">
                      <span className="py-[0.56rem]">
                        <IconPlay />
                      </span>
                      <span className="figma-heading-xs pt-[0.75rem] pb-[0.81rem]">
                        Play
                      </span>
                    </button>
                  </div>
                </div>

                <BookmarkButton
                  media_id={movie.id}
                  isBookmarked={movie.isBookmarked}
                  reloadData={fetchData}
                />

                <div
                  className="flex flex-col gap-[0.31rem] pt-2 bg-gradient-to-t to-transparent rounded-b-lg
                "
                >
                  <div
                    className="figma-body-s flex items-center phone:gap-2 phone:text-[0.6875rem] phone:h-3.5 tablet:h-4 desktop:h-4
                  "
                  >
                    <span>{movie.year}</span>
                    <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                    <div className="flex items-center gap-[0.38rem]">
                      <IconCategoryMovie />
                      <span>{movie.category}</span>
                    </div>
                    <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                    <span>{movie.rating}</span>
                  </div>

                  <div
                    className="figma-heading-xs phone:text-sm phone:font-normal phone:h-[1.125rem]
                  tablet:h-[1.4375rem] desktop:h-[1.4375rem]"
                  >
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
