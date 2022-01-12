import { auth, db } from '../firebase';
import { DEFAULT_USER_SETTINGS } from './data';
import * as firebase from 'firebase';

export const fetchAuthStateChanged = (callback) => {
  try {
    auth.onAuthStateChanged(callback);
  } catch (err) {
    console.log(err);
  }
};

export const apiLogout = async () => auth.signOut();

export const apiLogin = async ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

export const apiRegister = async ({ email, password, name }) =>
  auth.createUserWithEmailAndPassword(email, password).then(() =>
    db.collection('users').doc(auth.currentUser.uid).set({
      id: auth.currentUser.uid,
      name,
      email,
      settings: DEFAULT_USER_SETTINGS,
      event: []
    })
  );
export const apiResetPassword = async ({ email }) =>
  auth.sendPasswordResetEmail(email);

export const fetchEvents = async (callback, errorCallback) =>
  db
    .collection('events')
    .orderBy('dateTime', 'asc')
    .onSnapshot(callback, errorCallback);

export const fetchCurrentUser = async (callback, errorCallback) =>
  db
    .collection('users')
    .doc(auth.currentUser.uid)
    .onSnapshot(callback, errorCallback);

export const fetchEvent = async ({ id }, callback, errorCallback) =>
  db.collection('events').doc(id).onSnapshot(callback, errorCallback);

export const fetchOrganiser = async ({ creator }, callback, errorCallback) =>
  db.collection('users').doc(creator).onSnapshot(callback, errorCallback);

export const apiSetMessages = async ({ id, newComment, messages }) => {
  return db
    .collection('events')
    .doc(id)
    .update(
      {
        messages: messages ? [newComment].concat(messages) : [newComment]
      },
      { merge: true }
    );
};

export const apiDeleteEvent = async ({ id }) =>
  db.collection('events').doc(id).delete();

export const apiUpdateEvent = async ({ id, data }) =>
  db.collection('events').doc(id).set(data, { merge: true });

const savePostData = (downloadURL, eventId, callback) => {
  db.collection('events')
    .doc(eventId)
    .set(
      {
        imageUrl: downloadURL,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    )
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err);
      callback();
    });
};

export const apiDeleteImage = async ({ imageUrl }) => {
  let pictureRef = firebase.storage().refFromURL(imageUrl);
  return pictureRef.delete();
};

export const apiUploadImage = async ({ eventId, image, callback }) => {
  const response = await fetch(image);
  const blob = await response.blob();

  const task = firebase.storage().ref().child(`images/${eventId}`).put(blob);
  const taskProgress = () => {
    console.log(`transferred:${task.snapshot.bytesTransferred}`);
  };
  const taskCompleted = () => {
    task.snapshot.ref
      .getDownloadURL()
      .then((snapshot) => {
        savePostData(snapshot, eventId, callback);
      })
      .catch((err) => {
        console.log(err);
        callback();
      });
  };
  const taskError = () => {
    console.log(task.snapshot.error);
  };
  task.on('state_changed', taskProgress, taskError, taskCompleted);
};

export const apiCreateEvent = async ({ data, image, callback }) =>
  db
    .collection('events')
    .add(data)
    .then((res) => {
      // add id to doc
      db.collection('events').doc(res.id).set({ id: res.id }, { merge: true });
      if (image) {
        apiUploadImage({ eventId: res.id, image, callback });
      } else {
        callback();
      }
    })
    .catch((err) => {
      console.log(err);
      callback();
    });

export const apiSaveToken = (token) =>
  db
    .collection('users')
    .doc(auth.currentUser.uid)
    .set(
      {
        token
      },
      { merge: true }
    )
    .catch((err) => console.log(err));
