/* eslint-disable react/prop-types */
import  { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const contextValue = {
    error,
    setError,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
