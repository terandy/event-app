import React, { useState, useEffect } from 'react';
import { Image, useWindowDimensions } from 'react-native';

const defaultImages = [
  'https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Ffav-img1.png?alt=media&token=dc775634-1320-4982-ac49-bed2ed901247',
  'https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Ffav-img2.png?alt=media&token=2fe499a2-af10-4c70-9521-68aab0fb6144',
  'https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Ffav-img3.png?alt=media&token=f0ce7253-4379-45c4-9331-96155973d153',
  'https://firebasestorage.googleapis.com/v0/b/ysp-app-294f8.appspot.com/o/events%2Ffav-img4.png?alt=media&token=cc07e17c-b944-4804-bba6-3dbb6709c5cd'
];
const EventImage = ({ event }) => {
  const [defaultImage, setDefaultImage] = useState();
  const windowWidth = useWindowDimensions().width;
  const [height, setHeight] = useState(200);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 4);
    setDefaultImage(defaultImages[randomNumber]);
    const onSuccess = (width, height) => {
      setHeight(((windowWidth - 50) * height) / width);
    };
    if (event.imageUrl) Image.getSize(event.imageUrl, onSuccess, []);
  }, [event.id]);

  return (
    <Image
      style={{
        width: windowWidth - 50,
        height: height,
        marginBottom: 20
      }}
      source={event.imageUrl ? { uri: event.imageUrl } : { uri: defaultImage }}
    />
  );
};

export default EventImage;
