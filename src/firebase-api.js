import { auth, db } from '../firebase';
import { DEFAULT_USER_SETTINGS } from './data';

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