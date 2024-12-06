import axios from "axios";
const BookmarkButton = (props) => {
  const bookmarkMedia = () => {
    const setBookmark = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:5000/content/${props.media_id}`,
          {
            isBookmarked: !props.isBookmarked,
          }
        );
      } catch (error) {
        throw new Error(error.message);
      }
    };
    setBookmark();
  };
  return (
    <button
      onClick={bookmarkMedia}
      className="btn btn-circle opacity-50 absolute top-1 right-1 text-center desktop:w-16 desktop:h-16 tablet:w-16 tablet:h-16"
    >
      <img
        className="absolute opacity-100 desktop:w-6 desktop:h-6 tablet:w-6 tablet:h-6"
        src={
          props.isBookmarked
            ? "src/assets/svg/icon-bookmark-full.svg"
            : "src/assets/svg/icon-bookmark-empty.svg"
        }
        alt=""
      />
    </button>
  );
};

export default BookmarkButton;
