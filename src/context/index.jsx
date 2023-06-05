/* eslint-disable react/prop-types */
import  { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Define your state variables here
  const [gateways, setGateways] = useState([]);
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Define any functions or methods you need to manipulate the state

  const contextValue = {
    gateways,
    setGateways,
    devices,
    setDevices,
    searchQuery,
    setSearchQuery,
    // Add any other values or functions you want to make available in the context
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
