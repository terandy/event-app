import React, { useState, useEffect } from "react";
import { View, Text, Linking, Pressable } from "react-native";
import { useTheme } from "react-native-paper";

import { ExternalLink, PillButton } from "../../elements";
import { HAT_COLORS } from "../../data";
import { fetchOrganiser } from "../../firebase-api";

const Details = ({ event, blockUser }) => {
  const { colors } = useTheme();
  const [organiser, setOrganiser] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const { description, creator } = event;

  useEffect(() => {
    if (creator) {
      let unsubscribe = () => {};
      const callback = async () => {
        unsubscribe = await fetchOrganiser(
          { creator },
          (doc) => {
            if (doc.data()) {
              setOrganiser(doc.data());
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
      {!!description && (
        <Text style={{ color: colors.g1, marginBottom: 20 }}>
          {description}
        </Text>
      )}
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
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
      {!!event.location && (
        <ExternalLink
          title={"View location"}
          onPress={() =>
            // FIXME: Not working (tested only on iOS)
            Linking.openURL(event.location).catch((err) => console.log(err))
          }
          icon="map-marker"
          size="small"
          style={{ marginBottom: 12 }}
        />
      )}
      {!!event.website && (
        <ExternalLink
          title={event.website}
          onPress={() => {
            // Couldn't make the normalizeUrl work, so made a quick fix...
            // let url = normalizeUrl(event.website);
            let url = event.website;
            if (!event.website.includes("http"))
              url = `http://${event.website}`;
            if (Linking.canOpenURL(url))
              Linking.openURL(url).catch((err) => console.log(err));
          }}
          icon="web"
          size="small"
          style={{ marginBottom: 12 }}
        />
      )}
      {!!event.zoomLink && (
        <ExternalLink
          title={"Meeting link"}
          onPress={() =>
            Linking.openURL(event.zoomLink).catch((err) => console.log(err))
          }
          icon="link"
          size="small"
          style={{ marginBottom: 24 }}
        />
      )}
      <Pressable
        onLongPress={() => setShowOptions(!showOptions)}
        onPress={() => setShowOptions(false)}
      >
        <Text style={{ color: colors.p2, marginBottom: 10 }}>
          Event by {organiser.name}
        </Text>
      </Pressable>
      {showOptions && (
        <Pressable
          style={{
            backgroundColor: colors.g1,
            padding: 8,
            borderRadius: 8,
            marginTop: 8,
          }}
          onPress={() => {
            blockUser({ user: organiser });
            setShowOptions(false);
          }}
        >
          <Text style={{ color: colors.r1 }}>Block User</Text>
        </Pressable>
      )}
    </>
  );
};

export default Details;
