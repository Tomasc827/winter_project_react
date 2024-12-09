import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
       const [avatar,setAvatar] = useState(() => {
        const savedAvatar = localStorage.getItem("avatar")
        return savedAvatar || null
       })
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
        setCurrentUser({})
        setAvatar({});
        localStorage.removeItem("currentUser")
        localStorage.removeItem("avatar")
        navigate("/")
      }
        // Movies page
const [movies, setMovies] = useState([])

  return (
    <DataContext.Provider
      value={
        {
          users,setUsers,error, setError, navigate,success,setSuccess,encodedPassword, processing,setProcessing,currentUser,setCurrentUser, avatar, setAvatar, logout,movies,setMovies
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
