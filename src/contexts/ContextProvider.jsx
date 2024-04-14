import React, { useContext, useState, createContext } from "react";

const StateContext = createContext({
  currentUser: null,
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  logout: () => {}, 
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
  const storedUser = sessionStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => sessionStorage.getItem('userToken') || null);

  const setUserToken = (newToken) => {
    if (newToken) {
      sessionStorage.setItem('userToken', newToken);
      setToken(newToken);
    } else {
      sessionStorage.removeItem('userToken');
      setToken(null);
    }
  };

  const setSessionUser = (userData) => {
    setCurrentUser(userData);
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    setToken(null);
  };

  const contextValue = {
    currentUser,
    setCurrentUser: setSessionUser,
    userToken: token,
    setUserToken,
    logout, 
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useUserState = () => useContext(StateContext);
