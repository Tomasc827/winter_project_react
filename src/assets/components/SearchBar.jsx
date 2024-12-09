const SearchBar = (props) => {
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    if (lowerCase == "") {
      props.setSearchData(props.data);
    } else {
      const filteredData = props.data.filter((media) => {
        return media.title.toLowerCase().includes(lowerCase);
      });

      props.setSearchData(filteredData);
    }
  };

  return (
    <label className="flex items-center gap-2">
      <img
        src={props.icon}
        alt="Search bar icon"
      />
      <input
        type="text"
        className="grow bg-transparent border-0 focus:shadow-[0_1px_0_0] focus:shadow-figma-greyish-blue focus:ring-0 text-2xl w-full"
        placeholder={props.placeholder}
        onChange={inputHandler}
      />
    </label>
  );
};

export default SearchBar;
