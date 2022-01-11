import React, { useState, useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ExternalLink, PillButton } from '../../elements';
import { HATS, HAT_COLORS } from '../../data';
import { fetchOrganiser } from '../../firebase-api';

const Details = ({ event }) => {
  const { colors } = useTheme();
  const [organiser, setOrganiser] = useState('');
  const { description, creator } = event;

  useEffect(() => {
    if (creator) {
      let unsubscribe = () => {};
      const callback = async () => {
        unsubscribe = await fetchOrganiser(
          { creator },
          (doc) => {
            if (doc.data()) {
              setOrganiser(doc.data().name);
            }
          },
          (err) => console.log(err)
        );
      };
      callback();
      return () => unsubscribe();
    }
  }, [creator]);

  return (
    <>
      {description && (
        <Text style={{ color: colors.g1, marginBottom: 20 }}>
          {description}
        </Text>
      )}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {event.hats?.map((hat) => {
          return (
            <PillButton
              key={hat}
              title={hat}
              color={colors[HAT_COLORS[hat]]}
              style={{ marginRight: 12 }}
              disable={true}
            />
          );
        })}
      </View>
      {event.location && (
        <ExternalLink
          title={'View location'}
          onPress={() =>
            Linking.openURL(event.location).catch((err) => console.log(err))
          }
          icon="map-marker"
          size="small"
          style={{ marginBottom: 12 }}
        />
      )}
      {event.website && (
        <ExternalLink
          title={event.website}
          onPress={() =>
            Linking.openURL(event.website).catch((err) => console.log(err))
          }
          icon="web"
          size="small"
          style={{ marginBottom: 12 }}
        />
      )}
      {event.zoomLink && (
        <ExternalLink
          title={'Meeting link'}
          onPress={() =>
            Linking.openURL(event.zoomLink).catch((err) => console.log(err))
          }
          icon="link"
          size="small"
          style={{ marginBottom: 24 }}
        />
      )}
      <Text style={{ color: colors.p2, marginBottom: 10 }}>
        Event by {organiser}
      </Text>
    </>
  );
};

export default Details;
