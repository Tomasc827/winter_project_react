import React, { useState } from "react";
import "./SearchBar.css";
import searchIcon from "./searchico.png";

const SearchBar = ({ data, setSearchData }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchValue(query);

    if (!query) {
      setSearchData(data);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.details.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query)
      );
      setSearchData(filteredData);
    }
  };

  return (
    <div className="search-box">
      <div className="search-ico">
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <input
        type="text"
        className="search-txt"
        placeholder="Search for TV series"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
