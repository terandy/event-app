import React, { createContext, useState, useEffect } from "react";
import { fetchEvents } from "../firebase-api";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    // TODO: Ask why "unsubscribe" is needed and what it does, then comment here.
    let unsubscribe = () => {};
    const callback = async () => {
      // TODO: [LATER] Fetch only upcoming events, so we save memory and database usage.
      //  Right now we can't do this because of the integrity problem with the properties
      //  dateTime and startDateTime. Once everyone update the app then we can change it.
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
