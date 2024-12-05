import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const DataContext = createContext();

export const DataProviders = ({ children }) => {
  // All of these are exported to signup/login pages
  const [users,setUsers] = useState([])
  const [error,setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const encodedPassword = (password) => {
    return btoa(password)
  }
  // End of signup/login page

  return (
    <DataContext.Provider
      value={
        {
          users,setUsers,error, setError, navigate,success,setSuccess,encodedPassword, processing,setProcessing
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
