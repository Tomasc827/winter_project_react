import { useEffect } from "react";
import { useData } from "./DataContext";
import IconCategoryMovie from "./formatted_svg/IconCategoryMovie";
import IconBookmarkEmpty from "./formatted_svg/IconBookmarkEmpty";
import IconSearch from "./formatted_svg/IconSearch";

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
      <div className="text-figma-white phone:px-4 tablet:px-6 desktop:pr-9 desktop:pl-[10.25rem] pb-4">
        <div
          className="flex items-center
        phone:pb-[1.5rem] phone:pt-[5rem] phone:gap-4
        tablet:pb-8 tablet:pt-32 tablet:gap-6
        desktop:pb-8 desktop:pt-16 desktop:gap-6
        "
        >
          <IconSearch />
          <input
            type="text"
            placeholder="Search for movies"
            className="figma-heading-m p-0 bg-transparent flex-1 border-0 focus:border-0 focus:border-b-[0.06rem] focus:ring-0 focus:border-figma-greyish-blue
            phone:text-base phone:h-5
            tablet:h-[1.875rem]
            desktop:h-[1.875rem]
            caret-figma-red
            "
          />
        </div>

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
          {movies
            .filter((movie) => movie.category === "Movie")
            .map((movie) => (
              <div
                key={movie.id}
                className="relative rounded-lg overflow-hidden shadow-lg
                phone:w-[10.25rem] phone:h-[9.625rem]
                tablet:w-[13.75rem] tablet:h-[12rem]
                desktop:w-[17.5rem] desktop:h-[14.125rem]
                "
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
                    className="w-full rounded-lg"
                  />
                </picture>

                <div
                  className="absolute
                w-8 h-8
                top-2 right-2
                tablet:top-4 tablet:right-4
                desktop:top-4 desktop:right-4
                flex items-center justify-center
                bg-[#10131d] bg-opacity-50 rounded-full"
                >
                  <IconBookmarkEmpty />
                </div>

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
