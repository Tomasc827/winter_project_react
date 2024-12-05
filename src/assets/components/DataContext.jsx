import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const DataContext = createContext();

export const DataProviders = ({ children }) => {
  //use state, variables, other functions are typed here to be turned into props
const [movies, setMovies] = useState([])
  const [users,setUsers] = useState([])
  const [error,setError] = useState("")
  const navigate = useNavigate()

  return (
    <DataContext.Provider
      value={
        {
          /*this is where you put what you want to export */
          movies, setMovies,
          users,setUsers,error, setError, navigate
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
