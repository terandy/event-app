const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();
const db = admin.firestore();

const notifyUsers = ({ title, message, expoTokens, event }) => {
  const messages = expoTokens.map((expoToken) => {
    return { to: expoToken, title, body: message, data: JSON.stringify(event) };
  });
  return fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messages)
  });
};

const checkUserPermissions = (userData, eventData) => {
  const allowsHat = !!userData.settings.hats.find((value) =>
    eventData.hats.includes(value)
  );
  const allowsCity = !!userData.settings.cities.find((value) =>
    eventData.cities.includes(value)
  );
  const allowsCreator = userData.blockedUsers
    ? !userData.blockedUsers.includes(eventData.creator)
    : true;
  const isCreator = eventData.creator === userData.id;
  const { isEnabled } = userData.settings;
  return (
    userData.token &&
    allowsHat &&
    allowsCity &&
    isEnabled &&
    allowsCreator &&
    !isCreator
  );
};

const getAllExpoTokens = async (eventData) => {
  const users = await db.collection('users').get();
  const expoTokensPromises = users.docs
    .map((user) => {
      const userData = user.data();
      const isNotificationAllowed = checkUserPermissions(userData, eventData);
      if (isNotificationAllowed) {
        return userData.token;
      }
    })
    .filter(Boolean);
  const expoTokens = await Promise.all(expoTokensPromises);
  return expoTokens;
};

const getEventExpoTokens = async (eventData, isAnotherMessage) => {
  const users = await db.collection('users').get();
  const expoTokensPromises = users.docs
    .map((user) => {
      const userData = user.data();
      const isEventCreator = eventData.creator === userData.id;
      const isMessageSender =
        isAnotherMessage &&
        !!eventData.messages &&
        eventData.messages[eventData.messages.length - 1].user === userData.id;
      const isUpdateStarter = isAnotherMessage
        ? isMessageSender
        : isEventCreator;
      if (eventData.users.includes(userData.id) && !isUpdateStarter) {
        return userData.token;
      }
    })
    .filter(Boolean);
  const expoTokens = await Promise.all(expoTokensPromises);
  return expoTokens;
};

exports.sendEventCreationNotification = functions.firestore
  .document('events/{id}')
  .onCreate(async (snapshot, context) => {
    const eventData = snapshot.data();
    const expoTokens = await getAllExpoTokens(eventData);
    return notifyUsers({
      title: eventData.title,
      message: 'Checkout new event!',
      event: { ...eventData, id: context.params.id },
      expoTokens
    });
  });

exports.sendEventUpdate = functions.firestore
  .document('events/{id}')
  .onUpdate(async (snapshot, context) => {
    const eventData = snapshot.after.data();
    const preData = snapshot.before.data();
    if (preData.users.length === eventData.users.length) {
      const isAnotherMessage =
        eventData.messages &&
        (!preData.messages ||
          preData.messages.length !== eventData.messages.length);
      const expoTokens = await getEventExpoTokens(eventData, isAnotherMessage);
      const message = isAnotherMessage
        ? `New comment`
        : `Event has changed! Click here to update reminders!`;
      const title = eventData.title;
      return notifyUsers({ title, message, event: eventData, expoTokens });
    }
  });
