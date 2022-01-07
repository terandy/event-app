import firebase from 'firebase';

// USER COLLECTION

export const addCalendarIdToUser = (calendarId) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(
      {
        calendarId: calendarId
      },
      { merge: true }
    );
};

export const removeEventFromUsers = ({ eventId, calendarEventId }) => {
  firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(
      {
        events: firebase.firestore.FieldValue.arrayRemove({
          eventId,
          calendarEventId
        })
      },
      { merge: true }
    );
};
export const addEventToUser = ({ eventId, calendarEventId }) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(
      {
        events: firebase.firestore.FieldValue.arrayUnion({
          eventId,
          calendarEventId
        })
      },
      { merge: true }
    );
};

// EVENT COLLECTION
export const removeUserFromEvent = ({ eventId }) => {
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .set(
      {
        users: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.uid
        )
      },
      { merge: true }
    );
};
export const addUserToEvent = ({ eventId }) => {
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .set(
      {
        users: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        )
      },
      { merge: true }
    );
};
