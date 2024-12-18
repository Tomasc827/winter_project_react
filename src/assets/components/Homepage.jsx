import Trending from "./Trending";
import BookmarkButton from "./BookmarkButton";
import IconPlay from "./formatted_svg/IconPlay";
import IconCategoryMovie from "./formatted_svg/IconCategoryMovie";
import IconCategoryTV from "./formatted_svg/IconCategoryTV";
import SearchBar from "./SearchBar";
import { useData } from "./DataContext";
import { Outlet } from "react-router";
import { useEffect } from "react";
import Pagination from "./Pagination";
import SettingsSVG from "./formatted_svg/SettingsSVG";
import RatingsButton from "./RatingsButton";

const Homepage = () => {
  const {
    onButtonClick,
    currentUser,
    content,
    searchContent,
    setSearchContent,
    fetchData,
    setCurrentPage,
    currentPage,
    itemsPerPage,
    onAdminClick,
  } = useData();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchContent
   ? searchContent.filter(
      (item) => item.category === "TV Series" || item.category === "Movie"
    )
    .slice(indexOfFirstItem, indexOfLastItem) : []

    useEffect(() => {
      if (searchContent.length !== content.length) {
        setCurrentPage(1);
      }
    }, [searchContent]);

  const renderCategoryIcon = (category) => {
    if (category === "Movie") {
      return <IconCategoryMovie />;
    } else if (category === "TV Series") {
      return <IconCategoryTV />;
    }
    return null;
  };

  return (
    <div className="text-figma-white phone:pl-4 tablet:pl-6 desktop:pl-[10.25rem] pb-[3.5rem]">
      <SearchBar
        placeholder="Search for movies or TV series"
        icon="src/assets/svg/icon-search.svg"
        data={content}
        setSearchData={setSearchContent}
        switchViews={false}
        hideList={["heading5", "trendingheading", "trending1", "trending2"]}
        unhideList={["padding1"]}
      />
      
      <Trending />
      <div className="text-figma-white phone:pr-4 tablet:pr-6 desktop:pr-9">
        <h1
          id="heading5"
          className="figma-heading-l
          desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]
          pb-[1.5rem]
          phone:pb-[1.5rem]
          tablet:pb-[1.5rem]
          desktop:pb-[2rem]
          pt-[1.5rem]
          desktop:pt-[2.5rem]
          tablet:pt-[2.44rem]
          mobile:pt-[1.5rem]
          "
        >
          {!currentUser || !currentUser.id
            ? "Our Recommendations"
            : "Recommended for you"}
        </h1>
        <div
          id="padding1"
          className="hidden desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]
          pb-[1.5rem]
          phone:pb-[1.5rem]
          tablet:pb-[1.5rem]
          desktop:pb-[2.38rem] relative"
        ></div>
        {content.length === 0 ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : searchContent.length === 0 ? (
          ""
        ) : (
          <ul
            className="grid grid-cols-2 justify-center
        phone:grid-cols-2 phone:gap-y-[1rem] phone:gap-x-[0.94rem]
        tablet:grid-cols-3 tablet:gap-y-6 tablet:gap-x-[1.81rem]
        desktop:grid-cols-4 desktop:gap-y-8 desktop:gap-x-10"
          >
            {currentItems.map((item) => (
              <li
                key={item.id}
                className="relative rounded-lg overflow-hidden
                phone:w-[100%] phone:h-[100%]
                tablet:w-[100%] tablet:h-[100%]
                desktop:w-[100%] desktop:max-w-[50rem]  desktop:h-[100%]"
              >
                <div className="relative group">
                  <picture>
                    <source
                      media="(min-width: 1440px)"
                      srcSet={item.thumbnail.regular.large}
                      className="w-[100%] h-[100%] max-w-[50rem]"
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={item.thumbnail.regular.medium}
                      className="w-[100%] h-[100%]"
                    />
                    <img
                      src={item.thumbnail.regular.small}
                      alt={item.title}
                      className="w-full rounded-lg h-[100%]"
                    />
                  </picture>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-200 transition-opacity desktop:pl-[4.81rem] desktop:pr-[5.37rem] desktop:py-[3.94rem]
               tablet:pl-[3rem] tablet:pr-[4rem] tablet:py-[3rem] phone:pl-[1.5rem] phone:pr-[2.5rem] phone:py-[2rem] rounded-lg flex justify-center items-center"
                    aria-label="Show" onClick={() => onButtonClick(item.id)}
                  >
                    <button aria-label="Play" className="flex desktop:gap-[1.19rem] bg-white bg-opacity-25 rounded-[1.78125rem] pl-[0.56rem] pr-[1.5rem] tablet:gap-[0.935rem] phone:gap-[0.698rem] w-[117px] h-12">
                      <span className="py-[0.56rem]">
                        <IconPlay />
                      </span>
                      <span className="figma-heading-xs pt-[0.75rem] pb-[0.81rem] h-[1.4375rem]">
                        Play
                      </span>
                    </button>
                  </div>
                </div>

                <BookmarkButton
                  media_id={item.id}
                  isBookmarked={item.isBookmarked}
                  reloadData={fetchData}
                />
                
                {currentUser.role === "Admin" ? <div onClick={() => onAdminClick(item.id)}>
                <SettingsSVG/>
                </div> : null}
                <div
                  className="flex flex-col gap-[0.3125rem] desktop:gap-[0.3125rem] tablet:gap-[0.3125rem] phone:gap-[0.25rem] pt-2 bg-gradient-to-t to-transparent rounded-b-lg
                "
                >
                  <div className="figma-body-s dekstop:text-[0.8125rem] tablet:text-[0.8125rem] flex items-center gap-2 desktop:gap-2 tablet:gap-2 phone:gap-[0.38rem] phone:text-[0.6875rem] phone:h-3.5 tablet:h-4 desktop:h-4">
                    <span>{item.year}</span>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="3"
                        viewBox="0 0 3 3"
                        fill="none"
                      >
                        <circle
                          opacity="0.5"
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-[0.38rem] desktop:gap-[0.38rem] tablet:gap-[0.38rem] phone:gap-[0.25rem]">
                      {renderCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="3"
                        viewBox="0 0 3 3"
                        fill="none"
                      >
                        <circle
                          opacity="0.5"
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span>{item.rating}</span>
                  </div>

                  <div
                    className="figma-heading-xs dekstop:text-[1.125rem] tablet:text-[1.125rem]
                  phone:text-[0.875rem] phone:h-[1.125rem]
                  tablet:h-[1.4375rem] desktop:h-[1.4375rem]"
                  >
                    
                    {item.title}
                  </div>
                  <RatingsButton 
                    contentId={item.id}
                    averageRating={item.averageRating}
                    totalRatings={item.totalRatings}
                    userRating={item.userRating}
                    />
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination

        />
      </div>
      <Outlet />
    </div>
  );
};

export default Homepage;
