import React, { createContext, useState, useEffect } from 'react';
import { CITIES } from '../data';
import { fetchAuthStateChanged, fetchUser } from '../firebase-api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAuthState, setHasAuthState] = useState(false);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [drawerStatus, setDrawerStatus] = useState('close');

  useEffect(() => {
    let unsubscribe = () => {};
    fetchAuthStateChanged(async (user) => {
      setHasAuthState(true);
      if (user) {
        unsubscribe = await fetchUser(
          { uid: user.uid },
          (doc) => {
            if (doc.data()) {
              setCurrentUser(doc.data());
            }
          },
          (err) => console.log(err)
        );
      }
    });
    return () => unsubscribe();
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
        setDrawerStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
