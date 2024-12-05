import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const DataContext = createContext();

export const DataProviders = ({ children }) => {
  const [users,setUsers] = useState([])
  const [error,setError] = useState("")
  const navigate = useNavigate()

  return (
    <DataContext.Provider
      value={
        {
          users,setUsers,error, setError, navigate
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
