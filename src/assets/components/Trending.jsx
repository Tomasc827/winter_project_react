import { useState, useEffect, useRef } from "react";
import BookmarkButton from "./BookmarkButton";
import { useData } from "./DataContext";

const TrendingMoviesCarousel = () => {
  const [movies, setMovies] = useState([]);
  const { onButtonClick } = useData();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/content");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data.filter((movie) => movie.isTrending));
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // scrollbar on drag, hope it works

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; //multiply by 2 for faster scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/content");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.filter((movie) => movie.isTrending));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const renderCategoryIcon = (category) => {
    if (category === "Movie") {
      return (
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
            fill="#FFF"
            opacity=".75"
          />
        </svg>
      );
    } else if (category === "TV Series") {
      return (
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
            fill="#FFF"
            opacity=".75"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div id="trending1" className="text-figma-white">
      <h1
        id="trendingheading"
        className="figma-heading-l
          desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]
          pb-[1.5rem]
          phone:pb-[1.5rem]
          tablet:pb-[1.5rem]
          desktop:pb-[1.56rem]
          
          "
      >
        Trending
      </h1>
      <div
        id="trending2"
        ref={scrollRef}
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onDrag}
        style={{
          scrollBehavior: 'smooth'
        }}
        className="flex w-full h-full cursor-grab active:cursor-grabbing overflow-x-auto disappear-scrollbar select-none"
      >
        <div className="flex phone:gap-x-[1rem] tablet:gap-x-[2.5rem] flex-nowrap w-full h-full ">
          {movies.map((movie, index) => (
            <div key={index} className="inline-block">
              <div className="relative group">
                <picture className="object-cover rounded-lg group-hover:opacity-25 transition-opacity duration-300">
                  <source
                    media="(min-width: 1440px)"
                    srcSet={movie.thumbnail.trending.large}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={movie.thumbnail.trending.medium}
                  />
                  <img
                    src={movie.thumbnail.trending.small}
                    alt={movie.title}
                    className="phone:min-w-[15rem] h-[8.75rem] phone:block tablet:hidden desktop:hidden rounded-lg object-cover"
                  />
                  <img
                    src={movie.thumbnail.trending.small}
                    alt={movie.title}
                    className="desktop:min-w-[29.375rem] desktop:min-h-[14.375rem]
                  tablet:min-w-[29.375rem] tablet:h-[14.375rem] tablet:block desktop:block phone:hidden rounded-lg object-cover"
                  />
                </picture>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    style={{
                      width: "7.3125rem",
                      height: "3rem",
                      borderRadius: "1.78125rem",
                      background: "rgba(255, 255, 255, 0.25)",
                    }}
                    className="flex items-center justify-center cursor-pointer select-none"
                    onClick={onButtonClick}
                  >
                    <svg
                      width="30"
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                        fill="#FFF"
                      />
                    </svg>
                    <span className="text-white ml-2">Play</span>
                  </div>
                </div>
                <BookmarkButton
                  media_id={movie.id}
                  isBookmarked={movie.isBookmarked}
                  reloadData={fetchData}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-figma-white p-4 rounded-b-lg">
                  <div className=" text-sm space-x-2 figma-body-s dekstop:text-[0.8125rem] tablet:text-[0.8125rem] flex items-center gap-2 desktop:gap-2 tablet:gap-2 phone:gap-[0.38rem] phone:text-[0.6875rem] phone:h-3.5 tablet:h-4 desktop:h-4">
                    <span>{movie.year}</span>
                    <span className="flex items-center space-x-1">
                      {renderCategoryIcon(movie.category)}
                      <span>{movie.category}</span>
                    </span>
                    <span>{movie.rating}</span>
                  </div>
                  <h3
                    className="figma-heading-xs dekstop:text-[1.125rem] tablet:text-[1.125rem]
                  phone:text-[0.875rem] phone:h-[1.125rem]
                  tablet:h-[1.4375rem] desktop:h-[1.4375rem] text-figma-w"
                  >
                    {movie.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMoviesCarousel;
