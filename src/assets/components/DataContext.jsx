import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const DataContext = createContext();

export const DataProviders = ({ children }) => {

  // All of these are exported to signup/login pages
  const [users,setUsers] = useState([])
  const [error,setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState("")
  const [currentUser,setCurrentUser] = useState({})
  const navigate = useNavigate()
  const encodedPassword = (password) => {
    return btoa(password)
  }
  // End of signup/login page

  // Movies page
const [movies, setMovies] = useState([])

  return (
    <DataContext.Provider
      value={
        {
          /*this is where you put what you want to export */

          users,setUsers,error, setError, navigate,success,setSuccess,encodedPassword, processing,setProcessing,currentUser,setCurrentUser, movies, setMovies
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
