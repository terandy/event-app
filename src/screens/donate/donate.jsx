import React, { useState } from "react";
import { Text, ScrollView, Platform, Linking } from "react-native";

import { Title, Layout, ExternalLink } from "../../elements";
import { padding } from "../../theme";
import { AdMobInterstitial } from "expo-ads-admob";

const Donate = ({ navigation, route }) => {
  const [error, setError] = useState(false);

  const adUnitId =
    Platform.OS === "ios"
      ? "ca-app-pub-5055103069379901/3144454389"
      : "ca-app-pub-5055103069379901/9354639511";
  const showInterstitial = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(adUnitId);
      await AdMobInterstitial.requestAdAsync({
        servePersonalizedAds: true,
      });
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      setError(true);
    }
  };
  const handleWatchAdd = () => {
    showInterstitial();
  };
  const message = `Hey There!\nDid you know that donations to YSP covers service activities costs, grant funding to deserving youth and youth projects, and finally maintenance costs for the app and website? All donations above $10 are also eligible for a Tax Receipt too! 
\n\n\nDonate via the link below! 
\nOr Watch an Ad to support the App fees ;) 
\n\n\nWe thank everyone for your continuous support!`;
  return (
    <Layout>
      <ScrollView
        style={{
          paddingHorizontal: padding.medium,
          marginBottom: padding.large,
        }}
      >
        <Title size="large">Donate</Title>
        <Text>{message}</Text>
        <Title size="large" style={{ marginTop: 88 }}>
          Support YSP
        </Title>
        <ExternalLink
          title={"Donate here"}
          onPress={() =>
            Linking.openURL("https://www.yspcanada.org/donate").catch((err) =>
              console.log(err)
            )
          }
          size="small"
          style={{ marginBottom: 12 }}
        />
        <ExternalLink
          title={"Watch an ad"}
          onPress={handleWatchAdd}
          size="small"
          style={{ marginBottom: 12 }}
        />
        {error && (
          <Text
            style={{ textAlign: "center", marginBottom: 12, color: colors.p1 }}
          >
            No ads currently
          </Text>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Donate;
