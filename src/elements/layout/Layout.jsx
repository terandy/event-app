import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from '../../data';
import { padding } from '../../theme';

const Layout = ({ children, scrollable, style }) => {
  return (
    <SafeAreaView style={stylesheet.container}>
      <View style={{ width: '100%', height: HEADER_HEIGHT }} />
      {scrollable ? (
        <ScrollView style={[stylesheet.padding, style]}>{children}</ScrollView>
      ) : (
        <View style={[stylesheet.padding, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  padding: { flex: 1, paddingHorizontal: padding.medium },
  container: { flex: 1 }
});

export default Layout;
