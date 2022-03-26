import React, { createContext, useState, useEffect } from "react";
import { fetchEvents } from "../firebase-api";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    const callback = async () => {
      unsubscribe = await fetchEvents(
        (snapshot) => {
          if (snapshot.size) {
            let events = snapshot.docs.map((doc) => {
              const data = doc.data();
              data.id = doc.id;
              return data;
            });
            setEvents(events);
          }
        },
        (err) => console.log(err)
      );
    };
    callback();
    return () => unsubscribe();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
