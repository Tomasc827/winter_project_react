import {Link} from "react-router";
import IconNavHome from "../svg/icon-nav-home.svg";
import IconNavMovies from "../svg/icon-nav-movies.svg";
import IconNavTVSeries from "../svg/icon-nav-tv-series.svg";
import IconNavBookmark from "../svg/icon-nav-bookmark.svg";
import Logo from "../svg/logo.svg";
import Favicon from "../svg/favicon-32x32.png";
////import ImageAvatar from "../svg/image-avatar.png";
///import Homepage from "./assets/components/Homepage.jsx";


const NavBar = () => {
  return (
    <nav className="navbar btn">
      <div><img src={Logo} alt="Logo" /></div>
      <div>
        <Link to="/" className="nav-link btn btn-ghost">
          <img src={IconNavHome} alt="Home" />
        </Link>
      </div>
      <div>
        <Link to="/movies" className="nav-link btn btn-ghost">
          <img src={IconNavMovies} alt="Movies" />
        </Link>
      </div>
      <div>
        <Link to="/tvseries" className="nav-link btn btn-ghost">
          <img src={IconNavTVSeries} alt="TV Series" />
        </Link>
      </div>
      <div>
        <Link to="/bookmarked" className="nav-link btn btn-ghost">
          <img src={IconNavBookmark} alt="Bookmarked Shows" />
        </Link>
      </div>
      <div>
        <Link to="/login" className="nav-link btn btn-ghost">
          <img src={Favicon} alt="favicon-32x32" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;