import * as firebase from 'firebase';

export const getEvents = ({ callback, errorCallback }) => {
  const unsubscribe = firebase
    .firestore()
    .collection('events')
    .doc(id)
    .onSnapshot(callback, errorCallback);

  return unsubscribe();
};
