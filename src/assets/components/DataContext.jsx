import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import defaultImage from "../img/favicon-32x32.png";
import axios from "axios";

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
  //Delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  //Navbar exports
  const [userModal, setUserModal] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    const storageAvatar = localStorage.getItem("avatar");
    return storageAvatar || null;
  });
  const [loginModal, setLoginModal] = useState(false);
  const [access, setAccess] = useState(false);
  const [accessText, setAccessText] = useState(false); // On hover for navbar messages
  const [adminAdd, setAdminAdd] = useState(false); // admin add new content modal useState
  //End of Navbar
  // Ratings exports and functions go here, if it does not work well with the rest of the project, scrap it

  const [ratings, setRatings] = useState([]);
  
  // ratings causing issues with search, once you search and then rate something it refetches, so attaching a new use state to keep track of what was last searched and only update the rating itself, not refetching the data.

  

  const submitRating = async (contentId, rating) => {
    try {
      const existingRating = ratings.find(
        (r) => r.userId === currentUser.id && r.contentId === contentId
      );

      const ratingData = {
        userId: currentUser.id,
        contentId: contentId,
        rating: rating,
        timestamp: new Date().toISOString(),
      };
      if (existingRating) {
        await axios.put(
          `http://localhost:5000/ratings/${existingRating.id}`,
          ratingData
        );
      } else {
        await axios.post("http://localhost:5000/ratings", ratingData);
      }

      const { data: newRatings } = await axios.get("http://localhost:5000/ratings");
      setRatings(newRatings);

      const updateContentWithNewRating = (contentArr) => {
        return contentArr.map(item => {
          if (item.id === contentId) {
            const contentRatings = newRatings.filter(r => r.contentId === contentId);
            const averageRating = contentRatings.length > 0
              ? contentRatings.reduce((acc, curr) => acc + curr.rating, 0) / contentRatings.length
              : 0;
            
            return {
              ...item,
              averageRating,
              totalRatings: contentRatings.length,
              userRating: contentRatings.find(r => r.userId === currentUser?.id)?.rating || null
            };
          }
          return item;
        });
      };
  
      setContent(prevContent => updateContentWithNewRating(prevContent));
      setSearchContent(prevSearchContent => updateContentWithNewRating(prevSearchContent));

      setSuccess("Rating submitted successfully");
      setTimeout(() => setSuccess(""), 1500);
    } catch (error) {
      setError("Failed to submit rating");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Fetch ratings functions goes below, if I have time I will move these all to helpers, but for now it's easier to see them all in one place as it involves quite a few calls to api

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/ratings");
      setRatings(data);
    } catch (error) {
      setError("Failed to get ratings");
      setTimeout(() => setError(""), 3000);
    }
  };

  //Global exports for keeping same user and avatar after refresh, and puts them in local storage
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

// truly not sure if I even need to store the avatar into localStorage given I allow only internet links ¯\_(ツ)_/¯

  useEffect(() => {
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
  }, [avatar]);

  // Log Out function

  const logout = async () => {
    setCurrentUser({});
    setAvatar(defaultImage);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("avatar");
    setUserModal(false);
    setLoginModal(false);
    await Promise.resolve();
    navigate("/");
    setSuccess("Successfully logged out");
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };
 

  const [content, setContent] = useState([]);
  const [searchContent, setSearchContent] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true); // a useState to refetch data on refresh on homepage, the plague that is known as pagination is now breaking everything hence the influx of more useStates. Rather it's a combination of both pagination and searchbar being natural enemies and breaking everything.

 // Centralized fetchData works across all pages using useLocation to filter content. Now includes ratings.

  const fetchData = async () => {
    try {
      const [contentResponse, ratingsResponse] = await Promise.all([
        axios.get("http://localhost:5000/content"),
        axios.get("http://localhost:5000/ratings"),
      ]);

      const contentData = contentResponse.data;
      const ratingsData = ratingsResponse.data;

      // This should calculate an averate of all ratings, emphasis on should, as well as add totalRatings and userRatings to the existing content aka data.json .

      const contentWithRatings = contentData.map((content) => {
        const contentRatings = ratingsData.filter(
          (r) => r.contentId === content.id
        );
        const averageRating =
          contentRatings.length > 0
            ? contentRatings.reduce((acc, curr) => acc + curr.rating, 0) /
              contentRatings.length
            : 0;
        return {
          ...content,
          averageRating,
          totalRatings: contentRatings.length,
          userRating:
            contentRatings.find((r) => r.userId === currentUser?.id)?.rating ||
            null,
        };
      }).sort((a,b) => {
        if (b.averageRating === a.averageRating) {
          return b.totalRatings - a.totalRatings;
        } else {
          return b.averageRating - a.averageRating
        }
        
      });

      const currentPath = location.pathname;
      const basePath = currentPath.split("/description")[0].split("/admin")[0];

      let filteredData;
      if (basePath === "/" || basePath === "") {
        filteredData = contentWithRatings.filter(
          (media) =>
            media.category === "Movie" || media.category === "TV Series"
        );
      } else if (basePath === "/movies") {
        filteredData = contentWithRatings.filter(
          (media) => media.category === "Movie"
        );
      } else if (basePath === "/tvseries") {
        filteredData = contentWithRatings.filter(
          (media) => media.category === "TV Series"
        );
      } else if (basePath === "/bookmarked") {
        filteredData = contentWithRatings.filter((media) => media.isBookmarked);
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

  // this use effect is there to fetch data on page refresh, because homepage doesn't like to do it by itself. Is now updated to also include fetchratings, Promise is there to wait for both of those to resolve, though more or less they work just fine even without it, but good practice and all that.

  useEffect(() => {
    if (initialLoad) {
      Promise.all([fetchData(), fetchRatings()]);
      setInitialLoad(false);
    }
  }, []);

  // oh boy... pagination time, exports go here
  const [currentPage, setCurrentPage] = useState(1);
  const [movieCurrentPage, setMovieCurrentPage] = useState(1); //separate tracker for bookmarked movies and below is for bookmarked tv series
  const [tvSeriesCurrentPage, setTvSeriesCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // Description card behaviour to find each individual show by id and reload in case a show is not found to not get a nasty empty screen
  const findShowById = (id) => {
    if (!content) return null;
    const show = content?.find(
      (single) => single.id.toString() === id.toString()
    );
    if (!show) {
      fetchData();
    }
    return show;
  };

  // new fetch data mechanism, now fetches data based on routes
  const [previousMainPath, setPreviousMainPath] = useState("");
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "/";
    const currentDescription =
      location.pathname.includes("description") ||
      location.pathname.includes("admin");
    const previousDescription =
      previousMainPath.includes("description") ||
      previousMainPath.includes("admin");
    if (
      currentPath !== previousMainPath &&
      !currentDescription &&
      !previousDescription
    ) {
      setCurrentPage(1);
      setSearchContent(content);
      fetchData();
    }
    setPreviousMainPath(currentPath);
  }, [location.pathname]);

  // Change onButtonClick now opens description, separate function to check for login state is now on "Watch Now" buttons called onLoginCheck

  const onButtonClick = (showId) => {
    if (location.pathname === "/") {
      navigate(`/description/${showId}`);
    } else {
      navigate(`${location.pathname}/description/${showId}`);
    }

    // Separate onClick for admin, this one links to the update page
  };
  const onAdminClick = (showId) => {
    if (location.pathname === "/") {
      navigate(`/admin/${showId}`);
    } else {
      navigate(`${location.pathname}/admin/${showId}`);
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
        tvSeriesCurrentPage,
        setTvSeriesCurrentPage,
        movieCurrentPage,
        setMovieCurrentPage,
        onAdminClick,
        adminAdd,
        setAdminAdd,
        deleteModal,
        setDeleteModal,
        ratings,
        submitRating,
        fetchRatings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
