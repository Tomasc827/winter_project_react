import BookmarkButton from "./BookmarkButton";
const BookmarkCard = (props) => {
  let categoryIcon = "src/assets/svg/icon-category-tv.svg";

  if (props.category == "Movie") {
    categoryIcon = "src/assets/svg/icon-category-movie.svg";
  }
  return (
    <div>
      <div className="relative group">
        <img
          className="rounded-lg group-hover:blur-sm"
          src={props.thumbnail}
          alt=""
        />
        <img
          className="absolute hidden pointer-events-none group-hover:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%]  "
          src="src/assets/svg/icon-play.svg"
          alt=""
        />
        <BookmarkButton
          media_id={props.media_id}
          isBookmarked={props.isBookmarked}
        />
      </div>
      <div className="mt-2">
        <p className="figma-body-s">
          <span>{props.year} · </span>
          <img className="inline" src={categoryIcon} alt="" />
          <span> {props.category} ·</span>
          <span> {props.rating}</span>
        </p>
        <h1 className="figma-heading-xs">{props.title}</h1>
      </div>
    </div>
  );
};

export default BookmarkCard;
