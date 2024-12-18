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
    <div className="w-fit pb-12 desktop:pl-40 desktop:pr-[2rem] tablet:px-12 phone:px-12 text-figma-white">
      <SearchBar
        placeholder="Search for bookmarked shows"
        icon="src/assets/svg/icon-search.svg"
        data={content}
        setSearchData={setSearchContent}
        switchViews={false} //  switch between different views when searching
        hideList={["bookmarkedMovies","bookmarkedSeries"]}
      />

      <div>
        <h1
        id="bookmarkedMovies"
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
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-10 tablet:gap-[1.8125rem] phone:gap-[0.9375rem] pt-10 pb-10"
          }
        >
          {currentMovies.map((media) => createBookmarkCard(media))}
        </div>

        <Pagination type="movies"/>

<h1
id="bookmarkedSeries"
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
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-10 tablet:gap-[1.8125rem] phone:gap-[0.9375rem] pt-10 pb-10"
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
