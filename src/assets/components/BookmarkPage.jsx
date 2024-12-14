import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";
import { useData } from "./DataContext";
import { Outlet } from "react-router";

const BookmarkPage = () => {
  const {content,fetchData,searchContent,setSearchContent} = useData()


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
        switchViews={true} //  switch between different views when searching
      />

      <div id="defaultview">
        <h1
          className={
            searchContent.filter((media) => media.category == "Movie").length <= 0
              ? "hidden"
              : "figma-heading-l"
          }
        >
          Bookmarked Movies
        </h1>

        <div
          className={
            searchContent.filter((media) => media.category == "Movie").length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-10 tablet:gap-[1.8125rem] phone:gap-[0.9375rem] pt-10 pb-10"
          }
        >
          {searchContent.map((media, index) => {
            if (media.category == "Movie") {
              return createBookmarkCard(media);
            }
          })}
        </div>

        <h1
          className={
            searchContent.filter((media) => media.category == "TV Series")
              .length <= 0
              ? "hidden"
              : "figma-heading-l"
          }
        >
          Bookmarked TV Series
        </h1>

        <div
          className={
            searchContent.filter((media) => media.category == "TV Series")
              .length <= 0
              ? "hidden"
              : "grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-10 tablet:gap-[1.8125rem] phone:gap-[0.9375rem] pt-10 pb-10"
          }
        >
          {searchContent.map((media, index) => {
            if (media.category == "TV Series") {
              return createBookmarkCard(media);
            }
          })}
        </div>
      </div>
      <div id="searchview" className="hidden">
        <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 desktop:gap-10 tablet:gap-[1.8125rem] phone:gap-[0.9375rem] pt-10">
          {searchContent.map((media, index) => {
            return createBookmarkCard(media);
          })}
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default BookmarkPage;
