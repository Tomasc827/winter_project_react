import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router";
import defaultImage from "../img/favicon-32x32.png";

const DataContext = createContext();

export const DataProviders = ({ children }) => {
  // All of these are exported to signup/login pages
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  // Exports for messages/animations
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  // Exports that get the current from the local storage if there is one
  const [currentUser, setCurrentUser] = useState(() => {
    const storageUser = localStorage.getItem("currentUser");
    return storageUser ? JSON.parse(storageUser) : {};
  });
  const navigate = useNavigate();
  const encodedPassword = (password) => {
    return btoa(password);
    // End of signup/login page
  };

  //Navbar exports
  const [userModal, setUserModal] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    const storageAvatar = localStorage.getItem("avatar");
    return storageAvatar || null;
  });
  const [loginModal, setLoginModal] = useState(false);
  //End of Navbar
  //Global exports for keeping same user and avatar after refresh, and puts them in local storage, added one for bookmarks as well
  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
  }, [avatar]);

  // Log Out function

  const logout = async ()  => {
    setCurrentUser({});
    setAvatar(defaultImage);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("avatar");
    setUserModal(false);
    setLoginModal(false);
    await Promise.resolve()
    navigate("/")
    setSuccess("Successfully logged out");
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  // Homepage Exports 

  const [content,setContent] = useState([]);
  const [searchContent, setSearchContent] = useState([]);

  const fetchData = async () => {
    await fetch("http://localhost:5000/content")
      .then((response) => response.json())
      .then((data) => {
        const filter = data.filter((media) => {
          return media.category === "Movie" || media.category === "TV Series";
        });
        setContent(filter);
        setSearchContent(filter);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const findShowById = (id) =>{
    return content?.find((single) => single.id.toString() === id.toString())
  }

  // On click of play button in case not logged in
 const location = useLocation()

 const onButtonClick = (showId) => {
  if (!currentUser || !currentUser.id) {
    setLoginModal(true);
    setError("You must be logged in to watch");
    setTimeout(() => {
      setError("");
    }, 3000);
  } else {
    if (location.pathname === '/') {
      navigate(`/description/${showId}`);
    } else {
      navigate(`${location.pathname}/description/${showId}`);
    }
  }
};
  // On click function that checks if there is a current user and allows them to access bookmark page

  const onBookmarkClick = () => {
    if (!currentUser || !currentUser.id) {
      setLoginModal(true);
      setError("You have to log in to view the bookmark page");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // Movies page
  const [movies, setMovies] = useState([]);

  // TV Series page
  const [series, setSeries] = useState([]);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        error,
        setError,
        navigate,
        success,
        setSuccess,
        encodedPassword,
        processing,
        setProcessing,
        currentUser,
        setCurrentUser,
        avatar,
        setAvatar,
        logout,
        loginModal,
        setLoginModal,
        userModal,
        setUserModal,
        movies,
        setMovies,
        onButtonClick,
        onBookmarkClick,
        series,
        setSeries,
        content,
        setContent,
        findShowById,
        fetchData,
        searchContent,
        setSearchContent
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
