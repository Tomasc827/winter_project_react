import BookmarkButton from "./BookmarkButton";
const BookmarkCard = (props) => {
  let categoryIcon = "src/assets/svg/icon-category-tv.svg";

  if (props.category == "Movie") {
    categoryIcon = "src/assets/svg/icon-category-movie.svg";
  }
  return (
    <div>
      <div className="relative">
        <img className="rounded-lg" src={props.thumbnail} alt="" />
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
