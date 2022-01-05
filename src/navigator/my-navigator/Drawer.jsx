import { useState, useRef } from 'react';
import {
  Platform,
  View,
  Animated,
  Button,
  StatusBar,
  StyleSheet
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';

const DRAWER_HEIGHT = 600;
export const HEADER_HEIGHT = 48;

const Drawer = ({ navigation, descriptors, state }) => {
  const [status, setStatus] = useState('close');
  const anim = useRef(new Animated.Value(0)).current;
  const animOptions = {
    inputRange: [0, 1],
    outputRange: [-DRAWER_HEIGHT, 0]
  };
  const handleLogout = () => {};
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
          <View style={styles.header}>
            <Button title="open" onPress={handleOpen} />
            <Button title="open" onPress={handleOpen} />
          </View>
        </SafeAreaView>
      )}
      {status !== 'close' && (
        <BlurView intensity={120} tint="dark" style={{ flex: 1 }}>
          <Animated.View
            style={[
              styles.drawer,
              {
                height: DRAWER_HEIGHT,
                transform: [
                  {
                    translateY: anim.interpolate(animOptions)
                  }
                ]
              }
            ]}
          >
            <View style={[styles.gap, styles.close]}>
              <Button title="close" onPress={handleClose} />
            </View>
            {state.routes.map(
              (route) =>
                !descriptors[route.key].options.hide && (
                  <View style={styles.gap} key={route.key}>
                    <Button
                      title={descriptors[route.key].options.title || route.name}
                      onPress={() => handleButtonPress(route)}
                    />
                  </View>
                )
            )}
            <Button
              title="Logout"
              onPress={handleLogout}
              style={{
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
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  gap: { marginBottom: 32 },
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  close: { justifyContent: 'flex-end', width: '100%', flexDirection: 'row' }
});

export default Drawer;
