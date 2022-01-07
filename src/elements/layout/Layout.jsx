import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from '../../data';
import { padding } from '../../theme';

const Layout = ({ children, scrollable }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: '100%', height: HEADER_HEIGHT }} />
      {scrollable ? (
        <ScrollView style={style.padding}>{children}</ScrollView>
      ) : (
        <View style={style.padding}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  padding: { paddingHorizontal: padding.medium }
});

export default Layout;
