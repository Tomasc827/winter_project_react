import {Link} from "react-router";
import IconNavHome from "../svg/icon-nav-home.svg"
import IconNavMovies from "../svg/icon-nav-movies.svg"
import IconNavTVSeries from "../svg/icon-nav-tv-series.svg"
import IconNavBookmark from "../svg/icon-nav-bookmark.svg"
import Logo from "../svg/logo.svg"
import Favicon from "../svg/favicon-32x32.png"
////import ImageAvatar from "../svg/image-avatar.png"


const NavBar = () => {
  return (
    <nav className="navbar btn">
      <img src={Logo} alt="Logo" />
      <Link to="/" className="btn btn-ghost">
      <img src={IconNavHome} alt="Home" />
      </Link>
      <Link to="/movies" className="btn btn-ghost">
      <img src={IconNavMovies} alt="Movies" />
      </Link>
      <Link to="/tvseries" className="btn btn-ghost">
      <img src={IconNavTVSeries} alt="TV Series" />
      </Link>
      <Link to="/bookmarked" className="btn btn-ghost">
      <img src={IconNavBookmark} alt="Bookmarked Shows" />
      </Link>
      <Link to="/login" className="btn btn-ghost">
      <img src={Favicon} alt="favicon-32x32"/>
      </Link>
    </nav>
  );
};

export default NavBar;