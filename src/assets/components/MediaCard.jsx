import BookmarkButton from "./BookmarkButton";
import "./MediaCard.css";
const MediaCard = (props) => {
  let categoryIcon = "src/assets/svg/icon-category-tv.svg";

  if (props.category == "Movie") {
    categoryIcon = "src/assets/svg/icon-category-movie.svg";
  }
  return (
    <div>
      <div className="relative group ">
        <img
          className="rounded-lg"
          src={props.thumbnail}
          alt="Media thumbnail"
        />

        <div className="absolute rounded-lg bg-black left-0 top-0 w-full h-full opacity-0 group-hover:opacity-50 duration-500"></div>

        <button className="absolute hidden group-hover:block duration-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-14">
          <div className="opacity-25 absolute rounded-full bg-white w-full h-full"></div>
          <div className="flex flex-row h-full justify-between justify-items-center text-center items-center">
            <img
              className="w-[30%] ml-3"
              src="src/assets/svg/icon-play.svg"
              alt="Media play icon"
            />
            <p className="mr-8 text-white font-semibold">Play</p>
          </div>
        </button>

        <BookmarkButton
          media_id={props.media_id}
          isBookmarked={props.isBookmarked}
          reloadData={props.reloadData}
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-2 figma-body-s">
          <span className="opacity-75">{props.year}</span>
          <span className="opacity-75">·</span>
          <img
            className="inline opacity-75"
            src={categoryIcon}
            alt="Media category icon"
          />
          <span className="opacity-75"> {props.category}</span>
          <span className="opacity-75">·</span>
          <span className="opacity-75"> {props.rating}</span>
        </div>
        <h1 className="figma-heading-xs pt-1">{props.title}</h1>
      </div>
    </div>
  );
};

export default MediaCard;
