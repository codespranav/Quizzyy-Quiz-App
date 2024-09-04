import React, { useEffect, useState, createContext } from 'react';

export const UserContextProvider = createContext();

const UserContext = ({ children }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await localStorage.getItem('username');
      if (storedUsername) {
        setUserName(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  return (
    <UserContextProvider.Provider value={{ userName, setUserName }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
