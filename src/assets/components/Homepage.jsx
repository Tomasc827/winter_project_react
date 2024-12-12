import { useEffect, useState } from "react";
import Trending from "./Trending";
import BookmarkButton from "./BookmarkButton";
import IconPlay from "./formatted_svg/IconPlay";
import IconCategoryMovie from "./formatted_svg/IconCategoryMovie";
import IconCategoryTV from "./formatted_svg/IconCategoryTV";
 
const Homepage = () => {
  const [items, setItems] = useState([]);
 
  const fetchData = async () => {
    try {
      const response = await fetch("data/data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setItems(data.content);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
 
  const toggleBookmark = (itemId) => {
    setBookmarkedItems((prev) => {
      const updated = new Set(prev);
      if (updated.has(itemId)) {
        updated.delete(itemId);
      } else {
        updated.add(itemId);
      }
      return updated;
    });
  };
 
  const renderCategoryIcon = (category) => {
    if (category === "Movie") {
      return <IconCategoryMovie />;
    } else if (category === "TV Series") {
      return <IconCategoryTV />;
    }
    return null;
  };
 
  const renderBookmarkIcon = (itemId) => {
    const isBookmarked = bookmarkedItems.has(itemId);
    return (
      <button
        onClick={() => toggleBookmark(itemId)}
        className="absolute top-2 right-2 text-figma-white"
      >
        {isBookmarked ? (
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          </svg>
        ) : (
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          </svg>
        )}
      </button>
    );
  };
 
  return (
    <div className="text-figma-white phone:pl-4 tablet:pl-6 desktop:pl-[10.25rem] pb-[3.5rem]">
      <Trending />
      <div className="text-figma-white phone:pr-4 tablet:pr-6 desktop:pr-9">
        <h1
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
          Recommended for you
        </h1>
 
        {items.length > 0 ? (
          <ul
            className="grid grid-cols-2 justify-center
        phone:grid-cols-2 phone:gap-y-[1rem] phone:gap-x-[0.94rem]
        tablet:grid-cols-3 tablet:gap-y-6 tablet:gap-x-[1.81rem]
        desktop:grid-cols-4 desktop:gap-y-8 desktop:gap-x-10"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="relative rounded-lg overflow-hidden
                phone:w-[10.25rem] phone:h-[9.625rem]
                tablet:w-[13.75rem] tablet:h-[12rem]
                desktop:w-[17.5rem] desktop:h-[14.125rem]"
              >
                <div className="relative group">
                  <picture>
                    <source
                      media="(min-width: 1440px)"
                      srcSet={item.thumbnail.regular.large}
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={item.thumbnail.regular.medium}
                    />
                    <img
                      src={item.thumbnail.regular.small}
                      alt={item.title}
                      className="w-full rounded-lg"
                    />
                  </picture>
 
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-200 transition-opacity desktop:pl-[4.81rem] desktop:pr-[5.37rem] desktop:py-[3.94rem]
               tablet:pl-[3rem] tablet:pr-[4rem] tablet:py-[3rem] phone:pl-[1.5rem] phone:pr-[2.5rem] phone:py-[2rem] rounded-lg"
                  >
                    <button className="flex desktop:gap-[1.19rem] bg-white bg-opacity-25 rounded-[1.78125rem] pl-[0.56rem] pr-[1.5rem] tablet:gap-[0.935rem] phone:gap-[0.698rem]">
                      <span className="py-[0.56rem]">
                        <IconPlay />
                      </span>
                      <span className="figma-heading-xs pt-[0.75rem] pb-[0.81rem]">
                        Play
                      </span>
                    </button>
 
                    <BookmarkButton
                      media_id={item.id}
                      isBookmarked={item.isBookmarked}
                      reloadData={fetchData}
                    />
                  </div>
                  {renderBookmarkIcon(item.id)}
                </div>
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
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};
 
export default Homepage;