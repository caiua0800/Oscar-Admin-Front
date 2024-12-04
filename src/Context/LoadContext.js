import React, { createContext, useState, useContext } from 'react';

const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const stopLoadingDelay = () => {setTimeout(() => {setLoading(false)}, 900)};
  
  return (
    <LoadContext.Provider value={{ loading, startLoading, stopLoading, stopLoadingDelay }}>
      {children}
    </LoadContext.Provider>
  );
};

export const useLoad = () => {
  return useContext(LoadContext);
};