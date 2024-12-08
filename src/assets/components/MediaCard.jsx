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
          className="rounded-lg group-hover:blur-sm duration-500 "
          src={props.thumbnail}
          alt="Media thumbnail"
        />

        <div className="absolute hidden pointer-events-none group-hover:block duration-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-14">
          <div className="opacity-25 absolute rounded-full bg-white w-full h-full"></div>
          <div className="flex flex-row h-full justify-between justify-items-center text-center items-center">
            <img
              className="w-[30%] ml-3"
              src="src/assets/svg/icon-play.svg"
              alt="Media play icon"
            />
            <p className="mr-8 text-white font-semibold">Play</p>
          </div>
        </div>

        <BookmarkButton
          media_id={props.media_id}
          isBookmarked={props.isBookmarked}
          reloadData={props.reloadData}
        />
      </div>
      <div className="mt-2">
        <p className="figma-body-s">
          <span>{props.year} · </span>
          <img
            className="inline"
            src={categoryIcon}
            alt="Media category icon"
          />
          <span> {props.category} ·</span>
          <span> {props.rating}</span>
        </p>
        <h1 className="figma-heading-xs">{props.title}</h1>
      </div>
    </div>
  );
};

export default MediaCard;
