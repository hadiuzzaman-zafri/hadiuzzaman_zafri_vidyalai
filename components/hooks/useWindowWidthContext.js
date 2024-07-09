import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowWidthContext = createContext();

export const useWindowWidthContext = () => useContext(WindowWidthContext);

// import in the app.js or index.js and wrap the entire app with "WindowWidthProvider"
export const WindowWidthProvider = ({ children }) => { 
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500); // break point for the smaller devices
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};
