import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";
import { useData } from "./DataContext";
import { Outlet } from "react-router";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import LoadingSpinner from "./messages/LoadingSpinner";

const BookmarkPage = () => {
  const {
    content,
    fetchData,
    searchContent,
    setSearchContent,
    setMovieCurrentPage,
    setTvSeriesCurrentPage,
    movieCurrentPage,
    tvSeriesCurrentPage,
    itemsPerPage,
  } = useData();

  const [isLoading, setIsLoading] = useState(false);

  const movieOfLastItem = movieCurrentPage * itemsPerPage;
  const movieOfFirstItem = movieOfLastItem - itemsPerPage;
  const currentMovies = searchContent
    .filter((item) => item.category === "Movie")
    .slice(movieOfFirstItem, movieOfLastItem);

  const tvSeriesOfLastItem = tvSeriesCurrentPage * itemsPerPage;
  const tvSeriesOfFirstItem = tvSeriesOfLastItem - itemsPerPage;
  const currentTvSeries = searchContent
    .filter((item) => item.category === "TV Series")
    .slice(tvSeriesOfFirstItem, tvSeriesOfLastItem);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (searchContent.length !== content.length) {
      setMovieCurrentPage(1);
      setTvSeriesCurrentPage(1);
    }
  }, [searchContent]);

  const createBookmarkCard = (media) => {
    // MediaCard takes up a lot of space, that's why we have this function
    return (
      <MediaCard
        thumbnail={`/${media.thumbnail.regular.large.replace(/^\/+/, "")}`}
        title={media.title}
        year={media.year}
        category={media.category}
        rating={media.rating}
        key={media.id}
        media_id={media.id}
        isBookmarked={media.isBookmarked}
        reloadData={fetchData}
        id={media.id}
        averageRating={media.averageRating}
        totalRatings={media.totalRatings}
        userRating={media.userRating}
      />
    );
  };

  return (
    <div className="w-fit bg-figma-dark-blue pb-12 desktop:pl-[164px] desktop:pr-[36px] tablet:px-[25px] phone:px-[16px] text-figma-white">
      {isLoading && <LoadingSpinner />}
      <SearchBar
        placeholder="Search for bookmarked shows"
        icon="src/assets/svg/icon-search.svg"
        data={content}
        setSearchData={setSearchContent}
        switchViews={false} //  switch between different views when searching
        hideList={["bookmarkedMovies", "bookmarkedSeries"]}
      />

      <div>
        <h1
          id="bookmarkedMovies"
          className={
            currentMovies.length <= 0
              ? "hidden"
              : "figma-heading-l desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]"
          }
        >
          Bookmarked Movies
        </h1>

        <div
          className={
            currentMovies.length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-x-[40px] desktop:gap-y-[32px] tablet:gap-x-[30px] tablet:gap-y-[24px] phone:gap-x-[15px] phone:gap-y-[16px] pt-[2.38rem] pb-[25px] phone:pt-[1.5rem] tablet:pt-[1.5rem] desktop:pt-[2.38rem]"
          }
        >
          {currentMovies.map((media) => createBookmarkCard(media))}
        </div>

        <Pagination type="movies" />

        <h1
          id="bookmarkedSeries"
          className={
            currentTvSeries.length <= 0
              ? "hidden"
              : "figma-heading-l desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]"
          }
        >
          Bookmarked TV Series
        </h1>

        <div
          className={
            currentTvSeries.length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-x-[40px] desktop:gap-y-[32px] tablet:gap-x-[30px] tablet:gap-y-[24px] phone:gap-x-[15px] phone:gap-y-[16px] pt-[2.38rem] pb-[25px] phone:pt-[1.5rem] tablet:pt-[1.5rem] desktop:pt-[2.38rem]"
          }
        >
          {currentTvSeries.map((media) => createBookmarkCard(media))}
        </div>
        <Pagination type="tvseries" />
      </div>
      <Outlet />
    </div>
  );
};

export default BookmarkPage;
