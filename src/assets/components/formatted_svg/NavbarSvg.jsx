import { NavLink } from "react-router";

const NavbarSvg = () => {
  return (
    <>
      <svg
        width="20"
        height="200"
        viewBox="0 0 20 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="desktop:ms-[2.38rem] desktop:me-[2.37rem]"
      >
        <NavLink
          to="/"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
          <rect x="0" y="0" width="20" height="20" fill="transparent" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 0H8C8.6 0 9 0.4 9 1V8C9 8.6 8.6 9 8 9H1C0.4 9 0 8.6 0 8V1C0 0.4 0.4 0 1 0ZM1 11H8C8.6 11 9 11.4 9 12V19C9 19.6 8.6 20 8 20H1C0.4 20 0 19.6 0 19V12C0 11.4 0.4 11 1 11ZM19 0H12C11.4 0 11 0.4 11 1V8C11 8.6 11.4 9 12 9H19C19.6 9 20 8.6 20 8V1C20 0.4 19.6 0 19 0ZM12 11H19C19.6 11 20 11.4 20 12V19C20 19.6 19.6 20 19 20H12C11.4 20 11 19.6 11 19V12C11 11.4 11.4 11 12 11Z"
          />
        </NavLink>
        <NavLink
          to="/tvseries"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
           <rect x="0" y="124.481" width="20" height="16" fill="transparent" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.08 124.481H20V140H0V124.481H4.92L2.22 121.203L3.78 120.029L7 123.909L10.22 120L11.78 121.203L9.08 124.481ZM2 126.421V138.06H12V126.421H2ZM17 134.18H15V132.241H17V134.18ZM15 130.301H17V128.361H15V130.301Z"
          />
        </NavLink>
        <NavLink
          to="/movies"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
          <rect x="0" y="60" width="20" height="20" fill="transparent" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.9556 60H3.04444C1.36304 60 0 61.363 0 63.0444V76.9556C0 78.637 1.36304 80 3.04444 80H16.9556C17.763 80 18.5374 79.6792 19.1083 79.1083C19.6792 78.5374 20 77.763 20 76.9556V63.0444C20 62.237 19.6792 61.4626 19.1083 60.8917C18.5374 60.3208 17.763 60 16.9556 60ZM4 69H2V67H4V69ZM4 71H2V73H4V71ZM18 69H16V67H18V69ZM18 71H16V73H18V71ZM18 62.74V64H16V62H17.26C17.4563 62 17.6445 62.078 17.7833 62.2167C17.922 62.3555 18 62.5437 18 62.74ZM4 62H2.74C2.54374 62 2.35552 62.078 2.21674 62.2167C2.07796 62.3555 2 62.5437 2 62.74V64H4V62ZM2 77.26V76H4V78H2.74C2.54374 78 2.35552 77.922 2.21674 77.7833C2.07796 77.6445 2 77.4563 2 77.26ZM17.26 78C17.6687 78 18 77.6687 18 77.26V76H16V78H17.26Z"
          />
        </NavLink>
        <NavLink
          to="/bookmarked"
          style={({ isActive, isPending }) => ({
            fill: isPending ? "#5A698F" : isActive ? "white" : "#5A698F",
          })}
        >
           <rect x="0" y="180" width="20" height="20" fill="transparent" />
          <path
            d="M17.3866 180C17.5893 180 17.7832 180.04 17.9683 180.119C18.2591 180.234 18.4904 180.414 18.6623 180.661C18.8341 180.908 18.92 181.181 18.92 181.481V198.519C18.92 198.819 18.8341 199.092 18.6623 199.339C18.4904 199.586 18.2591 199.766 17.9683 199.881C17.8008 199.952 17.607 199.987 17.3866 199.987C16.9636 199.987 16.5979 199.846 16.2895 199.564L10.46 193.959L4.63054 199.564C4.31328 199.855 3.94757 200 3.53338 200C3.33069 200 3.13681 199.96 2.95175 199.881C2.66094 199.766 2.42961 199.586 2.25777 199.339C2.08592 199.092 2 198.819 2 198.519V181.481C2 181.181 2.08592 180.908 2.25777 180.661C2.42961 180.414 2.66094 180.234 2.95175 180.119C3.13681 180.04 3.33069 180 3.53338 180H17.3866Z"
          />
        </NavLink>
      </svg>
    </>
  );
};

export default NavbarSvg;