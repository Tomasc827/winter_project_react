const SearchBar = (props) => {
  const defaultView = document.querySelector("#defaultview");
  const searchView = document.querySelector("#searchview");
  const resultMessage = document.querySelector("#resultmessage");


  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    const isNumber = (str) => {
      return /^[0-9]+$/.test(str);
    };

    if (!isNumber(lowerCase)) {
      if (lowerCase.length < 3) {
        return;
      }
    }

    let filteredData = props.data.filter((media) => {
      return media.title.toLowerCase().includes(lowerCase);
    });

    if (lowerCase.slice(0, 5) == "year:") {
      filteredData = props.data.filter((media) => {
        const result = lowerCase.slice(5, lowerCase.length);
        if (result == "") return;
        return String(media.year).toLowerCase().includes(result);
      });
    } else if (lowerCase.slice(0, 9) == "category:") {
      filteredData = props.data.filter((media) => {
        const result = lowerCase.slice(9, lowerCase.length);
        if (result == "") return;
        return media.category.toLowerCase().includes(result);
      });
    } else if (lowerCase.slice(0, 7) == "rating:") {
      filteredData = props.data.filter((media) => {
        const result = lowerCase.slice(7, lowerCase.length);
        if (result == "") return;
        return media.rating.toLowerCase().includes(result);
      });
    }

    if (searchView != null && defaultView != null && props.switchViews) {
      defaultView.style.display = "none";
      searchView.style.display = "block";
    } else if (props.switchViews == false) {
      if (props.hideList != null) {
        props.hideList.map((element) => {
          document.getElementById(element).style.display = "none";
        });
      }
      if (props.unhideList != null) {
        props.unhideList.map((element) => {
          document.getElementById(element).style.display = "block";
        });
      }
    }

    let resultword = "results";

    if (filteredData.length == 1) {
      resultword = "result";
    }

    console.log(filteredData);

    resultMessage.innerText =
      "Found " +
      String(filteredData.length) +
      " " +
      resultword +
      " for ‘" +
      e.target.value +
      "’";
    props.setSearchData(filteredData);
  };

  const autoClear = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    if (lowerCase == "") {
      resultMessage.innerText = "";
      props.setSearchData(props.data);

      if (searchView != null && defaultView != null && props.switchViews) {
        searchView.style.display = "none";
        defaultView.style.display = "block";
      } else if (props.switchViews == false) {
        if (props.hideList != null) {
          props.hideList.map((element) => {
            document.getElementById(element).style.display = "block";
          });
        }
        if (props.unhideList != null) {
          props.unhideList.map((element) => {
            document.getElementById(element).style.display = "none";
          });
        }
      }
    }
  };

  return (
    <section>
      <label
        className="flex items-center
    phone:pb-[1.5rem] phone:pt-[5rem] phone:gap-4
    tablet:pb-[2.06rem] tablet:pt-32 tablet:gap-6
    desktop:pb-[2.12rem] desktop:pt-16 desktop:gap-6
    "
      >
        <figure>
          <img
            src={`/${props.icon?.replace(/^\/+/, "")}`}
            alt="Search bar icon"
            className="phone:w-[1.5rem] tablet:w-[2rem] desktop:w-[2rem]"
          />
        </figure>
        <input
          aria-label="Search bar"
          aria-description="Type here to search through shows"
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
      <h2 id="resultmessage" className="figma-heading-l"></h2>
    </section>
  );
};

export default SearchBar;
