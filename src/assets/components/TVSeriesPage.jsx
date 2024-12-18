import { useEffect} from "react";
import { useData } from "./DataContext";
import IconCategoryTV from "./formatted_svg/IconCategoryTV";
import IconPlay from "./formatted_svg/IconPlay";
import SearchBar from "./SearchBar";
import BookmarkButton from "./BookmarkButton";
import { Outlet } from "react-router";
import Pagination from "./Pagination";
import SettingsSVG from "./formatted_svg/SettingsSVG";
import RatingsButton from "./RatingsButton";

const TVSeriesPage = () => {
  const { content,onButtonClick,fetchData,searchContent,setSearchContent,setCurrentPage,currentPage,itemsPerPage,currentUser,onAdminClick } = useData();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchContent
    .filter(
      (item) => item.category === "TV Series"
    )
    .slice(indexOfFirstItem, indexOfLastItem);
 
    useEffect(() => {
      if (searchContent.length !== content.length) {
        setCurrentPage(1);
      }
    }, [searchContent]);

  return (
    <>
      <div className="text-figma-white phone:px-4 tablet:px-6 desktop:pr-9 desktop:pl-[10.25rem] pb-[3.5rem]">
        <SearchBar
          placeholder="Search for TV series"
          icon="src/assets/svg/icon-search.svg"
          data={content}
          setSearchData={setSearchContent}
          switchViews={false} //  switch between different views when searching
          hideList={["heading1"]} // hide specific elements when searching [this only matters if switchViews is false]
          unhideList={["padding1"]}
        />

        <h1
          id="heading1"
          className="figma-heading-l
          desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]
          pb-[1.5rem]
          phone:pb-[1.5rem]
          tablet:pb-[1.5rem]
          desktop:pb-[2.38rem]
        "
        >
          TV Series
        </h1>

        <div
          id="padding1"
          className="hidden desktop:text-[2rem] tablet:text-[2rem] phone:text-[1.25rem]
          pb-[1.5rem]
          phone:pb-[1.5rem]
          tablet:pb-[1.5rem]
          desktop:pb-[2.38rem]"
        ></div>

        <div
          className="grid grid-cols-2 justify-center
        phone:grid-cols-2 phone:gap-y-[1rem] phone:gap-x-[0.94rem]
        tablet:grid-cols-3 tablet:gap-y-6 tablet:gap-x-[1.81rem]
        desktop:grid-cols-4 desktop:gap-y-8 desktop:gap-x-10
        "
        >
          {currentItems
            .map((serie) => (
              <div
                key={serie.id}
                className="relative rounded-lg overflow-hidden
                 phone:w-[100%] phone:h-[100%]
                tablet:w-[100%] tablet:h-[100%]
                desktop:w-[100%] desktop:h-[100%] desktop:max-w-[50rem]
                "
              >
                <div className="group relative">
                  <picture>
                    <source
                      media="(min-width: 1440px)"
                      srcSet={`/${serie.thumbnail.regular.large.replace(/^\/+/, '')}`}
                      className="w-[100%] h-[100%] max-w-[50rem]"
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={`/${serie.thumbnail.regular.large.replace(/^\/+/, '')}`}
                      className="w-[100%] h-[100%]"
                    />
                    <img
                      src={`/${serie.thumbnail.regular.large.replace(/^\/+/, '')}`}
                      alt={serie.title}
                      className="w-full rounded-lg h-[100%]"
                    />
                  </picture>

                  <div
                  aria-label="TV Series"
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-200 transition-opacity desktop:pl-[4.81rem] desktop:pr-[5.37rem] desktop:py-[3.94rem]
               tablet:pl-[3rem] tablet:pr-[4rem] tablet:py-[3rem] phone:pl-[1.5rem] phone:pr-[2.5rem] phone:py-[2rem] rounded-lg flex justify-center items-center
               " onClick={() => onButtonClick(serie.id)}
                  >
                    <button aria-label="Play Button" className="flex desktop:gap-[1.19rem] bg-white bg-opacity-25 rounded-[1.78125rem] pl-[0.56rem] pr-[1.5rem] tablet:gap-[0.935rem] phone:gap-[0.698rem] w-[117px] h-12">
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
                  media_id={serie.id}
                  isBookmarked={serie.isBookmarked}
                  reloadData={fetchData}
                />

                {currentUser.role === "Admin" ? <div onClick={() => onAdminClick(serie.id)}>
                <SettingsSVG/>
                </div> : null}

                <div
                  className="flex flex-col gap-[0.3125rem] desktop:gap-[0.3125rem] tablet:gap-[0.3125rem] phone:gap-[0.25rem] pt-2 bg-gradient-to-t to-transparent rounded-b-lg
                "
                >
                  <div
                    className="figma-body-s dekstop:text-[0.8125rem] tablet:text-[0.8125rem] flex items-center gap-2 desktop:gap-2 tablet:gap-2 phone:gap-[0.38rem] phone:text-[0.6875rem] phone:h-3.5 tablet:h-4 desktop:h-4
                  "
                  >
                    <span>{serie.year}</span>
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
                      <IconCategoryTV />
                      <span>{serie.category}</span>
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
                    <span>{serie.rating}</span>
                  </div>

                  <div
                    className="figma-heading-xs dekstop:text-[1.125rem] tablet:text-[1.125rem] phone:text-[0.875rem] phone:h-[1.125rem]
                  tablet:h-[1.4375rem] desktop:h-[1.4375rem]"
                  >
                    {serie.title.length > 23 ? `${serie.title.slice(0, 23)}...` : serie.title}
                  </div>
                  <RatingsButton 
                    contentId={serie.id}
                    averageRating={serie.averageRating}
                    totalRatings={serie.totalRatings}
                    userRating={serie.userRating}
                    />
                </div>
              </div>
            ))}
        </div>
        <Pagination/>
      </div>
      <Outlet/>
    </>
  );
};

export default TVSeriesPage;
