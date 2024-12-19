import { NavLink } from "react-router";
import { useData } from "../DataContext";

const NavbarMobile = () => {
  const { currentUser, setAccess, setAccessText } = useData();

  return (
    <>
      <svg
        width="134"
        height="16"
        viewBox="0 0 134 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <NavLink
          aria-label="Homepage"
          to="/"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
          <g
            className="group"
            onMouseEnter={() => {
              setAccess(true);
              setAccessText("Homepage");
            }}
            onMouseLeave={() => setAccess(false)}
          >
            <rect x="0" y="0" width="20" height="20" fill="transparent" />
            <path
              className="group-hover:fill-figma-red duration-500"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.8 0H6.4C6.88 0 7.2 0.32 7.2 0.8V6.4C7.2 6.88 6.88 7.2 6.4 7.2H0.8C0.32 7.2 0 6.88 0 6.4V0.8C0 0.32 0.32 0 0.8 0ZM0.8 8.8H6.4C6.88 8.8 7.2 9.12 7.2 9.6V15.2C7.2 15.68 6.88 16 6.4 16H0.8C0.32 16 0 15.68 0 15.2V9.6C0 9.12 0.32 8.8 0.8 8.8ZM15.2 0H9.6C9.12 0 8.8 0.32 8.8 0.8V6.4C8.8 6.88 9.12 7.2 9.6 7.2H15.2C15.68 7.2 16 6.88 16 6.4V0.8C16 0.32 15.68 0 15.2 0ZM9.6 8.8H15.2C15.68 8.8 16 9.12 16 9.6V15.2C16 15.68 15.68 16 15.2 16H9.6C9.12 16 8.8 15.68 8.8 15.2V9.6C8.8 9.12 9.12 8.8 9.6 8.8Z"
            />
          </g>
        </NavLink>
        <NavLink
          aria-label="Tv series page"
          to="/tvseries"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
          <g
            className="group"
            onMouseEnter={() => {
              setAccess(true);
              setAccessText("Series");
            }}
            onMouseLeave={() => setAccess(false)}
          >
            <rect x="77" y="0" width="20" height="20" fill="transparent" />
            <path
              className="group-hover:fill-figma-red duration-500"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M87.264 3.58487H96V16H80V3.58487H83.936L81.776 0.962173L83.024 0.0232784L85.6 3.12706L88.176 0L89.424 0.962173L87.264 3.58487ZM81.6 14.4481H89.6V5.13676H81.6V14.4481ZM93.6 11.3443H92V9.79243H93.6V11.3443ZM92 8.24054H93.6V6.68865H92V8.24054Z"
            />
          </g>
        </NavLink>
        <NavLink
          aria-label="Movies page"
          to="/movies"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
          <g
            className="group"
            onMouseEnter={() => {
              setAccess(true);
              setAccessText("Movies");
            }}
            onMouseLeave={() => setAccess(false)}
          >
            <rect x="0" y="60" width="20" height="20" fill="transparent" />
            <path
              className="group-hover:fill-figma-red duration-500"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M53.5644 0H42.4356C41.0904 0 40 1.09044 40 2.43556V13.5644C40 14.9096 41.0904 16 42.4356 16H53.5644C54.2104 16 54.8299 15.7434 55.2866 15.2866C55.7434 14.8299 56 14.2104 56 13.5644V2.43556C56 1.78961 55.7434 1.17011 55.2866 0.713358C54.8299 0.256602 54.2104 0 53.5644 0ZM43.2 7.2H41.6V5.6H43.2V7.2ZM43.2 8.8H41.6V10.4H43.2V8.8ZM54.4 7.2H52.8V5.6H54.4V7.2ZM54.4 8.8H52.8V10.4H54.4V8.8ZM54.4 2.192V3.2H52.8V1.6H53.808C53.965 1.6 54.1156 1.66237 54.2266 1.77339C54.3376 1.88441 54.4 2.03499 54.4 2.192ZM43.2 1.6H42.192C42.035 1.6 41.8844 1.66237 41.7734 1.77339C41.6624 1.88441 41.6 2.03499 41.6 2.192V3.2H43.2V1.6ZM41.6 13.808V12.8H43.2V14.4H42.192C42.035 14.4 41.8844 14.3376 41.7734 14.2266C41.6624 14.1156 41.6 13.965 41.6 13.808ZM52.8 14.4H53.808C54.135 14.4 54.4 14.135 54.4 13.808V12.8H52.8V14.4Z"
            />
          </g>
        </NavLink>
        {!currentUser || !currentUser.id || (
          <NavLink
            aria-label="Bookmarks page"
            to="/bookmarked"
            style={({ isActive, isPending }) => ({
              fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
            })}
          >
            <g
              className="group"
              onMouseEnter={() => {
                setAccess(true);
                setAccessText("Bookmarks");
              }}
              onMouseLeave={() => setAccess(false)}
            >
              <rect x="0" y="180" width="20" height="20" fill="transparent" />
              <path
                className="group-hover:fill-figma-red duration-500"
                d="M132.309 0C132.471 0 132.627 0.031725 132.775 0.0951751C133.007 0.186825 133.192 0.331351 133.33 0.528751C133.467 0.726151 133.536 0.944701 133.536 1.1844V14.8156C133.536 15.0553 133.467 15.2738 133.33 15.4712C133.192 15.6686 133.007 15.8132 132.775 15.9048C132.641 15.9612 132.486 15.9894 132.309 15.9894C131.971 15.9894 131.678 15.8766 131.432 15.651L126.768 11.1672L122.104 15.651C121.851 15.8837 121.558 16 121.227 16C121.065 16 120.909 15.9683 120.761 15.9048C120.529 15.8132 120.344 15.6686 120.206 15.4712C120.069 15.2738 120 15.0553 120 14.8156V1.1844C120 0.944701 120.069 0.726151 120.206 0.528751C120.344 0.331351 120.529 0.186825 120.761 0.0951751C120.909 0.031725 121.065 0 121.227 0H132.309Z"
              />
            </g>
          </NavLink>
        )}
      </svg>
    </>
  );
};

export default NavbarMobile;
