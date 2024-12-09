////import {Link} from "react-router";
import IconNavHome from "../svg/icon-nav-home.svg";
import IconNavMovies from "../svg/icon-nav-movies.svg";
import IconNavTVSeries from "../svg/icon-nav-tv-series.svg";
import IconNavBookmark from "../svg/icon-nav-bookmark.svg";
import Logo from "../svg/logo.svg";
import Favicon from "../svg/favicon-32x32.png";
////import ImageAvatar from "../svg/image-avatar.png";
///import Homepage from "./assets/components/Homepage.jsx";
////////////////////////////////////////////December6 Below
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="Navbar flex flex-col">
      <span className="NavTopSection btn btn-ghost">
        <img className="LogoIcon" src={Logo} alt="Logo" />
      </span>

      <div className="NavMiddleSection">
        <div>
          <NavLink to="/" className="NavLinkButton btn btn-ghost">
            <img className="HomeIcon" src={IconNavHome} alt="Home" />
          </NavLink>
        </div>

        <div>
          <NavLink to="/movies" className="NavLinkButton btn btn-ghost">
            <img className="MovieIcon" src={IconNavMovies} alt="Movies" />
          </NavLink>
        </div>

        <div>
          <NavLink to="/tvseries" className="NavLinkButton btn btn-ghost">
            <img className="TVSeriesIcon" src={IconNavTVSeries} alt="TV Series" />
          </NavLink>
        </div>

        <div>
          <NavLink to="/bookmarked" className="NavLinkButton btn btn-ghost">
            <img className="BookmarkedShowsIcon" src={IconNavBookmark} alt="Bookmarked Shows" />
          </NavLink>
        </div>
      </div>

      <div className="NavBottomSection">
        <NavLink to="/login" className="NavLinkButton btn btn-ghost">
          <img className="LogInIcon" src={Favicon} alt="favicon-32x32" />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;