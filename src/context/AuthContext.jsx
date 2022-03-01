import React, { createContext, useState, useEffect } from 'react';
import { CITIES } from '../data';
import {
  fetchAuthStateChanged,
  fetchCurrentUser,
  fetchUsers
} from '../firebase-api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [hasAuthState, setHasAuthState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [drawerStatus, setDrawerStatus] = useState('close');

  useEffect(() => {
    let unsubscribe = () => {};
    const fetchUserDetails = async (user) => {
      setIsLoggedIn(!!user);
      setHasAuthState(true);
      if (user) {
        unsubscribe = await fetchCurrentUser(
          (doc) => {
            setCurrentUser(doc.data() ? doc.data() : null);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    };
    try {
      fetchAuthStateChanged(fetchUserDetails, (err) => console.log(err));
    } catch (err) {
      console.log(err);
      unsubscribe = () => {};
    }
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    const callback = async () => {
      unsubscribe = await fetchUsers(
        (snapshot) => {
          if (snapshot.size) {
            let users = snapshot.docs.map((doc) => doc.data());
            setUsers(users);
          }
        },
        (err) => console.log(err)
      );
    };
    callback();
    return () => unsubscribe();
  }, []);

  let blockedUsers = [];
  if (users && currentUser && currentUser.blockedUsers)
    blockedUsers = users.filter((usr) =>
      currentUser.blockedUsers.includes(usr.id)
    );

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
        setIsLoggedIn,
        blockedUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
