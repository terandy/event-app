import React, { createContext, useState, useEffect } from 'react';
import { fetchEvents } from '../firebase-api';
import { isSame } from '../utils';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchEvents(
      (snapshot) => {
        if (snapshot.size) {
          let events = snapshot.docs.map((doc) => doc.data());
          setEvents(events);
        }
      },
      (err) => console.log({ err })
    );
    return () => unsubscribe();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
