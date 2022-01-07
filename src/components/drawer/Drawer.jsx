import { useState, useRef, useContext } from 'react';
import { Platform, View, Animated, StatusBar, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../context';
import { apiLogout } from '../../firebase-api';
import { DRAWER_HEIGHT, HEADER_HEIGHT } from '../../data';
import { IconButton, Button } from '../../elements';
import { Header } from '../header';

const Drawer = ({ navigation, descriptors, state }) => {
  const { colors } = useTheme();
  const { setCurrentUser } = useContext(AuthContext);
  const [status, setStatus] = useState('close');
  const anim = useRef(new Animated.Value(0)).current;
  const animOptions = {
    inputRange: [0, 1],
    outputRange: [-DRAWER_HEIGHT, 0]
  };
  const handleLogout = () => {
    apiLogout()
      .then(() => setCurrentUser(null))
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    setStatus('transition');
    Animated.timing(anim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      setStatus('open');
    });
  };
  const handleClose = () => {
    setStatus('transition');
    Animated.timing(anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      setStatus('close');
    });
  };

  const handleButtonPress = (route) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...DrawerActions.jumpTo(route.name),
        target: state.key
      });
    }
    handleClose();
  };
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        ...(status !== 'close' && { height: '100%' })
      }}
    >
      {status === 'close' && (
        <SafeAreaView>
          <Header
            openDrawer={handleOpen}
            state={state}
            navigation={navigation}
          />
        </SafeAreaView>
      )}
      {status !== 'close' && (
        <BlurView intensity={120} tint="dark" style={{ flex: 1 }}>
          <Animated.View
            style={[
              styles.drawer,
              {
                height: DRAWER_HEIGHT,
                backgroundColor: colors.p1,
                transform: [
                  {
                    translateY: anim.interpolate(animOptions)
                  }
                ]
              }
            ]}
          >
            <View style={[styles.close]}>
              <IconButton
                icon="close"
                onPress={handleClose}
                color={colors.p4}
              />
            </View>
            {state.routes.map(
              (route) =>
                !descriptors[route.key].options.hide && (
                  <View style={styles.gap} key={route.key}>
                    <Button
                      title={descriptors[route.key].options.title || route.name}
                      onPress={() => handleButtonPress(route)}
                      color={colors.p1}
                      style={{
                        backgroundColor: colors.p4,
                        marginBottom: 28
                      }}
                    />
                  </View>
                )
            )}
            <Button
              title="Logout"
              onPress={handleLogout}
              color={colors.p1}
              style={{
                backgroundColor: colors.p4,
                marginBottom: 28
              }}
            />
          </Animated.View>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    height: DRAWER_HEIGHT,
    maxHeight: '100%',
    borderBottomEndRadius: 69,
    borderBottomStartRadius: 69,
    padding: 32,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 32 : 50,
    display: 'flex',
    alignItems: 'center'
  },
  gap: { marginBottom: 16, width: '100%' },
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  close: {
    marginBottom: 32,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row'
  }
});

export default Drawer;