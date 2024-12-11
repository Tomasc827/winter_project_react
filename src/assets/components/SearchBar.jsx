const SearchBar = (props) => {
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    if (lowerCase == "") {
      document.querySelector("#resultmessage").innerText = "";
      props.setSearchData(props.data);
    } else {
      const filteredData = props.data.filter((media) => {
        return (
          media.title.toLowerCase().includes(lowerCase) ||
          String(media.year).toLowerCase().includes(lowerCase) ||
          media.category.toLowerCase().includes(lowerCase) ||
          media.rating.toLowerCase().includes(lowerCase)
        );
      });

      let resultword = "results";

      if (filteredData.length == 1) {
        resultword = "result";
      }

      console.log(filteredData);

      document.querySelector("#resultmessage").innerText =
        "Found " +
        String(filteredData.length) +
        " " +
        resultword +
        " for ‘" +
        e.target.value +
        "’";
      props.setSearchData(filteredData);
    }
  };

  const autoClear = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    if (lowerCase == "") {
      document.querySelector("#resultmessage").innerText = "";
      props.setSearchData(props.data);
    }
  };

  return (
    <>
      <label
        className="flex items-center
    phone:pb-[1.5rem] phone:pt-[5rem] phone:gap-4
    tablet:pb-8 tablet:pt-32 tablet:gap-6
    desktop:pb-8 desktop:pt-16 desktop:gap-6
    "
      >
        <img src={props.icon} alt="Search bar icon" />
        <input
          type="text"
          className="figma-heading-m p-0 bg-transparent border-0 focus:shadow-[0_1px_0_0] focus:shadow-figma-greyish-blue focus:ring-0 focus:border-figma-greyish-blue
            phone:text-base phone:h-5
            tablet:h-[1.875rem]
            tablet:text-2xl
            desktop:h-[1.875rem]
            desktop:text-2xl
            caret-figma-red
            desktop:w-[30.25rem]
            tablet:w-[20rem]
            phone:w-[15rem]"
          placeholder={props.placeholder}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              inputHandler(ev);
            }
          }}
          onChange={autoClear}
          maxLength={25}
        />
      </label>
      <h1 id="resultmessage" className="figma-heading-l"></h1>
    </>
  );
};

export default SearchBar;
