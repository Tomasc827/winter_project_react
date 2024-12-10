import axios from "axios";

import { useEffect, useState } from "react";

import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";

const BookmarkPage = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const createBookmarkCard = (media) => {
    // MediaCard takes up a lot of space, that's why we have this function
    return (
      <MediaCard
        thumbnail={media.thumbnail.regular.large.slice(3)}
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/content");
      if (response.status == 200) {
        setData(response.data);
        setSearchData(response.data);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-fit p-12">
      <SearchBar
        placeholder="Search for bookmarked shows"
        icon="src/assets/svg/icon-search.svg"
        data={data}
        setSearchData={setSearchData}
      />

      <h1 className="figma-heading-large pt-10">Bookmarked Movies</h1>

      <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 gap-4 pt-10">
        {searchData.map((media, index) => {
          if (media.isBookmarked && media.category == "Movie") {
            return createBookmarkCard(media);
          }
        })}
      </div>

      <h1 className="figma-heading-large pt-10">Bookmarked TV Series</h1>
      <div className="grid desktop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 gap-4 pt-10">
        {searchData.map((media, index) => {
          if (media.isBookmarked && media.category == "TV Series") {
            return createBookmarkCard(media);
          }
        })}
      </div>
    </div>
  );
};

export default BookmarkPage;
