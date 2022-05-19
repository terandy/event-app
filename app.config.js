import "dotenv/config";

export default {
  expo: {
    name: "YSP Canada",
    slug: "ysp-app",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#5F40F7",
    },
    updates: {
      fallbackToCacheTimeout: 60000, // Needed to OTA updates
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.terandy.yspapp",
      buildNumber: "1.5.6",
      config: {
        googleMobileAdsAppId: "ca-app-pub-2820270410110980~5767285665",
      },
      infoPlist: {
        NSCalendarsUsageDescription:
          "We need permission to access your device's calendar to save events you are interested in.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#5F40F7",
      },
      package: "com.terandy.yspapp",
      versionCode: 56,
      googleServicesFile: "./google-services.json",
      config: {
        googleMobileAdsAppId: "ca-app-pub-2820270410110980~3829466543",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-tracking-transparency",
        {
          userTrackingPermission:
            "We will update your device's Calendar with events you are interested in.",
        },
      ],
      [
        "expo-ads-admob",
        {
          userTrackingPermission:
            "This identifier will be used to deliver personalized ads to you.",
        },
      ],
    ],
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
};
