import React, { createContext, useState, useEffect } from 'react';
import { CITIES } from '../data';
import { fetchAuthStateChanged, fetchCurrentUser } from '../firebase-api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAuthState, setHasAuthState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [drawerStatus, setDrawerStatus] = useState('close');

  useEffect(() => {
    let unsubscribe = () => {};
    const fetchUserDetails = async (user) => {
      setIsLoggedIn(!!user);
      setHasAuthState(true);
      try {
        unsubscribe = await fetchCurrentUser(
          (doc) => {
            setCurrentUser(doc.data() ? doc.data() : null);
          },
          (err) => {
            setCurrentUser(null);
            console.log(err);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuthStateChanged(fetchUserDetails, (err) => console.log(err));
    return () => {
      setCurrentUser(null);
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        selectedCity,
        setSelectedCity,
        hasAuthState,
        drawerStatus,
        setDrawerStatus,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
