import React, { createContext, useState, useEffect } from 'react';
import { CITIES } from '../data';
import { fetchAuthStateChanged } from '../firebase-api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAuthState, setHasAuthState] = useState(false);
  const [city, setCity] = useState(CITIES[0]);

  useEffect(() => {
    fetchAuthStateChanged((user) => {
      setHasAuthState(true);
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        city,
        setCity,
        hasAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
