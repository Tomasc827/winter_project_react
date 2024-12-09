import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import defaultImage from "../img/favicon-32x32.png";

const DataContext = createContext();

export const DataProviders = ({ children }) => {

  // All of these are exported to signup/login pages
  const [users,setUsers] = useState([])
  const [error,setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState("")
  const [currentUser,setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser")
    return savedUser ? JSON.parse(savedUser) : {}
  })
  const navigate = useNavigate()
  const encodedPassword = (password) => {
    return btoa(password)
     // End of signup/login page
  }
       //Navbar exports
       const [userModal,setUserModal] = useState(false)
       const [avatar,setAvatar] = useState(() => {
        const savedAvatar = localStorage.getItem("avatar")
        return savedAvatar || null
       })
       const [loginModal, setLoginModal] = useState(false)
       //End of Navbar
       //Global exports
       useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      }, [currentUser]);

      useEffect(() => {
        if (avatar) {
          localStorage.setItem("avatar",avatar)
        }
      },[avatar])

      const logout = () => {
        
        console.log("Logging out...");
        console.log("Current User Before Logout:", currentUser);
        setCurrentUser({})
        setAvatar(defaultImage);
        console.log("Clearing localStorage...");
        localStorage.removeItem("currentUser")
        localStorage.removeItem("avatar");
        console.log("LocalStorage After Removal:", localStorage.getItem("currentUser"), localStorage.getItem("avatar"));
        navigate("/login")
        setUserModal(false);
        setLoginModal(false);
      }
        // Movies page
const [movies, setMovies] = useState([])

  return (
    <DataContext.Provider
      value={
        {
          users,setUsers,error, setError, navigate,success,setSuccess,encodedPassword, processing,setProcessing,currentUser,setCurrentUser, avatar, setAvatar, logout,loginModal,setLoginModal, userModal,setUserModal,movies,setMovies
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
