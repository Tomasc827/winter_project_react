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

  const autoClear = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    if (lowerCase == "") {
      props.setSearchData(props.data);
    }
  };

  return (
    <label
      className="flex items-center
    phone:pb-[1.5rem] phone:pt-[5rem] phone:gap-4
    tablet:pb-[2.06rem] tablet:pt-32 tablet:gap-6
    desktop:pb-[2.12rem] desktop:pt-16 desktop:gap-6
    "
    >
      <img
        src={props.icon}
        alt="Search bar icon"
        className="phone:w-[1.5rem] tablet:w-[2rem] desktop:w-[2rem]"
      />
      <input
        type="text"
        className="figma-heading-m p-0 bg-transparent border-0 focus:shadow-[0_1px_0_0] focus:shadow-figma-greyish-blue focus:ring-0 focus:border-figma-greyish-blue
            phone:text-[1rem]
            desktop:text[1.5rem]
            tablet:text-[1.5rem]
            phone:h-5
            tablet:h-[1.875rem]
            desktop:h-[1.875rem]
            caret-figma-red
            desktop:w-[30.25rem]
            tablet:w-[20rem]
            phone:w-[15rem]
            "
        placeholder={props.placeholder}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            inputHandler(ev);
          }
        }}
        onChange={autoClear}
      />
    </label>
  );
};

export default SearchBar;
