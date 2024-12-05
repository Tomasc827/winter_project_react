import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProviders = ({ children }) => {
  //use state, variables, other functions are typed here to be turned into props
  return (
    <DataContext.Provider
      value={
        {
          /*this is where you put what you want to export */
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext); // to get the props you want imported, while you are in a component do
// "const {whatever,props,you,need,go,here} = useData()"
