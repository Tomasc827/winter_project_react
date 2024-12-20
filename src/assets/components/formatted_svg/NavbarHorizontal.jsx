import { NavLink } from "react-router";
import { useData } from "../DataContext";

const NavbarHorizontal = () => {
  const { currentUser, setAccess, setAccessText } = useData();

  return (
    <>
      <svg
        width="173"
        height="20"
        viewBox="0 0 173 20"
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
              d="M1 0H8C8.6 0 9 0.4 9 1V8C9 8.6 8.6 9 8 9H1C0.4 9 0 8.6 0 8V1C0 0.4 0.4 0 1 0ZM1 11H8C8.6 11 9 11.4 9 12V19C9 19.6 8.6 20 8 20H1C0.4 20 0 19.6 0 19V12C0 11.4 0.4 11 1 11ZM19 0H12C11.4 0 11 0.4 11 1V8C11 8.6 11.4 9 12 9H19C19.6 9 20 8.6 20 8V1C20 0.4 19.6 0 19 0ZM12 11H19C19.6 11 20 11.4 20 12V19C20 19.6 19.6 20 19 20H12C11.4 20 11 19.6 11 19V12C11 11.4 11.4 11 12 11Z"
            />
          </g>
        </NavLink>
        <NavLink
          aria-label="TV Series Page"
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
            <rect x="100" y="0" width="20" height="20" fill="transparent" />
            <path
              className="group-hover:fill-figma-red duration-500"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M113.08 4.48109H124V20H104V4.48109H108.92L106.22 1.20272L107.78 0.029098L111 3.90883L114.22 0L115.78 1.20272L113.08 4.48109ZM106 6.42095V18.0601H116V6.42095H106ZM121 14.1804H119V12.2405H121V14.1804ZM119 10.3007H121V8.36082H119V10.3007Z"
            />
          </g>
        </NavLink>
        <NavLink
          aria-label="Movies Page"
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
              d="M68.9556 0H55.0444C53.363 0 52 1.36304 52 3.04444V16.9556C52 18.637 53.363 20 55.0444 20H68.9556C69.763 20 70.5374 19.6792 71.1083 19.1083C71.6792 18.5374 72 17.763 72 16.9556V3.04444C72 2.23701 71.6792 1.46264 71.1083 0.891697C70.5374 0.320753 69.763 0 68.9556 0ZM56 9H54V7H56V9ZM56 11H54V13H56V11ZM70 9H68V7H70V9ZM70 11H68V13H70V11ZM70 2.74V4H68V2H69.26C69.4563 2 69.6445 2.07796 69.7833 2.21674C69.922 2.35552 70 2.54374 70 2.74ZM56 2H54.74C54.5437 2 54.3555 2.07796 54.2167 2.21674C54.078 2.35552 54 2.54374 54 2.74V4H56V2ZM54 17.26V16H56V18H54.74C54.5437 18 54.3555 17.922 54.2167 17.7833C54.078 17.6445 54 17.4563 54 17.26ZM69.26 18C69.6687 18 70 17.6687 70 17.26V16H68V18H69.26Z"
            />
          </g>
        </NavLink>
        {!currentUser || !currentUser.id || (
          <NavLink
            aria-label="Bookmarks Page"
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
              <rect x="180" y="0" width="20" height="20" fill="transparent" />
              <path
                className="group-hover:fill-figma-red duration-500"
                d="M171.387 0C171.589 0 171.783 0.0396563 171.968 0.118969C172.259 0.233532 172.49 0.414188 172.662 0.660939C172.834 0.907689 172.92 1.18088 172.92 1.4805V18.5195C172.92 18.8191 172.834 19.0923 172.662 19.3391C172.49 19.5858 172.259 19.7665 171.968 19.881C171.801 19.9515 171.607 19.9868 171.387 19.9868C170.964 19.9868 170.598 19.8458 170.289 19.5638L164.46 13.959L158.631 19.5638C158.313 19.8546 157.948 20 157.533 20C157.331 20 157.137 19.9603 156.952 19.881C156.661 19.7665 156.43 19.5858 156.258 19.3391C156.086 19.0923 156 18.8191 156 18.5195V1.4805C156 1.18088 156.086 0.907689 156.258 0.660939C156.43 0.414188 156.661 0.233532 156.952 0.118969C157.137 0.0396563 157.331 0 157.533 0H171.387Z"
              />
            </g>
          </NavLink>
        )}
      </svg>
    </>
  );
};

export default NavbarHorizontal;
