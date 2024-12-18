import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";
import { useData } from "./DataContext";
import { Outlet } from "react-router";
import Pagination from "./Pagination";
import { useEffect } from "react";

const BookmarkPage = () => {
  const {content,fetchData,searchContent,setSearchContent,setMovieCurrentPage,setTvSeriesCurrentPage, movieCurrentPage,tvSeriesCurrentPage, itemsPerPage} = useData()


  const movieOfLastItem = movieCurrentPage * itemsPerPage;
  const movieOfFirstItem = movieOfLastItem - itemsPerPage;
  const currentMovies = searchContent
    .filter(
      (item) => item.category === "Movie"
    )
    .slice(movieOfFirstItem, movieOfLastItem);

    const tvSeriesOfLastItem = tvSeriesCurrentPage * itemsPerPage;
    const tvSeriesOfFirstItem = tvSeriesOfLastItem - itemsPerPage;
    const currentTvSeries = searchContent
      .filter(
        (item) => item.category === "TV Series"
      )
      .slice(tvSeriesOfFirstItem, tvSeriesOfLastItem);  
 
    useEffect(() => {
      if (searchContent.length !== content.length) {
        setMovieCurrentPage(1);
        setTvSeriesCurrentPage(1)
      }
    }, [searchContent]);

  const createBookmarkCard = (media) => {
    // MediaCard takes up a lot of space, that's why we have this function
    return (
      <MediaCard
      thumbnail={`/${media.thumbnail.regular.large.replace(/^\/+/, '')}`}
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
      <SearchBar
        placeholder="Search for bookmarked shows"
        icon="src/assets/svg/icon-search.svg"
        data={content}
        setSearchData={setSearchContent}
        switchViews={true} //  switch between different views when searching
      />

      <div id="defaultview">
        <h1
          className={
            currentMovies.length <= 0
              ? "hidden"
              : "figma-heading-l"
          }
        >
          Bookmarked Movies
        </h1>

        <div
          className={
            currentMovies.length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-x-[40px] desktop:gap-y-[32px] tablet:gap-x-[30px] tablet:gap-y-[24px] phone:gap-x-[15px] phone:gap-y-[16px] pt-10 pb-10"
          }
        >
          {currentMovies.map((media) => createBookmarkCard(media))}
        </div>

        <Pagination type="movies"/>

        <h1
          className={
            currentTvSeries
              .length <= 0
              ? "hidden"
              : "figma-heading-l"
          }
        >
          Bookmarked TV Series
        </h1>

        <div
          className={
            currentTvSeries
              .length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-x-[40px] desktop:gap-y-[32px] tablet:gap-x-[30px] tablet:gap-y-[24px] phone:gap-x-[15px] phone:gap-y-[16px] pt-10 pb-10"
          }
        >
 {currentTvSeries.map((media) => createBookmarkCard(media))}
        </div>
          <Pagination type="tvseries" />
      </div>
      <Outlet/>
    </div>
  );
};

export default BookmarkPage;
