import { useState,useRef, useEffect } from "react";
import BookmarkButton from "./BookmarkButton";
import { useData } from "./DataContext";
import IconPlay from "./formatted_svg/IconPlay";
import SettingsSVG from "./formatted_svg/SettingsSVG";
import RatingsButton from "./RatingsButton";

const TrendingMoviesCarousel = () => {

  const {content, onButtonClick,fetchData,currentUser,onAdminClick} = useData();

  const trendingContent = Array.isArray(content) 
  ? content.filter(media => 
      media.isTrending && 
      media.thumbnail?.trending?.small && 
      media.thumbnail?.trending?.large
    )
  : [];

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const autoScrollTimeout = useRef(0)
  const oldScrollLeft = useRef(0)
  const autoScrollTime = 5000
  let initScroll = false

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
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollTimeout.current = Date.now() + autoScrollTime
  };

  const onScroll = (e) => {
    autoScrollTimeout.current = Date.now() + autoScrollTime
  }

  useEffect(() => {
    if (initScroll) return
    initScroll = true
    let t = setInterval(() => {
      if (isDragging) return;
      if (Date.now() < autoScrollTimeout.current) return;

      let scrollAmount = window.innerWidth

      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + scrollAmount;

      if (scrollRef.current.scrollLeft == oldScrollLeft.current && scrollRef.current.scrollLeft > 0) {
        scrollRef.current.scrollLeft = 0
      }
    
      oldScrollLeft.current = scrollRef.current.scrollLeft

    }, autoScrollTime);
  }, [])

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


  if (trendingContent.length === 0) {
    return null; }

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
        onScroll={onScroll}
        style={{
          scrollBehavior: 'smooth'
        }}
        className="flex w-full h-full cursor-grab active:cursor-grabbing overflow-x-auto disappear-scrollbar select-none"
      >
        <div className="flex phone:gap-x-[1rem] tablet:gap-x-[2.5rem] flex-nowrap w-full h-full ">
          {trendingContent.map((movie, index) => (
            <div key={index} className="inline-block">
              <div className="relative group">
                <picture>
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

                <div
                  aria-label="Trending Show Play"
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-200 transition-opacity desktop:pl-[4.81rem] desktop:pr-[5.37rem] desktop:py-[3.94rem] flex justify-center items-center
               tablet:pl-[3rem] tablet:pr-[4rem] tablet:py-[3rem] phone:pl-[1.5rem] phone:pr-[2.5rem] phone:py-[2rem] rounded-lg
               "
               onClick={() => onButtonClick(movie.id)}
                  >
                    <div className="flex desktop:gap-[1.19rem] bg-white bg-opacity-25 rounded-[1.78125rem] pl-[0.56rem] pr-[1.5rem] tablet:gap-[0.935rem] phone:gap-[0.698rem] w-[117px] h-12" type="button">
                      <span className="py-[0.56rem]">
                        <IconPlay />
                      </span>
                      <span className="figma-heading-xs pt-[0.75rem] pb-[0.81rem] h-[1.4375rem]">
                        Play
                      </span>
                    </div>
                  </div>

                <BookmarkButton
                  media_id={movie.id}
                  isBookmarked={movie.isBookmarked}
                  reloadData={fetchData}
                />

{currentUser.role === "Admin" ? <div aria-label="Admin Settings" onClick={() => onAdminClick(movie.id)}>
                <SettingsSVG/>
                </div> : null}

                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 rounded-b-lg 
                pl-[1rem] pb-[1rem]
                phone:pl-[1rem] phone:pb-[1rem]
                tablet:pl-[1.5rem] tablet:pb-[1.5rem]
                desktop:pl-[1.5rem] desktop:pb-[1.5rem]">

                  <div className="figma-body-m flex items-center gap-2
                  dekstop:text-[0.9375rem] tablet:text-[0.9375rem] phone:text-[0.75rem]
                  phone:h-[0.9375rem] tablet:h-[1.1875rem] desktop:h-[1.1875rem]
                  pb-[0.1875rem]
                  tablet:pb-[0.1875rem]
                  desktop:pb-[0.1875rem]
                  phone:pb-[0.25rem]
                  ">
                    <span className="opacity-75">{movie.year}</span>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="3"
                        viewBox="0 0 3 3"
                        fill="none"
                      >
                        <circle
                          opacity="0.75"
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span className="flex items-center gap-[0.38rem]">
                      {renderCategoryIcon(movie.category)}
                      <span className="opacity-75">{movie.category}</span>
                    </span>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="3"
                        viewBox="0 0 3 3"
                        fill="none"
                      >
                        <circle
                          opacity="0.75"
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span className="opacity-75">{movie.rating}</span>
                  </div>
                  <h3
                    className="figma-heading-s
                    dekstop:text-[1.5rem] tablet:text-[1.5rem] phone:text-[0.9375rem]
                    phone:h-[1.1875rem] tablet:h-[1.875rem] desktop:h-[1.875rem]"
                  >
                   {movie.title.length > 23 ? `${movie.title.slice(0, 23)}...` : movie.title}
                  </h3>
                  <RatingsButton 
                    contentId={movie.id}
                    averageRating={movie.averageRating}
                    totalRatings={movie.totalRatings}
                    userRating={movie.userRating}
                    />
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