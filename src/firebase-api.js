import { auth, db } from "../firebase";
import { DEFAULT_USER_SETTINGS } from "./data";
import * as firebase from "firebase";
import { DS } from "./strings";

export const fetchAuthStateChanged = (callback) =>
  auth.onAuthStateChanged(callback);

export const apiLogout = async () => auth.signOut();

export const apiLogin = async ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

export const apiRegister = async ({ email, password, name }) =>
  auth.createUserWithEmailAndPassword(email, password).then(() =>
    db.collection(DS.users).doc(auth.currentUser.uid).set({
      id: auth.currentUser.uid,
      name,
      email,
      settings: DEFAULT_USER_SETTINGS,
      events: [],
    })
  );
export const apiResetPassword = async ({ email }) =>
  auth.sendPasswordResetEmail(email);

export const fetchEvents = async (callback, errorCallback) =>
  db
    .collection(DS.events)
    // .orderBy(DS.startDateTime, "asc")
    .onSnapshot(callback, errorCallback);

export const fetchUsers = async (callback, errorCallback) =>
  db.collection(DS.users).onSnapshot(callback, errorCallback);

export const fetchCurrentUser = async (callback, errorCallback) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .onSnapshot(callback, errorCallback);

export const fetchUser = async ({ userId }, callback, errorCallback) =>
  db.collection(DS.users).doc(userId).onSnapshot(callback, errorCallback);

export const fetchEvent = async ({ id }, callback, errorCallback) =>
  db.collection(DS.events).doc(id).onSnapshot(callback, errorCallback);

export const getEvent = async ({ id }) =>
  db.collection(DS.events).doc(id).get();

export const fetchOrganiser = async ({ creator }, callback, errorCallback) =>
  db.collection(DS.users).doc(creator).onSnapshot(callback, errorCallback);

export const apiSetMessages = async ({ id, newComment, messages }) => {
  return db
    .collection(DS.events)
    .doc(id)
    .update(
      {
        messages: messages ? messages.concat(newComment) : [newComment],
      },
      { merge: true }
    );
};

export const apiDeleteEvent = async ({ id }) =>
  db.collection(DS.events).doc(id).delete();

export const apiUpdateEvent = async ({ id, data }) =>
  db.collection(DS.events).doc(id).set(data, { merge: true });

const savePostData = (downloadURL, eventId, callback) => {
  db.collection(DS.events)
    .doc(eventId)
    .set(
      {
        imageUrl: downloadURL,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
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

  const task = firebase
    .storage()
    .ref()
    .child(`${DS.images}/${eventId}`)
    .put(blob);
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
  task.on("state_changed", taskProgress, taskError, taskCompleted);
};

// TODO: Make all in a transaction to be safer.
export const apiCreateEvent = async ({ data, image, callback }) => {
  try {
    const res = await db.collection(DS.events).add(data);

    // TODO: Remove this step after everyone has the updated version.
    // The document snapshot already has the id property. No needs to save id
    // inside the document data. We take the id when fetching the data.
    // add id to doc
    await db
      .collection(DS.events)
      .doc(res.id)
      .set({ id: res.id }, { merge: true });

    if (image) {
      await apiUploadImage({ eventId: res.id, image, callback }).catch(
        (err) => {
          console.log(err);
          callback();
        }
      );
    } else {
      callback();
    }
  } catch (err) {
    console.log(err);
    callback();
  }
};

export const apiSaveToken = (token) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      {
        token,
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const removeEventFromUsers = ({ eventId, reminderId, notificationId }) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      {
        events: firebase.firestore.FieldValue.arrayRemove({
          eventId,
          reminderId,
          notificationId,
        }),
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const addEventToUser = ({ eventId, reminderId, notificationId }) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      {
        events: firebase.firestore.FieldValue.arrayUnion({
          eventId,
          reminderId,
          notificationId,
        }),
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const removeUserFromEvent = ({ eventId }) =>
  db
    .collection(DS.events)
    .doc(eventId)
    .set(
      {
        users: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const addUserToEvent = ({ eventId }) =>
  db
    .collection(DS.events)
    .doc(eventId)
    .set(
      {
        users: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const apiUpdateSettings = async (settings) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      {
        settings,
      },
      { merge: true }
    )
    .catch((err) => console.log(err));

export const apiUpdateUser = async (data) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(data, { merge: true })
    .catch((err) => console.log(err));

export const apiBlockUser = async ({ user }) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      { blockedUsers: firebase.firestore.FieldValue.arrayUnion(user.id) },
      { merge: true }
    );

export const apiUnblockUser = async ({ userId }) =>
  db
    .collection(DS.users)
    .doc(auth.currentUser.uid)
    .set(
      { blockedUsers: firebase.firestore.FieldValue.arrayRemove(userId) },
      { merge: true }
    );
