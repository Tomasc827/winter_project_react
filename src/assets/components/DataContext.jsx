import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router";
import defaultImage from "../img/favicon-32x32.png";

const DataContext = createContext();

export const DataProviders = ({ children}) => {
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
  const [access, setAccess] = useState(false);
  const [accessText,setAccessText] = useState(false)
  //End of Navbar
  //Global exports for keeping same user and avatar after refresh, and puts them in local storage, added one for bookmarks as well
  const location = useLocation()

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

  // Centralized fetchData works across all pages

  const [content,setContent] = useState([]);
  const [searchContent, setSearchContent] = useState([]);
  const [initialLoad,setInitialLoad] = useState(true) // a useState to refetch data on refresh on homepage, the plague that is known as pagination is now breaking everything hence the influx of more useStates. Rather it's a combination of both pagination and searchbar being natural enemies and breaking everything.
 
  const fetchData = async () => {
    try { 
      const response = await fetch("http://localhost:5000/content");
      const data = await response.json();
      
      const currentPath = location.pathname;
      const basePath = currentPath.split('/description')[0];
    
      let filteredData;
      if (basePath === "/" || basePath === "") {
        filteredData = data.filter(media => 
          media.category === "Movie" || media.category === "TV Series"
        );
      }
      else if (basePath === "/movies") {
        filteredData = data.filter(media => media.category === "Movie");
      }
      else if (basePath === "/tvseries") {
        filteredData = data.filter(media => media.category === "TV Series");
      }
      else if (basePath === "/bookmarked") {
        filteredData = data.filter(media => media.isBookmarked);
      }
  
      setContent(filteredData);
      setSearchContent(filteredData);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  useEffect(() => {
    if (initialLoad) {
      fetchData()
      setInitialLoad(false)
    }
  },[])
  
    // oh boy... pagination time, exports go here
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 10;
  // Description card behaviour
  const findShowById = (id) => {
    const show = content?.find((single) => single.id.toString() === id.toString());
    if (!show) {
      fetchData();
    }
    return show;
  };
  const [previousMainPath,setPreviousMainPath] = useState("")
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "/"
    const currentDescription = location.pathname.includes("description")
    const previousDescription = previousMainPath.includes ("description")
    if(currentPath !== previousMainPath && !currentDescription && !previousDescription) {
    setCurrentPage(1)
    setSearchContent(content)
    fetchData()
}
setPreviousMainPath(currentPath)
  }, [location.pathname]);

  // Change onButtonClick now opens description, separate function to check for login state is now on "Watch Now" buttons called onLoginCheck
 

 const onButtonClick = (showId) => {
    if (location.pathname === '/') {
      navigate(`/description/${showId}`);
    } else {
      navigate(`${location.pathname}/description/${showId}`);
    }
  
};


const onLoginCheck = () => {
  if (!currentUser || !currentUser.id) {
    setLoginModal(true);
    setError("You must be logged in to watch");
    setTimeout(() => {
      setError("");
    }, 3000);
  } 
}
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
        onButtonClick,
        onBookmarkClick,
        content,
        setContent,
        findShowById,
        fetchData,
        searchContent,
        setSearchContent,
        location,
        access,
        setAccess,
        accessText,
        setAccessText,
        onLoginCheck, 
        currentPage,
        setCurrentPage,
        itemsPerPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
