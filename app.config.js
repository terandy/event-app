import 'dotenv/config';

export default {
  expo: {
    name: 'YSP Canada',
    slug: 'ysp-app',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#5F40F7'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.terandy.yspapp',
      buildNumber: '1.5.3',
      config: {
        googleMobileAdsAppId: 'ca-app-pub-5055103069379901~5676793545'
      },
      infoPlist: {
        NSCalendarsUsageDescription:
          "We need permission to access your device's calendar to save events you are interested in."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#5F40F7'
      },
      package: 'com.terandy.yspapp',
      versionCode: 53,
      googleServicesFile: './google-services.json',
      config: {
        googleMobileAdsAppId: 'ca-app-pub-5055103069379901~3840967691'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    plugins: [
      [
        'expo-tracking-transparency',
        {
          userTrackingPermission:
            "We will update your device's Calendar with events you are interested in."
        }
      ],
      [
        'expo-ads-admob',
        {
          userTrackingPermission:
            'This identifier will be used to deliver personalized ads to you.'
        }
      ]
    ],
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    }
  }
};
