import React, { useState } from "react";
import { Text, ScrollView, Platform, Linking } from "react-native";
import { useTheme } from "react-native-paper";

import { Title, Layout, ExternalLink } from "../../elements";
import { padding } from "../../theme";
import { AdMobInterstitial } from "expo-ads-admob";
import { adUnitIds, testAdUnitIds } from "../../services/admob";

const Donate = () => {
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { colors } = useTheme();

  const adUnitId =
    Platform.OS === "ios"
      ? adUnitIds.ios.interstitial
      : // android
        adUnitIds.android.interstitial;
  const testAdUnitId =
    Platform.OS === "ios"
      ? testAdUnitIds.ios.interstitial
      : // android
        testAdUnitIds.android.interstitial;
  const showInterstitial = async () => {
    setisLoading(true);
    try {
      await AdMobInterstitial.setAdUnitID(__DEV__ ? testAdUnitId : adUnitId);
      await AdMobInterstitial.requestAdAsync({
        servePersonalizedAds: true,
      });
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const handleWatchAd = async () => {
    if (isLoading) return;
    await showInterstitial();
    setisLoading(false);
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
          onPress={handleWatchAd}
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
